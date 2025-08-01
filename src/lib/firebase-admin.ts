
import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';

// As credenciais agora serão lidas de uma única variável de ambiente.
const adminCredentials = process.env.FIREBASE_ADMIN_CREDENTIALS;

let adminApp: App;

if (adminCredentials) {
  try {
    const serviceAccount = JSON.parse(adminCredentials);
    if (serviceAccount.private_key) {
      // Garante que as quebras de linha na chave privada sejam interpretadas corretamente.
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    if (!getApps().length) {
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        databaseURL: `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com`,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    } else {
      adminApp = getApps()[0];
    }

  } catch (error: any) {
    console.error("Falha ao inicializar o Firebase Admin SDK. Verifique as credenciais em FIREBASE_ADMIN_CREDENTIALS.", error.message);
    // Lançar o erro impede que o resto do código tente usar um 'adminApp' não inicializado.
    throw new Error("As credenciais do Firebase Admin não puderam ser analisadas. O backend não pode ser iniciado.");
  }
} else {
  console.warn("A variável de ambiente FIREBASE_ADMIN_CREDENTIALS não está definida. Os serviços do Firebase Admin não funcionarão.");
}

// @ts-ignore - adminApp será inicializado se as credenciais existirem
const db = adminApp ? getDatabase(adminApp) : null;
// @ts-ignore
const storage = adminApp ? getStorage(adminApp) : null;
// @ts-ignore
const firestore = adminApp ? getFirestore(adminApp) : null;


if (!db || !storage || !firestore) {
    console.warn("Uma ou mais conexões do Firebase (DB, Storage, Firestore) não foram inicializadas devido à falta de credenciais.");
}


export { db, storage, firestore };
