"use client";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { FC } from "react";

interface Props {
  serializedContent: MDXRemoteSerializeResult;
}

const MarkdownRenderer: FC<Props> = ({ serializedContent }) => {
  return <MDXRemote {...serializedContent} />;
};

export default MarkdownRenderer;
