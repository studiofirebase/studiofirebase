
import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getStorage } from 'firebase-admin/storage';

// As credenciais agora serão lidas de uma única variável de ambiente.
const adminCredentials = process.env.FIREBASE_ADMIN_CREDENTIALS;

if (!adminCredentials) {
  // Em um ambiente de desenvolvimento sem a variável, não lançamos um erro fatal
  // para permitir que outras partes do aplicativo funcionem.
  // Os fluxos que dependem do Firebase Admin irão falhar graciosamente.
  console.warn("A variável de ambiente FIREBASE_ADMIN_CREDENTIALS não está definida. Os serviços do Firebase não funcionarão.");
}

let adminApp: App | undefined;
let db, storage;

if (adminCredentials) {
    try {
        // Analisa a string JSON e formata a chave privada.
        const serviceAccount = JSON.parse(adminCredentials);
        if (serviceAccount.private_key) {
            serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
        }

        const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

        if (!getApps().length) {
          adminApp = initializeApp({
            credential: cert(serviceAccount),
            databaseURL: `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com`,
            storageBucket: storageBucket,
          });
        } else {
          adminApp = getApps()[0];
        }

        db = getDatabase(adminApp);
        storage = getStorage(adminApp);

    } catch (error: any) {
        console.error("Falha ao inicializar o Firebase Admin SDK:", error.message);
    }
}


export { db, storage };
