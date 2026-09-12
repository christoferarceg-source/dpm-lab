"use client";

import CodeMirror from "@uiw/react-codemirror";
import { sql, SQLite } from "@codemirror/lang-sql";
import { python } from "@codemirror/lang-python";
import { useMemo } from "react";

export function CodeEditor({
  value,
  onChange,
  language,
  minHeight = "180px",
}: {
  value: string;
  onChange: (v: string) => void;
  language: "sql" | "python";
  minHeight?: string;
}) {
  const extensions = useMemo(
    () => [language === "sql" ? sql({ dialect: SQLite }) : python()],
    [language]
  );
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={extensions}
      minHeight={minHeight}
      basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: true }}
      theme="none"
    />
  );
}
