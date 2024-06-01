"use client";
import React, { FC } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface Props {
  markdownContent: string;
}

const MarkdownRenderer: FC<Props> = async ({ markdownContent }) => {
  const mdxSource = await serialize(markdownContent);
  return <MDXRemote {...mdxSource} />;
};

export default MarkdownRenderer;
