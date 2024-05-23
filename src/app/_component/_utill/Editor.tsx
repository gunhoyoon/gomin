"use client";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type TextEditorProps = {
  content: string;
  handleContentChange: (content: string) => void;
};

const TextEditor: React.FC<TextEditorProps> = ({
  content,
  handleContentChange,
}) => {
  return (
    <ReactQuill
      theme="snow"
      value={content}
      onChange={handleContentChange}
      style={{ height: 300 }}
    />
  );
};

export default TextEditor;
