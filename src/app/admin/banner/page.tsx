"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/admin/ui/GlassCard";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Save, Loader2 } from "lucide-react";

export default function BannerEditor() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState({
        title: "",
        link: "",
        image: "",
        published: false
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const docRef = doc(db, "site", "banner");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data() as any);
                }
            } catch (err) {
                console.error("Error fetching banner data:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await setDoc(doc(db, "site", "banner"), data);
            alert("Banner updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to save.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif text-church-gold mb-1">Promo Banner</h1>
                    <p className="text-church-white/60">A secondary promotional section for special campaigns.</p>
                </div>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <GlassCard>
                        <h3 className="text-lg font-bold text-church-white mb-6 border-b border-white/10 pb-2">Banner Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-church-white/80 mb-2 ml-1">Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                    className="w-full bg-church-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-church-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-church-gold/50"
                                    placeholder="e.g. Easter Special"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-church-white/80 mb-2 ml-1">Action Link</label>
                                <input
                                    type="text"
                                    value={data.link}
                                    onChange={(e) => setData({ ...data, link: e.target.value })}
                                    className="w-full bg-church-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-church-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-church-gold/50"
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <div
                                    onClick={() => setData({ ...data, published: !data.published })}
                                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${data.published ? 'bg-green-500/20 border border-green-500/50' : 'bg-church-white/10 border border-white/10'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full shadow-sm transition-transform ${data.published ? 'translate-x-6 bg-green-400' : 'bg-church-white/40'}`} />
                                </div>
                                <span className="text-sm font-medium text-church-white/80">{data.published ? "Active" : "Inactive"}</span>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                <div className="space-y-6">
                    <GlassCard>
                        <h3 className="text-lg font-bold text-church-white mb-6 border-b border-white/10 pb-2">Banner Visual</h3>
                        <ImageUpload
                            directory="banner"
                            label="Banner Background"
                            currentImage={data.image}
                            onUpload={(url) => setData({ ...data, image: url })}
                            onDelete={() => setData({ ...data, image: "" })}
                        />
                    </GlassCard>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 bg-church-gold text-church-midnight font-bold px-8 py-3 rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                            <span>Save Banner</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
