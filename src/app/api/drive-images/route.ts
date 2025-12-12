import { NextRequest, NextResponse } from 'next/server';
import { getDriveImages, DriveImage } from '@/lib/drive-client';

// Cache configuration
export const revalidate = 3600; // Revalidate every hour by default

// Fallback Folder ID (from user request)
const DEFAULT_FOLDER_ID = '158Ho4qRVDavLPw2YVLjkr2qmyP0DQarf';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const folderId = searchParams.get('folderId') || process.env.DRIVE_FOLDER_ID || DEFAULT_FOLDER_ID;
    // const forceRefresh = searchParams.get('refresh') === 'true';

    try {
        // If refresh=true, this route might be called dynamically, 
        // but standard Next.js 'revalidate' export handles the static regeneration time.
        // For specific dynamic refresh, we'd need to use 'unstable_cache' or manual cache control headers.

        // For this implementation, we rely on the service logic.
        const images: DriveImage[] = await getDriveImages(folderId);

        // If no images found (maybe Auth failed), fallback to empty
        // In a real scenario, we might want to try reading a local fallback JSON here too.

        return NextResponse.json({
            images,
            lastUpdated: new Date().toISOString(),
            source: 'api'
        }, {
            headers: {
                // Browser cache for 5 minutes, CDN/Vercel cache for 1 hour
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600'
            }
        });

    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}
