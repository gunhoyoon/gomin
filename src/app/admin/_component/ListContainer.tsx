"use client";
import { fetchJobs } from "@/app/_util/jobsData";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Job } from "@/model/Job";
import Link from "next/link";

export default function ListContainer() {
  const [addJobs, setAddJobs] = useState("");
  const { data: JobsData } = useQuery<Job[], Object, Job[]>({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  // const mutate = useMutation()

  const onAddJobs: ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  const handleData: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAddJobs(e.target.value);
  };
  return (
    <div>
      <form onSubmit={onAddJobs}>
        <label htmlFor="">직업 추가하기</label>
        <input type="text" onChange={handleData} />
      </form>
      <ul>
        {JobsData &&
          JobsData.map(({ id, name }) => (
            <li>
              <Link key={id} href={`/admin/board?id=${id}`}>
                {name}
              </Link>
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
