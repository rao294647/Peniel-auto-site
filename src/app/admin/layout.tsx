"use client";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/admin/Sidebar";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Inter, Playfair_Display } from "next/font/google"; // Import fonts here as requested for branding consistency

// Initialize fonts (just in case root layout doesn't propagate perfectly or we want isolation)
// Actually Next.js root layout usually handles this, but I'll ensure they are applied.

function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user && pathname !== "/admin/login") {
            router.push("/admin/login");
        }
    }, [user, loading, router, pathname]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-church-midnight text-church-gold">
                {/* Simple loader */}
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-church-gold" />
            </div>
        );
    }

    // If on login page, render full screen without sidebar
    if (pathname === "/admin/login") {
        return <main className="min-h-screen bg-church-midnight font-sans text-church-white">{children}</main>;
    }

    // If authenticated and not on login, show dashboard layout
    if (!user) return null; // Wait for redirect

    return (
        <div className="flex min-h-screen bg-church-midnight text-church-white font-sans selection:bg-church-gold/30">
            <Sidebar />
            <main className="flex-1 max-w-full overflow-x-hidden relative ">
                <div className="p-4 md:p-8 pb-24 md:pb-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AdminProtectedLayout>{children}</AdminProtectedLayout>
        </AuthProvider>
    );
}
