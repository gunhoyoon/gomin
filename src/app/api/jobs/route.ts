import { db } from "@/utils/firebase-config";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { NextRequest } from "next/server";
import { v4 as uuid } from "uuid";
export async function GET() {
  try {
    console.log("찌르긴함?");
    const querySnapshot = await getDocs(collection(db, "jobs"));
    console.log("querySnapshot", querySnapshot);
    const jobsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("jobsList", jobsList);
    return new Response(JSON.stringify(jobsList), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching jobs", error);
    return new Response(JSON.stringify("에러"), {
      status: 500,
    });
  }
}
export async function POST(request: NextRequest) {
  const req = await request.json();
  console.log(req);
  try {
    const jobsCol = collection(db, "jobs"); // 'jobs' 컬렉션 참조
    const newDocRef = doc(jobsCol); // 새 문서 참조 생성
    await setDoc(newDocRef, req); // 문서에 데이터 설정

    return new Response(
      JSON.stringify({
        docId: newDocRef.id, // 생성된 문서 ID 반환
        data: req, // 저장된 데이터 반환
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching jobs", error);
    return new Response(JSON.stringify("에러"), {
      status: 500,
    });
  }
}
