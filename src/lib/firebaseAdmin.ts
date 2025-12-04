import admin from "firebase-admin";

interface ServiceAccount {
  projectId?: string;
  clientEmail?: string;
  privateKey?: string;
}

if (!admin.apps.length) {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountKey) {
    try {
      const parsed = JSON.parse(serviceAccountKey) as ServiceAccount;
      admin.initializeApp({
        credential: admin.credential.cert(parsed),
      });
    } catch (error) {
      console.error("Erro ao ler variável de ambiente:", error);
    }
  } else {
    try {
      const serviceAccount = require("../../serviceAccountKey.json");
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("Firebase conectado via arquivo local.");
    } catch (error) {
      console.error(
        "ERRO: serviceAccountKey.json não encontrado na raiz."
      );
    }
  }
}

export const db = admin.firestore();
export const auth = admin.auth();
export default admin;
