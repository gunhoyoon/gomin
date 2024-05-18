"use client";
import React from "react";

type Props = {
  searchParams: {
    jobId: string;
  };
};

export default function AdminBoard({ searchParams }: Props) {
  console.log(searchParams);

  return (
    <div>
      AdminBoard / 아마 사용은 안할듯
      {/* {jobId} */}
    </div>
  );
}

// 이 부분에서 쿼리를 받아서 보여줘야함
// 그러면 이제
// 사람이 아예 검색해서 해당 페이지로 올 때는 어떻게 해야하는지를
// 상세 페이지는 클릭해서
// 존재하는 페이지, 개발자,
// board/list?jobCode="programming"
