
'use server';
/**
 * @fileOverview Service for uploading media files to Firebase Storage.
 */
import { storage } from '@/lib/firebase-admin';
import { fileTypeFromBuffer } from 'file-type';

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

  const bucket = storage.bucket();

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

/**
 * Lists media files from a specified prefix in Firebase Storage.
 * @param {string} prefix - The prefix (folder path) to list files from.
 * @returns {Promise<string[]>} A promise that resolves with an array of public URLs.
 */
export async function listMedia(prefix: string): Promise<string[]> {
  const bucket = storage.bucket();
  try {
    const [files] = await bucket.getFiles({ prefix: prefix });
    const urls = files.map(file => file.publicUrl());
    console.log(`Listed ${urls.length} files from ${prefix}`);
    return urls;
  } catch (error: any) {
    console.error(`Error listing media from ${prefix}:`, error);
    throw new Error(`Failed to list media from ${prefix}. Reason: ${error.message}`);
  }
}
