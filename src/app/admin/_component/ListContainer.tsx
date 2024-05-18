"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Job } from "@/model/Job";
import { fetchJobs } from "@/app/_util/jobsData";
import AddJobs from "./AddJobs";
import JobsList from "./JobsList";

export default function ListContainer() {
  const { data: JobsData } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    staleTime: 60000, // 60 seconds
    gcTime: 300000, // 5 minutes
  });

  return (
    <div>
      <AddJobs />
      <JobsList JobsData={JobsData} />
    </div>
  );
}
// 컨테이너 부분에서 데이터를 다 가지고 있는건 맞지만 이건 그냥 장소만 제공을 한다. 일까지 하게 하고 싶진 않음 클라이언트로 하는건

// 글 리스트가 나오고 결국 컨테이너에서 관련 데이터를 다 들고 있어야됨
// 아 근데 그 전에 직업에 관련된 데이터를 가져와야함
// 뭐 그걸 카테고리라고 하면, 그걸 클릭클릭해서 해당 데이터를 가져오는거, 그건 데이터 목록이니까 공용이고 어차피
// 로직은 같음. 데이터만 다른거
// 아 근데 경로는
// 걍 쿼리로 해결하면 되겠다 이거, 들어왔을 때
