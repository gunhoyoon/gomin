import * as admin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  projectId: "gomingomin",
  privateKeyId: "fff814b6e71546afcda6ac8073d9c8b2a3936492",
  privateKey:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDaI4qfj6cu7kwB\n1PholPudw0IbzQik307TOFye9MIaoBplI87CVr0coDjn8kqY7MZ1ey+A4v9717NT\nhLipx1glYUiyrTqCqmyIC6Yv9ArKmhjgOKAUTmnC9A5Z5aXy/+YYkfKfuCTfx/cB\nhz76qQD7fVQ6K8ty81ugyybS9LLqo38+2boPoGKmNIgOPpHV617nSerIS1gC2Kll\nfv5rH8vNzfvA0KufpBbqNwBG4pl36kteZyznnmiGSX6ZzO2V9hP8KUipe3+YYybb\nDYw/uIceT4DGBVLDZcHz4VWZ2ZYN8lMrldvAhu5WwkgRkXgSqr+OF9nN6Qh+IfHL\nHsBe/IvJAgMBAAECggEABofC9HqZtYU2dJiVh8kr/8gfmflcbW+IKp9/LSM99PH/\nKeRCSJDNsDlyTEYb3X7Ut+6Ksisf6fgMlLu+Rn2vm4DeN9RWEjrVYG/bpAeRIIl8\nvkIO6SsdLe2qyOsTBn0KlgidsMV6IlJLbsa64ZVx8G8LHwNLUvZKzPu/8aR+ZbLj\nEH0RzJyekbSE8uQbMDuBNI4vS3Zi8I4V6dfFGJPRWg8N7PkyKmepz7W+xiFGdoTH\nGq/cTl4QMjaeUiaHVbFC6t8FXDY+aZDkApTxg3fTscFwTltqIAbCu1AsS4JPLJg+\nrI9MmdmhUoZCmHbGlkVYa+ntZdcIbQAAUB60Q6JWvQKBgQD0KVFthRtbtfPbQ6h5\nKZiLUEqO+U/zw01kOT1dUCEyAv8P9/TLzoQcJxUOqXuuRUeSFIFM0UxQK0OV2qNq\nel5Nmwjzf6NbU/Cm5O6jgJdoh6ykxhBKi9bCepfJYF+uKckl8OHl9GXt/Ds0td7V\n6j7ldv0egZtCVixE2NTOtpZCtQKBgQDktzcdShC+X76ua8idhnpe7kJIdVYkUByr\nv3gEDqEokbOr+0ma21gtGxix2ETvfdB2HvRJvDNRr6HsK18NDr2owXGDxiYQBzzQ\n4+RSur1o4yw/03JokQGS0WUaxbswOUJOHecHkbU2o+Zy+qYRXlbEVm8opYe7dx0B\n/6ePh6/tRQKBgBqbnhoXVWHrNEYC24tIsy0LdPSbytC/yeFQM5XFs7hlhzJQTUcg\nnFkNEUhlw+q79g6/WU/rxys9a8Ia75AdAcXnTVRr5nt/bExjynXa/6UOlAvo4cGd\n96t9/Kifbg3m09rko1mSBsGmqTUXVM9vFaegDfmTGj5icbSXBKn6T+m5AoGAJxRf\nKHQFVGILtMXZ64CU3C+dx7+0zlOZ8oauvRK62rG6n4I6W2lrMZnVqF2pubonqmcz\nmn27zxNReYcXoKWKJpGXEcsDqe1yqMantrMNtiRK5UT94XwVZr68pcxvZZgDClH1\nrcdpzUJIGBFX2tPhw355U9qkzJVXsYW7XbzzhHkCgYA9gPc+NxGZGoHTohHRHa2f\n8Ccxn/aaZz5ALK10zpXtMwLfynTKpaX83askWcR0a/TT3bZTYCZaV6PFBnFfggGB\nyppO0bZEt6AXRUUi5Ph5eEspODDrZGIdn1+MhEoOZH8V314cjrdUNIRXr9YOap8T\nQTTPbH4FxuRNSym9f0po/w==\n-----END PRIVATE KEY-----\n",
  clientEmail: "firebase-adminsdk-gtilo@gomingomin.iam.gserviceaccount.com",
  clientId: "107214258702275601464",
  authUri: "https://accounts.google.com/o/oauth2/auth",
  tokenUri: "https://oauth2.googleapis.com/token",
  authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
  clientX509CertUrl:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gtilo%40gomingomin.iam.gserviceaccount.com",
};
// console.log("process.env.FIREBASE_PROJECT_ID", process.env.FIREBASE_PROJECT_ID);
// console.log(
//   "process.env.FIREBASE_PRIVATE_KEY",
//   process.env.FIREBASE_PRIVATE_KEY
// );
// 일단 이거 환경변수 나중에 설정하자 privatekey 에러 발생 , 직접 값 넣어주면 되는데.
export const fireAdmin = admin.apps[0]
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
// 이걸 뮤테이트로 해서 성공하면 브라우저 업데이트
