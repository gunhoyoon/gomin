export const fetchJobs = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("직업 가져오기 실패");
  }
  return response.json();
};
