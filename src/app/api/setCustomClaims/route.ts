import { fireAdmin } from "@/utils/firebaseAdmin";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const request = await req.json();
  const uid = request.uid;

  if (!isValidAdminUid(uid)) {
    return new Response(
      JSON.stringify({ message: "Unauthorized to set admin claims." }),
      {
        status: 403,
      }
    );
  }

  try {
    await fireAdmin.auth().setCustomUserClaims(uid, { isAdmin: true });
    return new Response(JSON.stringify({ message: "클레임 추가 성공" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error setting custom claims:", error);
    return new Response(
      JSON.stringify({ message: "Failed to set custom claims." }),
      {
        status: 500,
      }
    );
  }
}

function isValidAdminUid(uid: string) {
  // 여기에 실제 환경 변수를 사용하여 UID 검증 로직 추가
  return process.env.ALLOWED_ADMIN_UID === uid;
}
