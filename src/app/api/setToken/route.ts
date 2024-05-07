import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // console.log("res", res.__proto__);
  // console.log("req", req.__proto__);
  if (req.method === "POST") {
    const { idToken } = req.body;
    if (!idToken) {
      return new Response(JSON.stringify({ message: "idToken is required" }), {
        status: 400,
      });
    }
    //
    // console.log(res, "res");
    res.setHeader(
      "Set-Cookie",
      `idToken=${idToken}; path=/; HttpOnly; Secure; SameSite=Strict`
    );
    // idToken을 가져다가 다시 클라이언트한테 물고 있어라 하는 구조가 이상하다. 이미 클라이언트에 있는 값인데
    return res.status(200).json({ message: "Hello from Next.js!" });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// import type { NextApiRequest, NextApiResponse } from 'next'

// type ResponseData = {
//   message: string
// }

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }
