"use client";
import React, { MouseEvent, MouseEventHandler } from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "./DeleteIcon";
import { Job } from "@/model/Job";
import styles from "./jobList.module.css";
import { useRouter } from "next/navigation";

type Props = {
  JobsData: Job[] | undefined;
};

export default function JobsList({ JobsData }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const sortedJobs = JobsData
    ? [...JobsData].sort((a, b) => a.name.localeCompare(b.name, "ko"))
    : [];

  const deleteJob = async (id: string) => {
    await fetch(`/api/jobs?id=${id}`, {
      method: "DELETE",
    });
  };

  const { mutate } = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      alert("삭제성공");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      // Optionally, trigger a refetch or update local state to reflect the change
    },
    onError: (error: Error) => {
      console.error("Failed to delete job", error);
    },
  });

  const handleDetail = (type: string) => {
    router.push(`/admin/board?jobId=${type}`);
  };

  const onDelete = (id: string) => (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 버블링 중단
    mutate(id);
  };

  return (
    <ul className={styles.list}>
      {sortedJobs.map(({ id, type, name }) => (
        <li
          onClick={() => {
            handleDetail(type as string);
          }}
          key={id}
          className={styles.item}
        >
          <p className={styles.link}>{name}</p>
          <button
            onClick={onDelete(id as string)}
            className={styles.deleteButton}
          >
            <DeleteIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}
