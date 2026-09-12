import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { resolveWikiLinks } from "@/lib/kb";

export function Markdown({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`prose-dpm ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{resolveWikiLinks(children)}</ReactMarkdown>
    </div>
  );
}
