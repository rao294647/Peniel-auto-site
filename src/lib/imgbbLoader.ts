'use client';

export default function imgbbLoader({ src, width, quality }: { src: string, width?: number, quality?: number }) {
    // Ensure src is absolute before URL construction, or handle relative paths
    if (!src.startsWith('http')) {
        return src;
    }
    const url = new URL(src);
    if (width) url.searchParams.set("w", width.toString());
    if (quality) url.searchParams.set("q", quality.toString());
    return url.toString();
}
