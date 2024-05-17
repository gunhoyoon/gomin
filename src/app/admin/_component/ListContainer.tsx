import React, { ChangeEventHandler, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Job } from "@/model/Job";
import Link from "next/link";
import { fetchJobs } from "@/app/_util/jobsData";

export default function ListContainer() {
  const [jobData, setJobData] = useState<Job>({ name: "", type: "" });
  const queryClient = useQueryClient();
  const { data: JobsData } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    staleTime: 60000, // 60 seconds
    gcTime: 300000, // 5 minutes
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (job: Job) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log("data", data);

      queryClient.invalidateQueries({ queryKey: ["jobs"] }); // 즉각 업데이트ㅏㄲ지 완료
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onAddJobs: ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (jobData) {
      mutate(jobData);
    }
  };

  const handleData: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={onAddJobs}>
        <label htmlFor="jobName">직업 이름:</label>
        <input
          id="jobName"
          type="text"
          name="name"
          value={jobData.name}
          onChange={handleData}
        />
        <label htmlFor="jobType">직업 타입:</label>
        <input
          id="jobType"
          type="text"
          name="type"
          value={jobData.type}
          onChange={handleData}
        />
        <button type="submit">추가하기</button>
      </form>
      <ul>
        {JobsData &&
          JobsData.map((job) => (
            <li key={job.id}>
              <Link href={`/admin/board?jobId=${job.type}`}>{job.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

// 글 리스트가 나오고 결국 컨테이너에서 관련 데이터를 다 들고 있어야됨
// 아 근데 그 전에 직업에 관련된 데이터를 가져와야함
// 뭐 그걸 카테고리라고 하면, 그걸 클릭클릭해서 해당 데이터를 가져오는거, 그건 데이터 목록이니까 공용이고 어차피
// 로직은 같음. 데이터만 다른거
// 아 근데 경로는
// 걍 쿼리로 해결하면 되겠다 이거, 들어왔을 때
