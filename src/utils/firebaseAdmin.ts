import * as admin from "firebase-admin";

export const fireAdmin = admin.apps[0]
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert(
        process.env.GOOGLE_APPLICATION_CREDENTIALS as string
      ),
    });
