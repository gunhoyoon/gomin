"use client";
import TextEditor from "@/app/_component/_utill/Editor";
import React from "react";
import styles from "./post.module.css";
import useEditor from "@/hooks/useEditor";
type Props = {
  searchParams: {
    jobId: string;
  };
};

export default function Post({ searchParams }: Props) {
  console.log("searchParams.jobId", searchParams.jobId);
  const { content, handleContentChange, getTextContent } = useEditor();
  console.log("content", getTextContent(content));
  // 넘겨오는 jobId로 POST 요청
  // 에디터가 나와야함
  const handleSubmit = async () => {
    const textContent = getTextContent(content);
    // 서버로 데이터 전송
    const response = await fetch("/api/saveContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jobId: searchParams.jobId, content: textContent }),
    });

    if (response.ok) {
      // 성공 처리
      console.log("Content saved successfully");
    } else {
      // 에러 처리
      console.error("Error saving content");
    }
  };
  return (
    <div>
      <div className={styles.editorContainer}>
        {searchParams.jobId}
        <TextEditor
          content={content}
          handleContentChange={handleContentChange}
        />
      </div>
      <button onClick={handleSubmit}>등록하기</button>
    </div>
  );
}
