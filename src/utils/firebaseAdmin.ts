import * as admin from "firebase-admin";

export const fireAdmin = admin.apps[0]
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert(
        process.env.GOOGLE_APPLICATION_CREDENTIALS as string
      ),
    });
// 이걸 뮤테이트로 해서 성공하면 브라우저 업데이트
