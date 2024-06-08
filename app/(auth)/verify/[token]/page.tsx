import prisma from "@/prisma/client";
import { PropsWithPathParams } from "@/types";
import { notFound } from "next/navigation";
import React, { FC } from "react";

const VerifyAccount: FC<PropsWithPathParams> = async ({
  params: { token },
}) => {
  const verification = await prisma.oTPVerificatiion.findUnique({
    where: {
      id: token,
      expiry: { gte: new Date(Date.now()) },
      verified: false,
    },
  });
  if (!verification) return notFound();
  return <div>VerifyAccount</div>;
};

export default VerifyAccount;
