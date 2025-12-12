This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.


## Google Drive Gallery Integration

The photo gallery is powered by the Google Drive API.

### Setup Instructions

1.  **Google Service Account (Recommended for Production)**:
    -   Create a Service Account in Google Cloud Console.
    -   Generate a JSON key and save it in your project root (e.g., `service-account.json`).
    -   Set `GOOGLE_SERVICE_ACCOUNT_JSON=service-account.json`. (Or paste the content string).
    -   **Important**: Share your Drive folder (`158Ho4qRVDavLPw2YVLjkr2qmyP0DQarf`) with the Service Account email address.

2.  **API Key (Alternative)**:
    -   Set `GOOGLE_DRIVE_API_KEY` in `.env.local`.
    -   Note: This method might hit limits faster.

3.  **Folder ID**:
    -   Set `DRIVE_FOLDER_ID` in `.env.local` if you want to change the default folder.

### Environment Variables
```env
GOOGLE_SERVICE_ACCOUNT_JSON="./service-credentials.json"
DRIVE_FOLDER_ID="158Ho4qRVDavLPw2YVLjkr2qmyP0DQarf"
```

### Manual Refresh
Because the API result is cached for 1 hour, you can trigger a refresh by visiting:
`/api/drive-images?refresh=true` (Requires implementation of manual revalidation).
