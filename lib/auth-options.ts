import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRETE ?? "",
    }),

    CredentialProvider({
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "*********",
        },
      },
      async authorize(credentials, req) {
        console.log(
          "************************************",
          credentials,
          "************************************",
        );

        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials!.email,
            },
          });

          if (!user || !user?.password) {
            throw new Error("Invalid credentials");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials!.password,
            user.password,
          );

          if (!isCorrectPassword) {
            throw new Error("Invalid credentials");
          }
          return { ...user, password: null };
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,

        auth: {
          user: process.env.EMAIL_HOST_USER,
          pass: process.env.EMAIL_HOST_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    // signIn: "sign-in", //sigin page
  },

  adapter: PrismaAdapter(prisma) as any,
};
