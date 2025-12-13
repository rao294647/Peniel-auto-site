"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Map username to email logic
            const rawInput = email.trim();
            let loginEmail = rawInput;

            if (!rawInput.includes("@")) {
                if (rawInput === "9000012512") loginEmail = "admin@peniel.church";
                else if (rawInput.toLowerCase() === "peniel team") loginEmail = "manager@peniel.church";
                // Fallback for user convenience if they type 'admin'
                else if (rawInput.toLowerCase() === "admin") loginEmail = "admin@peniel.church";

                // If still no '@', it's definitely invalid for Firebase
                if (!loginEmail.includes("@")) {
                    throw { code: "custom/invalid-format", message: "Please enter a valid Email Address or registered Username (e.g., 9000012512)" };
                }
            }

            try {
                await signInWithEmailAndPassword(auth, loginEmail, password);
                router.push("/admin/dashboard");
            } catch (err: any) {
                console.error("Login Error:", err);

                // Specific handling for Setup Issues
                if (err.message && err.message.includes("api-key-not-valid")) {
                    setError("CONFIG ERROR: Invalid API Key. Please update .env.local with real Firebase keys.");
                    return;
                }

                // Keep the auto-seeding logic for user-not-found
                if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
                    // Check if it matches Admin or Manager explicitly
                    const isAdmin = (loginEmail === "admin@peniel.church" && password === "Satyam@12345");
                    const isManager = (loginEmail === "manager@peniel.church" && password === "Peniel$2026");

                    if (isAdmin || isManager) {
                        const { createUserWithEmailAndPassword } = await import("firebase/auth");
                        const { doc, setDoc } = await import("firebase/firestore");
                        const { db } = await import("@/lib/firebase");

                        // Create Auth User
                        const userCred = await createUserWithEmailAndPassword(auth, loginEmail, password);

                        // Create Firestore Role Document
                        await setDoc(doc(db, "users", userCred.user.uid), {
                            email: loginEmail,
                            role: isAdmin ? "admin" : "manager",
                            createdAt: new Date(),
                            username: isAdmin ? "9000012512" : "Peniel Team"
                        });

                        // Success - Redirect
                        router.push("/admin/dashboard");
                        return;
                    }
                }
                throw err;
            }
        } catch (err: any) {
            console.error(err);
            // Show RAW error for debugging
            setError(`Error: ${err.code || "Unknown"} - ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-church-midnight relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-church-maroon/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-church-gold/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 rounded-3xl bg-church-glass backdrop-blur-xl border border-white/10 shadow-2xl relative z-10"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif text-church-gold mb-2">Peniel Church</h1>
                    <p className="text-church-white/60 font-sans">Admin Dashboard Access</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-church-white/80 mb-2 ml-1">Username / Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-church-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-church-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-church-gold/50 transition-all font-sans"
                            placeholder="Enter your ID"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-church-white/80 mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-church-midnight/50 border border-white/10 rounded-xl px-4 py-3 text-church-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-church-gold/50 transition-all font-sans"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm text-center break-words">
                            <span className="font-bold block mb-1">Login Failed</span>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-church-maroon to-red-900 border border-white/10 text-white font-medium py-3 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-black/20"
                    >
                        {loading ? "Signing in..." : "Access Dashboard"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
