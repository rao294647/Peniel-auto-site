import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "success" | "warning" | "error" | "neutral" | "gold";
    className?: string;
}

const variants = {
    success: "bg-green-500/20 text-green-300 border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    error: "bg-red-500/20 text-red-300 border-red-500/30",
    neutral: "bg-church-white/10 text-church-white/60 border-white/10",
    gold: "bg-church-gold/20 text-church-gold border-church-gold/30",
};

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
    return (
        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", variants[variant], className)}>
            {children}
        </span>
    );
}
