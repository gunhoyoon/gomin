"use client";
import { Job } from "@/model/Job";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ChangeEventHandler, useState } from "react";
import styles from "./addJobs.module.css";
export default function AddJobs() {
  const [jobData, setJobData] = useState<Job>({ name: "", type: "" });
  const handleData: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const queryClient = useQueryClient();
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
      setJobData({ name: "", type: "" });
      alert("직업을 추가하였습니다.");
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
  return (
    <div className={styles.formContainer}>
      <form onSubmit={onAddJobs}>
        <label htmlFor="jobName" className={styles.label}>
          직업 이름
        </label>
        <input
          id="jobName"
          type="text"
          name="name"
          value={jobData.name}
          onChange={handleData}
          className={styles.input}
        />
        <label htmlFor="jobType" className={styles.label}>
          직업 타입
        </label>
        <input
          id="jobType"
          type="text"
          name="type"
          value={jobData.type}
          onChange={handleData}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          추가하기
        </button>
      </form>
    </div>
  );
}
