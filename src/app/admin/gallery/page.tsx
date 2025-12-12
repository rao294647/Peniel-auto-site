"use client";

import { useState, useEffect, useRef } from "react";
import { GlassCard } from "@/components/admin/ui/GlassCard";
import { Badge } from "@/components/admin/ui/Badge";
import { collection, onSnapshot, doc, addDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadToImgBB } from "@/lib/imgbb";
import { UploadCloud, X, Trash2, Eye, CheckCircle2, Loader2, Image as ImageIcon } from "lucide-react";
import { Modal } from "@/components/admin/ui/Modal";

export default function GalleryManager() {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const q = query(collection(db, "site/gallery/items"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setImages(items);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        let completed = 0;
        const total = files.length;

        // Parallel uploads
        await Promise.all(Array.from(files).map(async (file) => {
            try {
                // Fake progress update
                setProgress((completed / total) * 100);

                const url = await uploadToImgBB(file);

                await addDoc(collection(db, "site/gallery/items"), {
                    url,
                    name: file.name,
                    createdAt: new Date(),
                    published: true
                });

                completed++;
                setProgress((completed / total) * 100);
            } catch (err) {
                console.error("Upload failed for file", file.name, err);
                alert(`Failed to upload ${file.name}`);
            }
        }));

        setUploading(false);
        setProgress(0);
        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleDelete = async (id: string, url: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;
        try {
            // ImgBB deletion through client API is not trivial without delete URL storage
            // Just deleting from Firestore is sufficient for the User requirement "Remove Storage Logic"
            // If it was Firebase Storage, we would deleteObject(ref)
            await deleteDoc(doc(db, "site/gallery/items", id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete image");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif text-church-gold mb-1">Gallery</h1>
                    <p className="text-church-white/60">Manage photo gallery collection.</p>
                </div>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 bg-church-gold text-church-midnight font-bold px-4 py-2 rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-50"
                >
                    {uploading ? <Loader2 className="animate-spin" /> : <UploadCloud size={20} />}
                    <span className="hidden sm:inline">Upload Photos</span>
                </button>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileUpload}
                />
            </div>

            {uploading && (
                <div className="w-full bg-church-white/5 rounded-full h-2 overflow-hidden mb-4">
                    <div className="bg-church-gold h-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
            )}

            {loading ? <div>Loading...</div> : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {images.map((img) => (
                        <GlassCard key={img.id} noPadding className="group aspect-square relative cursor-pointer font-sans bg-black">
                            <img src={img.url} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                <button onClick={() => setPreviewImage(img.url)} className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md">
                                    <Eye size={20} />
                                </button>
                                <button onClick={() => handleDelete(img.id, img.url)} className="p-2 rounded-full bg-red-500/40 hover:bg-red-500 text-white backdrop-blur-md">
                                    <Trash2 size={20} />
                                </button>
                            </div>

                            <div className="absolute top-2 left-2">
                                {img.published && <div className="w-2 h-2 rounded-full bg-green-500 shadow-md shadow-green-500/50" />}
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}

            {images.length === 0 && !loading && (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                    <ImageIcon className="w-12 h-12 text-church-white/20 mx-auto mb-4" />
                    <p className="text-church-white/40">No photos in the gallery. Upload some!</p>
                </div>
            )}

            <Modal isOpen={!!previewImage} onClose={() => setPreviewImage(null)}>
                {previewImage && (
                    <img src={previewImage} alt="Preview" className="w-full h-auto rounded-xl" />
                )}
            </Modal>
        </div>
    );
}
