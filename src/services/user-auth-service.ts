
'use server';
/**
 * @fileOverview Service for managing user data in Firebase for facial authentication.
 * This includes saving user details to the Realtime Database and their face image to Firebase Storage.
 */
import { db, storage } from '@/lib/firebase-admin';
import type { RegisterUserInput } from '@/ai/flows/user-auth-flow';

/**
 * Saves user data to Realtime Database and their image to Firebase Storage.
 * @param {RegisterUserInput} userData - The user's registration data, including the base64 image.
 */
export async function saveUser(userData: RegisterUserInput) {
  const { name, email, phone, imageBase64 } = userData;

  if (!db || !storage) {
     throw new Error("A conexão com o Firebase não foi inicializada. Verifique as credenciais do servidor.");
  }

  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!storageBucket) {
    throw new Error("Firebase Storage bucket URL is not configured in environment variables (NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET).");
  }

  try {
    // 1. Upload image to Firebase Storage
    const imageBuffer = Buffer.from(imageBase64.split(',')[1], 'base64');
    const fileName = `faces/${email.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.jpg`;
    const file = storage.bucket().file(fileName);
    
    await file.save(imageBuffer, {
      metadata: { contentType: 'image/jpeg' },
      public: true, // Make the image publicly readable
    });
    
    // The public URL is what we will store.
    const imageUrl = file.publicUrl();
    console.log(`Image uploaded to ${imageUrl}`);

    // 2. Save user data to Realtime Database
    const userRef = db.ref(`users/${email.replace(/[^a-zA-Z0-9]/g, '_')}`);
    await userRef.set({
      name,
      email,
      phone,
      imageUrl, // Store the public URL of the image
      createdAt: new Date().toISOString(),
    });

    console.log(`User data for ${email} saved to Realtime DB.`);

  } catch (error: any) {
    console.error('Error saving user data:', error);
    throw {
        message: 'Falha ao salvar os dados do usuário. Por favor, tente novamente.',
        errorCode: 'SAVE_FAILED',
    };
  }
}

/**
 * Retrieves all users from the Realtime Database.
 * @returns {Promise<any[]>} A promise that resolves to an array of user objects.
 */
export async function getAllUsers(): Promise<any[]> {
    if (!db) {
     throw new Error("A conexão com o Firebase não foi inicializada. Verifique as credenciais do servidor.");
    }
    try {
        const usersRef = db.ref('users');
        const snapshot = await usersRef.once('value');
        const usersData = snapshot.val();

        if (!usersData) {
            return [];
        }

        // Convert the users object into an array
        return Object.keys(usersData).map(key => ({
            id: key,
            ...usersData[key]
        }));
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Could not retrieve user data from the database.');
    }
}
