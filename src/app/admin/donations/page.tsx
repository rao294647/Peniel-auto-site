"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GlassCard } from "@/components/admin/ui/GlassCard";
import { format } from "date-fns";
import { Trash2, Download, ExternalLink, Calendar, Phone, MapPin, DollarSign, User } from "lucide-react";
import Image from "next/image";

interface Donation {
    id: string;
    name: string;
    phone: string;
    address: string;
    purpose: string;
    screenshotUrl?: string;
    submittedAt?: any;
    status: string;
}

export default function DonationsPage() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, "site/giving-submissions"), // Note: Collection path from GivingModal.tsx
            orderBy("submittedAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Donation[];
            setDonations(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this record?")) {
            await deleteDoc(doc(db, "site/giving-submissions", id));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-church-gold"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif text-church-gold">Donation Records</h1>
                    <p className="text-church-white/60">View and manage incoming donations.</p>
                </div>
                <div className="px-4 py-2 bg-church-glass rounded-lg border border-white/10 text-church-white/80">
                    Total Records: <span className="text-church-gold font-bold">{donations.length}</span>
                </div>
            </div>

            {donations.length === 0 ? (
                <div className="text-center py-20 bg-church-glass rounded-xl border border-white/5">
                    <p className="text-church-white/40 text-lg">No donation records found yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {donations.map((donation) => (
                        <GlassCard key={donation.id} className="relative group overflow-hidden hover:border-church-gold/30 transition-all duration-300">
                            {/* Status Badge */}
                            <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${donation.status === 'verified' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                {donation.status || 'pending'}
                            </div>

                            <div className="p-4 space-y-4">
                                {/* Header: Name & Purpose */}
                                <div>
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <User className="w-4 h-4 text-church-gold" />
                                        {donation.name}
                                    </h3>
                                    <p className="text-sm text-church-gold/80 bg-church-gold/10 inline-block px-2 py-0.5 rounded mt-1">
                                        {donation.purpose}
                                    </p>
                                </div>

                                {/* Details Grid */}
                                <div className="space-y-2 text-sm text-church-white/70">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-white/40" />
                                        <span>{donation.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-white/40" />
                                        <span>{donation.address || "No address provided"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-white/40" />
                                        <span>
                                            {donation.submittedAt?.toDate
                                                ? format(donation.submittedAt.toDate(), "PPP p")
                                                : "Just now"}
                                        </span>
                                    </div>
                                </div>

                                {/* Attachment Preview */}
                                {donation.screenshotUrl ? (
                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <p className="text-xs text-white/40 uppercase mb-2">Attachment</p>
                                        <div className="relative h-40 w-full rounded-lg overflow-hidden bg-black/50 border border-white/10 group-hover:border-white/20 transition-colors">
                                            <Image
                                                src={donation.screenshotUrl}
                                                alt="Payment Proof"
                                                fill
                                                className="object-cover"
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <a
                                                    href={donation.screenshotUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="p-2 bg-white/20 rounded-full hover:bg-white/40 text-white transition-colors"
                                                    title="View Full Size"
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-4 pt-4 border-t border-white/5 h-40 flex items-center justify-center text-white/20 text-sm italic">
                                        No screenshot attached
                                    </div>
                                )}
                            </div>

                            {/* Delete Action */}
                            <button
                                onClick={(e) => handleDelete(donation.id, e)}
                                className="absolute bottom-4 right-4 p-2 text-red-400/50 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors z-20"
                                title="Delete Record"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </GlassCard>
                    ))}
                </div>
            )}
        </div>
    );
}
