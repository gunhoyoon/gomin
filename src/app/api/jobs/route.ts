import { db } from "@/utils/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { NextRequest } from "next/server";

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
