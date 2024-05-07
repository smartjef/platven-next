import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/forms/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Platven credentials sign in screen",
};

export default function AuthenticationPage() {
  return (
    <div>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Log in to your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to sign in
        </p>
      </div>
      <LoginForm />
      <div className="flex pt-4 space-x-2 ">
        <p>{`Don't have an account?`}</p>
        <Link href="/sign-up" className="underline opacity-50">
          Sign up
        </Link>
      </div>
    </div>
  );
}
