"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/admin/ui/GlassCard";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import { Modal } from "@/components/admin/ui/Modal";
import { Badge } from "@/components/admin/ui/Badge";
import { collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Plus, Trash2, Edit2, LayoutGrid, Loader2 } from "lucide-react";
import { Reorder } from "framer-motion";
import ServiceListEditor from "./ServiceListEditor";

export default function BentoEditor() {
    const [cards, setCards] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        link: "",
        image: "",
        published: true,
        size: "normal", // normal, wide, tall, big
        type: "image", // image, service_list
        services: [] as { name: string; time: string }[]
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // Realtime listener
        const q = query(collection(db, "site/bento/cards")); // Could add orderBy('order') if we implemented sorting logic
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCards(items);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const openModal = (item?: any) => {
        if (item) {
            setEditItem(item);
            setFormData({
                title: item.title,
                link: item.link,
                image: item.image,
                published: item.published,
                size: item.size || "normal",
                type: item.type || "image",
                services: item.services || []
            });
        } else {
            setEditItem(null);
            setFormData({ title: "", link: "", image: "", published: true, size: "normal", type: "image", services: [] });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editItem) {
                await updateDoc(doc(db, "site/bento/cards", editItem.id), formData);
            } else {
                await addDoc(collection(db, "site/bento/cards"), {
                    ...formData,
                    createdAt: new Date()
                });
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            alert("Failed to save");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this card?")) return;
        await deleteDoc(doc(db, "site/bento/cards", id));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif text-church-gold mb-1">Bento Grid</h1>
                    <p className="text-church-white/60">Manage feature cards displayed on the homepage.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-church-gold text-church-midnight font-bold px-4 py-2 rounded-xl hover:bg-yellow-400 transition-colors"
                >
                    <Plus size={20} /> <span className="hidden sm:inline">Add Card</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <GlassCard key={card.id} className="group relative flex flex-col justify-between h-full min-h-[250px] p-0 overflow-hidden">
                        {/* Background Image */}
                        {card.image && (
                            <div className="absolute inset-0 z-0">
                                <img src={card.image} alt={card.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-t from-church-midnight via-church-midnight/50 to-transparent" />
                            </div>
                        )}

                        <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start">
                                <Badge variant={card.published ? "success" : "neutral"}>{card.published ? "Live" : "Draft"}</Badge>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openModal(card)} className="p-2 bg-white/10 rounded-full hover:bg-church-gold/20 text-white hover:text-church-gold">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(card.id)} className="p-2 bg-red-500/20 rounded-full hover:bg-red-500 text-red-300 hover:text-white">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
                                <p className="text-sm text-white/50 truncate">{card.link || "No link"}</p>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editItem ? "Edit Card" : "New Bento Card"}>
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-church-white/80 mb-2 ml-1">Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-church-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-church-white focus:outline-none focus:ring-2 focus:ring-church-gold/50"
                            placeholder="Card Title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-church-white/80 mb-2 ml-1">Link URL</label>
                        <input
                            type="text"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className="w-full bg-church-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-church-white focus:outline-none focus:ring-2 focus:ring-church-gold/50"
                            placeholder="/events or https://..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-church-white/80 mb-2 ml-1">Size Option</label>
                        <select
                            value={formData.size}
                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                            className="w-full bg-church-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-church-white focus:outline-none focus:ring-2 focus:ring-church-gold/50"
                        >
                            <option value="normal">Normal (1x1)</option>
                            <option value="wide">Wide (2x1)</option>
                            <option value="tall">Tall (1x2)</option>
                            <option value="big">Big (2x2)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-church-white/80 mb-2 ml-1">Card Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full bg-church-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-church-white focus:outline-none focus:ring-2 focus:ring-church-gold/50"
                        >
                            <option value="image">Standard (Image)</option>
                            <option value="service_list">Service Timings List</option>
                        </select>
                    </div>

                    {formData.type === 'service_list' ? (
                        <ServiceListEditor
                            services={formData.services}
                            onChange={(newServices) => setFormData({ ...formData, services: newServices })}
                        />
                    ) : (
                        <ImageUpload
                            directory="bento"
                            label="Card Image"
                            currentImage={formData.image}
                            onUpload={(url) => setFormData({ ...formData, image: url })}
                            onDelete={() => setFormData({ ...formData, image: "" })}
                        />
                    )}

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="published"
                            checked={formData.published}
                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                            className="w-5 h-5 rounded border-gray-300 text-church-gold focus:ring-church-gold"
                        />
                        <label htmlFor="published" className="text-church-white font-medium">Publish Card</label>
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full bg-church-gold text-church-midnight font-bold py-3 rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-50 flex justify-center"
                    >
                        {saving ? <Loader2 className="animate-spin" /> : (editItem ? "Update Card" : "Create Card")}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
