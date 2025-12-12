import { google } from 'googleapis';

// Interface for our standardized image object
export interface DriveImage {
    id: string;
    name: string;
    thumbnailLink: string;
    webContentLink: string;
    width?: number;
    height?: number;
    mimeType: string;
}

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

export async function getDriveImages(folderId: string): Promise<DriveImage[]> {
    try {
        // 1. Try Service Account Auth (Robust Production)
        if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
            const auth = new google.auth.GoogleAuth({
                keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
                scopes: SCOPES,
            });
            const drive = google.drive({ version: 'v3', auth });
            return await fetchFromDrive(drive, folderId);
        }

        // 2. Try API Key (Simpler, strict limits)
        if (process.env.GOOGLE_DRIVE_API_KEY) {
            const drive = google.drive({ version: 'v3', auth: process.env.GOOGLE_DRIVE_API_KEY });
            return await fetchFromDrive(drive, folderId);
        }

        console.warn("No Google Drive Credentials found (GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_DRIVE_API_KEY). Returning empty list.");
        return [];

    } catch (error) {
        console.error("Error fetching Drive images:", error);
        return [];
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchFromDrive(drive: any, folderId: string): Promise<DriveImage[]> {
    const res = await drive.files.list({
        // Query: Inside folder, is image, not trashed
        q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
        // Fields: optimized for gallery
        fields: 'files(id, name, mimeType, thumbnailLink, webContentLink, imageMediaMetadata)',
        pageSize: 100, // Reasonable limit
        orderBy: 'createdTime desc', // Newest first
    });

    const files = res.data.files;
    if (!files) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return files.map((file: any) => ({
        id: file.id || '',
        name: file.name || '',
        // High-res thumbnail hack: replace s220 with s1000 to get larger thumbnail from same link
        thumbnailLink: file.thumbnailLink ? file.thumbnailLink.replace(/=s\d+/, '=s800') : '',
        webContentLink: file.webContentLink || '',
        width: file.imageMediaMetadata?.width,
        height: file.imageMediaMetadata?.height,
        mimeType: file.mimeType || '',
    }));
}
