import { db } from "@/utils/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("jobId");
  console.log("id", id); // Developer
  try {
    const querySnapshot = await getDocs(collection(db, id as string));
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id, // 각 문서의 ID
      ...doc.data(), // 그리고 각 문서의 데이터
    }));

    return new Response(JSON.stringify(documents), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "에러발생" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
