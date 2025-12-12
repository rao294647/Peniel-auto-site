"use client";

import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/admin/ui/GlassCard";
import { Badge } from "@/components/admin/ui/Badge";
import {
    ImageIcon,
    Megaphone,
    LayoutGrid,
    Flag,
    Activity,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getCountFromServer, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";

export default function DashboardHome() {
    const { user, role } = useAuth();
    const [stats, setStats] = useState({
        bentoCards: 0,
        announcements: 0,
        galleryImages: 0,
        activeBanner: false
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                // Count Bento Cards
                const bentoSnap = await getCountFromServer(collection(db, "site/bento/cards"));

                // Count Active Announcements
                const now = new Date();
                const announcementsRef = collection(db, "site/announcements/items");
                // Simple count for now, filtering usually done client side if complex or via specific indexes
                // Let's just count all for summary
                const annSnap = await getCountFromServer(announcementsRef);

                // Count Gallery Images
                const gallerySnap = await getCountFromServer(collection(db, "site/gallery/items"));

                // Check Banner Status
                const bannerSnap = await getDocs(collection(db, "site/banner"));
                const activeBanner = !bannerSnap.empty; // Assuming if doc exists it's active or checking a field

                setStats({
                    bentoCards: bentoSnap.data().count,
                    announcements: annSnap.data().count,
                    galleryImages: gallerySnap.data().count,
                    activeBanner
                });
            } catch (err) {
                console.error("Error fetching stats", err);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const ACTIONS = [
        { title: "Manage Hero", desc: "Update homepage hero section", href: "/admin/hero", icon: ImageIcon, color: "text-blue-400" },
        { title: "Update Bento", desc: "Edit grid cards", href: "/admin/bento", icon: LayoutGrid, color: "text-purple-400" },
        { title: "Announcements", desc: "Post new updates", href: "/admin/announcements", icon: Megaphone, color: "text-orange-400" },
        { title: "Upload Gallery", desc: "Add photos to gallery", href: "/admin/gallery", icon: ImageIcon, color: "text-pink-400" },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-church-gold mb-1">Welcome back, {role === 'admin' ? 'Admin' : 'Manager'}</h1>
                    <p className="text-church-white/60">Here is what’s happening on your website today.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="success" className="h-8 px-3 text-sm flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        System Operational
                    </Badge>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Bento Cards", value: stats.bentoCards.toString(), icon: LayoutGrid },
                    { label: "Announcements", value: stats.announcements.toString(), icon: Megaphone },
                    { label: "Gallery Images", value: stats.galleryImages.toString(), icon: ImageIcon },
                    { label: "Banner Active", value: stats.activeBanner ? "Yes" : "No", icon: Flag },
                ].map((stat, i) => (
                    <GlassCard key={i} className="flex flex-col items-center justify-center text-center py-8 gap-2 group hover:bg-white/5 transition-colors cursor-default">
                        <div className="p-3 rounded-full bg-church-white/5 text-church-gold mb-2 group-hover:scale-110 transition-transform">
                            <stat.icon size={24} />
                        </div>
                        <h3 className="text-3xl font-bold text-church-white">{loading ? "-" : stat.value}</h3>
                        <p className="text-sm text-church-white/40">{stat.label}</p>
                    </GlassCard>
                ))}
            </div>

            {/* Quick Actions */}
            <h2 className="text-xl font-serif text-church-white mt-8 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {ACTIONS.map((action, i) => (
                    <Link key={i} href={action.href}>
                        <GlassCard className="h-full flex flex-col justify-between hover:border-church-gold/30 transition-all group">
                            <div className="mb-4">
                                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 mb-4 group-hover:bg-church-gold/20 transition-colors", action.color)}>
                                    <action.icon size={20} className="group-hover:text-church-gold transition-colors" />
                                </div>
                                <h3 className="font-bold text-church-white text-lg">{action.title}</h3>
                                <p className="text-church-white/40 text-sm mt-1">{action.desc}</p>
                            </div>
                            <div className="flex items-center text-sm font-medium text-church-gold/60 group-hover:text-church-gold transition-colors">
                                Open Editor <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </GlassCard>
                    </Link>
                ))}
            </div>
        </div>
    );
}
