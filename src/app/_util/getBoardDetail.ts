export const getBoardDetail = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [, jobId] = queryKey;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/board?jobId=${jobId}`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      //   credentials: "include", // 인증이 필요현 api일 경우
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("디테일 데이터 가져오기 실패");
  }
  return response.json();
};
