
'use server';
/**
 * @fileOverview Service for uploading media files to Firebase Storage.
 */
import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { fileTypeFromBuffer } from 'file-type';

// Ensure this service is only initialized once
let adminApp: App;
if (!getApps().length) {
  const serviceAccount = {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };
  adminApp = initializeApp({
    credential: cert(serviceAccount as any),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
} else {
  adminApp = getApps()[0];
}

const storage = getStorage(adminApp);
const bucket = storage.bucket();

interface UploadMediaParams {
  fileBase64: string;
  fileName: string;
  category: 'image' | 'video';
}

/**
 * Uploads a base64 encoded file to Firebase Storage.
 * @param {UploadMediaParams} params - The file data and metadata.
 * @returns {Promise<string>} The public URL of the uploaded file.
 */
export async function uploadMedia({ fileBase64, fileName, category }: UploadMediaParams): Promise<string> {
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!storageBucket) {
    throw new Error("Firebase Storage bucket URL is not configured (NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET).");
  }

  try {
    const buffer = Buffer.from(fileBase64.split(',')[1], 'base64');
    
    // Detect MIME type from buffer for accuracy
    const type = await fileTypeFromBuffer(buffer);
    if (!type) {
      throw new Error("Could not determine file type.");
    }

    const path = `uploads/${category}s/${Date.now()}-${fileName}`;
    const file = bucket.file(path);

    await file.save(buffer, {
      metadata: { contentType: type.mime },
      public: true, // Make file publicly accessible
    });

    const publicUrl = file.publicUrl();
    console.log(`${fileName} uploaded to ${publicUrl}`);
    return publicUrl;

  } catch (error: any) {
    console.error('Error uploading media to Firebase Storage:', error);
    throw new Error(`Failed to upload ${fileName}. Reason: ${error.message}`);
  }
}
