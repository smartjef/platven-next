"use client";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { FC } from "react";

interface Props {
  serializedContent: MDXRemoteSerializeResult;
  property?: any
}

const MarkdownRenderer: FC<Props> = ({ serializedContent, property }) => {
  console.log(property);
  return <MDXRemote {...serializedContent} />;
};

export default MarkdownRenderer;
