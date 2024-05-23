"use client";
import { getBoardDetail } from "@/app/_util/getBoardDetail";
import { Post } from "@/model/Post";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styles from "./board.module.css";
import Link from "next/link";
type Props = {
  searchParams: {
    jobId: string;
  };
};

export default function AdminBoard({ searchParams }: Props) {
  console.log(searchParams.jobId);
  const { data: postData, isPending } = useQuery<
    Post[],
    Object,
    Post[],
    [_1: string, _2: string] // 쿼리키에 관한 타입 정의 필요/
  >({
    queryKey: ["board", searchParams.jobId],
    queryFn: getBoardDetail,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  console.log("data", postData);
  return (
    <div className={styles.boardContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.header}>제목</th>
            <th className={styles.header}>조회수</th>
          </tr>
        </thead>
        <tbody>
          {postData?.map(({ title, viewCount }, index) => (
            <tr key={index}>
              <td className={styles.cell}>{title}</td>
              <td className={styles.cell}>{viewCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        className={styles.postButton}
        href={`/admin/board/post?jobId=${searchParams.jobId}`}
      >
        글 작성
      </Link>
    </div>
  );
}
// 이제 여기서 갈리는데 jobId 를 쿼리 스트링으로 넘겨주기 때문에 그 id를 가지고 get 요청을 해야됨.

// 이 부분에서 쿼리를 받아서 보여줘야함
// 그러면 이제
// 사람이 아예 검색해서 해당 페이지로 올 때는 어떻게 해야하는지를
// 상세 페이지는 클릭해서
// 존재하는 페이지, 개발자,
// board/list?jobCode="programming"
