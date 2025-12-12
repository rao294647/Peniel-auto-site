"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    Image as ImageIcon,
    LayoutGrid,
    Megaphone,
    Settings,
    LogOut,
    Flag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Hero Editor", href: "/admin/hero", icon: ImageIcon },
    { label: "Bento Grid", href: "/admin/bento", icon: LayoutGrid },
    { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
    { label: "Gallery", href: "/admin/gallery", icon: ImageIcon }, // Reusing Image icon or can use different one
    { label: "Banner", href: "/admin/banner", icon: Flag },
];

export function Sidebar() {
    const pathname = usePathname();
    const { logout, role } = useAuth();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle - Need a way to toggle, usually from a top header or floating button. 
          For now, I'll assume the Layout wraps this and might handle mobile constraints, 
          but simpler to just have a visible sidebar on desktop and a bottom nav on mobile as requested.
      */}

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-church-midnight border-r border-white/10 backdrop-blur-xl">
                <div className="p-8 pb-4">
                    <h2 className="text-2xl font-serif text-church-gold">Peniel Admin</h2>
                    <p className="text-xs text-church-white/40 uppercase tracking-widest mt-1">{role} access</p>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative overflow-hidden",
                                    isActive
                                        ? "text-church-white bg-church-white/5 border border-white/5"
                                        : "text-church-white/60 hover:text-church-white hover:bg-church-white/5"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 bg-gradient-to-r from-church-gold/10 to-transparent opacity-50"
                                    />
                                )}
                                <Icon size={20} className={cn("relative z-10", isActive ? "text-church-gold" : "group-hover:text-church-white")} />
                                <span className="relative z-10 font-medium">{item.label}</span>
                            </Link>
                        );
                    })}

                    {role === "admin" && (
                        <>
                            <div className="my-4 h-px bg-white/10 mx-4" />
                            <Link
                                href="/admin/settings"
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative",
                                    pathname === "/admin/settings"
                                        ? "text-church-white bg-church-white/5 border border-white/5"
                                        : "text-church-white/60 hover:text-church-white hover:bg-church-white/5"
                                )}
                            >
                                <Settings size={20} className={cn("relative z-10", pathname === "/admin/settings" ? "text-church-gold" : "group-hover:text-church-white")} />
                                <span className="relative z-10 font-medium">Settings</span>
                            </Link>
                        </>
                    )}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-church-midnight/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around z-50 px-2">
                {NAV_ITEMS.slice(0, 4).map((item) => { // Show first 4
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center p-2">
                            <Icon size={20} className={cn(isActive ? "text-church-gold" : "text-church-white/40")} />
                            <span className={cn("text-[10px] mt-1", isActive ? "text-church-gold" : "text-church-white/40")}>
                                {item.label === "Dashboard" ? "Home" : item.label.split(" ")[0]}
                            </span>
                        </Link>
                    );
                })}
                {/* Menu/More button for others */}
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="flex flex-col items-center justify-center p-2"
                >
                    <div className="p-1 rounded bg-church-white/10">
                        <Settings size={16} className="text-church-white/60" />
                    </div>
                    <span className="text-[10px] mt-1 text-church-white/40">Menu</span>
                </button>
            </nav>

            {/* Mobile Drawer (Full Menu) */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="md:hidden fixed inset-0 z-40 bg-church-midnight pt-10 pb-20 px-6 overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-serif text-church-gold">Menu</h2>
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="p-2 bg-church-white/10 rounded-full"
                            >
                                <LogOut size={16} className="rotate-180" /> {/* Just a close icon visual hack or use X */}
                            </button>
                        </div>

                        <div className="grid gap-3">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    href={item.href}
                                    className="flex items-center gap-4 p-4 bg-church-white/5 rounded-2xl border border-white/5"
                                >
                                    <item.icon size={24} className="text-church-gold" />
                                    <span className="text-lg text-church-white font-medium">{item.label}</span>
                                </Link>
                            ))}

                            {role === "admin" && (
                                <Link
                                    onClick={() => setIsMobileOpen(false)}
                                    href="/admin/settings"
                                    className="flex items-center gap-4 p-4 bg-church-white/5 rounded-2xl border border-white/5"
                                >
                                    <Settings size={24} className="text-church-gold" />
                                    <span className="text-lg text-church-white font-medium">Settings</span>
                                </Link>
                            )}

                            <button
                                onClick={() => { setIsMobileOpen(false); logout(); }}
                                className="flex items-center gap-4 p-4 bg-red-900/20 rounded-2xl border border-red-500/20 mt-4"
                            >
                                <LogOut size={24} className="text-red-400" />
                                <span className="text-lg text-red-300 font-medium">Logout</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
