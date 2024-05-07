import React from "react";
import Image from "next/image";
import aboutRound from "@/public/about-circle.png";
import HeroSection from "@/components/hero-seaction";
import service from "@/public/service.png";
import { services } from "@/constants/data";
import prisma from "@/prisma/client";
import { Mail, PhoneCall } from "lucide-react";
import Link from "next/link";

type Props = {};

const AboutPage = async (props: Props) => {
  const agents = await prisma.team.findMany({ include: { user: true } });

  return <div className="flex flex-col  space-y-10"></div>;
};

export default AboutPage;
