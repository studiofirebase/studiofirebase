// src/lib/firebase-admin.ts
/**
 * @fileOverview Initializes and exports the Firebase Admin SDK instance.
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';

// Only load dotenv in development environment
if (process.env.NODE_ENV !== 'production') {
  try {
    const dotenv = require('dotenv');
    const path = require('path');
    
    // Carregar .env.local (mais específico)
    const envLocalPath = path.resolve(process.cwd(), '.env.local');
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[Firebase Admin] Carregando .env.local de:', envLocalPath);
    }
    
    const envResult = dotenv.config({ 
      path: envLocalPath,
      override: true 
    });

    if (process.env.NODE_ENV === 'development') {
      if (envResult.error) {
        console.log('[Firebase Admin] .env.local não encontrado:', envResult.error.message);
      } else {
        console.log('[Firebase Admin] .env.local carregado com sucesso!');
        console.log('[Firebase Admin] ADMIN_USE_EMULATOR:', process.env.ADMIN_USE_EMULATOR);
        console.log('[Firebase Admin] NEXT_PUBLIC_USE_FIREBASE_EMULATORS:', process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS);
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Firebase Admin] dotenv não disponível, usando variáveis de ambiente');
    }
  }
}

// Verificar se deve usar emulators
const shouldUseEmulators = () => {
  const useEmulators = process.env.NODE_ENV === 'development' && 
         (process.env.ADMIN_USE_EMULATOR === 'true' || 
          process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true');
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[Firebase Admin] 🔍 Verificando emulators:', {
      NODE_ENV: process.env.NODE_ENV,
      ADMIN_USE_EMULATOR: process.env.ADMIN_USE_EMULATOR,
      NEXT_PUBLIC_USE_FIREBASE_EMULATORS: process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS,
      shouldUseEmulators: useEmulators
    });
  }
  
  return useEmulators;
};

// Usar variáveis de ambiente quando disponíveis, com fallback para ADC em produção
const getServiceAccountFromEnv = () => {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (!projectId || !privateKey || !clientEmail) {
    // Sem credenciais em variáveis: permitir fallback para ADC
    if (process.env.NODE_ENV !== 'development') {
      console.log('[Firebase Admin] Variáveis de serviço ausentes. Tentando Application Default Credentials (ADC).');
    }
    return null;
  }

  // Processar a chave privada (remover escapes)
  let processedPrivateKey = privateKey;
  if (processedPrivateKey.includes('\\n')) {
    processedPrivateKey = processedPrivateKey.replace(/\\n/g, '\n');
  } else if (processedPrivateKey.includes('\n')) {
    processedPrivateKey = processedPrivateKey.replace(/\n/g, '\n');
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[Firebase Admin] 🔧 Chave privada processada. BEGIN:', processedPrivateKey.includes('-----BEGIN PRIVATE KEY-----'), 'END:', processedPrivateKey.includes('-----END PRIVATE KEY-----'));
  }

  return {
    type: 'service_account',
    project_id: projectId,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: processedPrivateKey,
    client_email: clientEmail,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${clientEmail}`,
    universe_domain: 'googleapis.com',
  };
};

/**
 * Initializes the Firebase Admin SDK if not already initialized.
 * This function handles creating a single instance of the Firebase Admin App.
 *
 * @returns {App | null} The initialized Firebase Admin App instance or null if initialization fails.
 */
export function initializeFirebaseAdmin() {
  try {
    // Verificar se já existe uma instância
    const existingApps = getApps();
    if (existingApps.length > 0) {
      console.log('[Firebase Admin] App already exists, returning existing instance');
      return existingApps[0];
    }
    
    // Usar credenciais das variáveis ou fallback para ADC
    const serviceAccount = getServiceAccountFromEnv();
    let app;
    if (serviceAccount) {
      if (!serviceAccount.private_key.includes('-----BEGIN PRIVATE KEY-----') || !serviceAccount.private_key.includes('-----END PRIVATE KEY-----')) {
        console.error('[Firebase Admin] ❌ Chave privada incompleta/ inválida nas variáveis. Tentando ADC.');
        app = initializeApp();
      } else {
        app = initializeApp({
          credential: cert(serviceAccount as any),
          databaseURL: process.env.FIREBASE_DATABASE_URL,
          projectId: serviceAccount.project_id
        });
      }
    } else {
      // ADC: funciona em Firebase Hosting/Cloud Run/Functions e quando GOOGLE_APPLICATION_CREDENTIALS está definido
      app = initializeApp();
    }

    console.log('[Firebase Admin] ✅ Firebase Admin SDK initialized successfully');
    
    return app;
  } catch (error) {
    console.error('[Admin SDK] Error during Firebase Admin initialization:', error);
    return null;
  }
}

/**
 * Gets the Firebase Admin App instance, initializing it if necessary.
 *
 * @returns {App | null} The Firebase Admin App instance or null if initialization fails.
 */
export function getAdminApp() {
  try {
    return initializeFirebaseAdmin();
  } catch (error) {
    console.error('[Admin SDK] Error getting admin app:', error);
    return null;
  }
}

/**
 * Gets the Firestore instance from the Firebase Admin App.
 *
 * @returns {Firestore | null} The Firestore instance or null if the app is not initialized.
 */
export function getAdminDb() {
  try {
    const app = getAdminApp();
    if (!app) {
      console.error('[Admin SDK] Cannot get Firestore: Admin app not initialized');
      return null;
    }
    return getFirestore(app);
  } catch (error) {
    console.error('[Admin SDK] Error getting admin database:', error);
    return null;
  }
}

/**
 * Gets the Storage instance from the Firebase Admin App.
 *
 * @returns {Storage | null} The Storage instance or null if the app is not initialized.
 */
export function getAdminStorage() {
  try {
    const app = getAdminApp();
    if (!app) {
      console.error('[Admin SDK] Cannot get Storage: Admin app not initialized');
      return null;
    }
    return getStorage(app);
  } catch (error) {
    console.error('[Admin SDK] Error getting admin storage:', error);
    return null;
  }
}

/**
 * Gets the Auth instance from the Firebase Admin App.
 *
 * @returns {Auth | null} The Auth instance or null if the app is not initialized.
 */
export function getAdminAuth() {
  try {
    const app = getAdminApp();
    if (!app) {
      console.error('[Admin SDK] Cannot get Auth: Admin app not initialized');
      return null;
    }
    return getAuth(app);
  } catch (error) {
    console.error('[Admin SDK] Error getting admin auth:', error);
    return null;
  }
}

// Inicializar automaticamente
let adminApp: any = null;
let adminDb: any = null;
let adminStorage: any = null;
let adminAuth: any = null;

try {
  adminApp = getAdminApp();
  adminDb = getAdminDb();
  adminStorage = getAdminStorage();
  adminAuth = getAdminAuth();
} catch (error) {
  console.error('[Admin SDK] Firebase Admin SDK initialization failed.');
}

// Exportações principais
export { adminApp, adminDb, adminStorage, adminAuth };

// Exportação de auth como default para compatibilidade
export const auth = adminAuth;

// Exportação default
export default adminApp;
