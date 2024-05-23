"use client";
import { useState } from "react";

const useEditor = (initialContent: string = "") => {
  const [content, setContent] = useState(initialContent);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };
  const getTextContent = (htmlContent: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = htmlContent;
    return tmp.textContent || tmp.innerText || "";
  };

  return {
    content,
    handleContentChange,
    getTextContent,
  };
};

export default useEditor;
