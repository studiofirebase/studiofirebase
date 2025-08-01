
import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';

// As credenciais agora serão lidas de uma única variável de ambiente.
const adminCredentials = process.env.FIREBASE_ADMIN_CREDENTIALS;

let adminApp: App;
let db, storage, firestore;

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

    db = getDatabase(adminApp);
    storage = getStorage(adminApp);
    firestore = getFirestore(adminApp);

  } catch (error: any) {
    console.error("Falha ao inicializar o Firebase Admin SDK. Verifique as credenciais em FIREBASE_ADMIN_CREDENTIALS.", error.message);
  }
} else {
  console.warn("A variável de ambiente FIREBASE_ADMIN_CREDENTIALS não está definida. Os serviços do Firebase Admin não funcionarão.");
}

export { db, storage, firestore };
