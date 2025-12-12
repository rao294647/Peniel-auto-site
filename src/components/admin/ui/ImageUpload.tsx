"use client";

import { useState, useRef } from "react";
import { uploadToImgBB } from "@/lib/imgbb";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    directory: string; // Kept for compatibility
    onUpload: (url: string) => void;
    onDelete?: () => void;
    currentImage?: string;
    label?: string;
}

export function ImageUpload({ directory, onUpload, onDelete, currentImage, label = "Upload Image" }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0); // Fake progress
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate type
        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file");
            return;
        }

        // Validate size (e.g. 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("File is too large (max 5MB)");
            return;
        }

        try {
            setUploading(true);

            // Fake progress simulation since fetch doesn't support progress events easily
            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 90));
            }, 200);

            const url = await uploadToImgBB(file);

            clearInterval(progressInterval);
            setProgress(100);

            onUpload(url);
            setUploading(false);
            setProgress(0);
        } catch (error) {
            console.error(error);
            setUploading(false);
            alert("Upload failed: " + ((error as any).message || "Unknown error"));
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-church-white/80 ml-1">{label}</label>

            {!currentImage && !uploading && (
                <div
                    onClick={() => inputRef.current?.click()}
                    className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 hover:border-church-gold/50 transition-all group"
                >
                    <UploadCloud className="w-10 h-10 text-church-white/40 group-hover:text-church-gold mb-2 transition-colors" />
                    <p className="text-sm text-church-white/60 group-hover:text-church-white transition-colors">Click to upload image</p>
                </div>
            )}

            {uploading && (
                <div className="border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center bg-church-white/5">
                    <div className="w-full max-w-[200px] h-2 bg-church-midnight rounded-full overflow-hidden">
                        <div
                            className="h-full bg-church-gold transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-xs text-church-white/60 mt-2">Uploading... {Math.round(progress)}%</p>
                </div>
            )}

            {currentImage && !uploading && (
                <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                    <img src={currentImage} alt="Uploaded" className="w-full h-48 object-cover" />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (onDelete) onDelete();
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                        <X size={16} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-xs text-center text-white/80 truncate">{currentImage.split('/').pop()?.split('?')[0] || "Image"}</p>
                    </div>
                </div>
            )}

            <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
        </div>
    );
}
