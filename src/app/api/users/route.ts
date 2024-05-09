import { fireAdmin } from "@/utils/firebaseAdmin";
import { RequestContext } from "next/dist/server/base-server";
import { NextRequest } from "next/server";
// import { initializeApp, credential } from "firebase-admin";
// import * as admin from "firebase-admin";
// initializeApp({
//   credential: credential.cert(
//     process.env.GOOGLE_APPLICATION_CREDENTIALS as string
//   ),
// });

export async function GET(req: NextRequest) {
  try {
    // app;
    const uid = new URL(req.url).searchParams.get("uid");
    const userRecord = await fireAdmin.auth().getUser(uid || "");
    // console.log("userRecord", userRecord);
    // console.log(
    //   "Service Account Path:",
    //   "/Users/yungeonho/Downloads/gomingomin-firebase-adminsdk-gtilo-fff814b6e7.json"
    // );
    return new Response(JSON.stringify(userRecord), { status: 200 });
  } catch (error) {
    console.log("error", error);
    return new Response(JSON.stringify("에러"), { status: 400 });
  }
}
