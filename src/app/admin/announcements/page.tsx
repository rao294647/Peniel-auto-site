"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/admin/ui/GlassCard";
import { Modal } from "@/components/admin/ui/Modal";
import { Badge } from "@/components/admin/ui/Badge";
import { collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Plus, Trash2, Edit2, Calendar, Megaphone, Loader2 } from "lucide-react";

export default function AnnouncementsManager() {
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        startDate: "",
        endDate: "",
        published: true
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // Realtime listener
        const q = query(collection(db, "site/announcements/items"), orderBy("startDate", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAnnouncements(items);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const openModal = (item?: any) => {
        if (item) {
            setEditItem(item);
            setFormData({
                title: item.title,
                body: item.body,
                startDate: item.startDate,
                endDate: item.endDate,
                published: item.published
            });
        } else {
            setEditItem(null);
            setFormData({ title: "", body: "", startDate: "", endDate: "", published: true });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editItem) {
                await updateDoc(doc(db, "site/announcements/items", editItem.id), formData);
            } else {
                await addDoc(collection(db, "site/announcements/items"), {
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
        if (!confirm("Delete this announcement?")) return;
        await deleteDoc(doc(db, "site/announcements/items", id));
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif text-church-gold mb-1">Announcements</h1>
                    <p className="text-church-white/60">Manage church news and upcoming event notifications.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-church-gold text-church-midnight font-bold px-4 py-2 rounded-xl hover:bg-yellow-400 transition-colors"
                >
                    <Plus size={20} /> <span className="hidden sm:inline">New Announcement</span>
                </button>
            </div>

            <div className="space-y-4">
                {loading ? <div>Loading...</div> : announcements.map((item) => (
                    <GlassCard key={item.id} className="flex flex-col md:flex-row justify-between gap-4 group">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <Badge variant={item.published ? "success" : "neutral"}>{item.published ? "Active" : "Hidden"}</Badge>
                                <div className="flex items-center text-xs text-church-white/40 gap-1">
                                    <Calendar size={12} />
                                    {item.startDate} — {item.endDate}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-church-white/60 text-sm line-clamp-2">{item.body}</p>
                        </div>

                        <div className="flex flex-row md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-4 pl-0">
                            <button onClick={() => openModal(item)} className="p-2 bg-white/5 rounded-lg hover:bg-church-gold/20 text-white hover:text-church-gold transition-colors flex items-center gap-2">
                                <Edit2 size={16} /> <span className="md:hidden text-xs">Edit</span>
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-colors flex items-center gap-2">
                                <Trash2 size={16} /> <span className="md:hidden text-xs">Delete</span>
                            </button>
                        </div>
                    </GlassCard>
                ))}
                {!loading && announcements.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                        <Megaphone className="w-12 h-12 text-church-white/20 mx-auto mb-4" />
                        <p className="text-church-white/40">No announcements found. create one!</p>
                    </div>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Announcement Details">
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-church-white/80 mb-2 ml-1">Headline</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-church-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-church-white focus:outline-none focus:ring-2 focus:ring-church-gold/50"
                            placeholder="e.g. Sunday Service Change"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-church-white/80 mb-2 ml-1">Start Date</label>
                            <input
                                type="date"
                                required
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                className="w-full bg-church-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-church-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-church-gold/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-church-white/80 mb-2 ml-1">End Date</label>
                            <input
                                type="date"
                                required
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                className="w-full bg-church-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-church-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-church-gold/50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-church-white/80 mb-2 ml-1">Details</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.body}
                            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                            className="w-full bg-church-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-church-white focus:outline-none focus:ring-2 focus:ring-church-gold/50"
                            placeholder="Full announcement text..."
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="published"
                            checked={formData.published}
                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                            className="w-5 h-5 rounded border-gray-300 text-church-gold focus:ring-church-gold"
                        />
                        <label htmlFor="published" className="text-church-white font-medium">Publish Now</label>
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full bg-church-gold text-church-midnight font-bold py-3 rounded-xl hover:bg-yellow-400 transition-colors disabled:opacity-50 flex justify-center"
                    >
                        {saving ? <Loader2 className="animate-spin" /> : (editItem ? "Update Announcement" : "Post Announcement")}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
