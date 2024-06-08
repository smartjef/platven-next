import Link from "next/link";
import React from "react";

const VerifyPage = () => {
  return (
    <div>
      Your account is not verified yet.Check your email for verification
      link.Dint receive verification email?{" "}
      <span className="underline text-muted-foreground">
        <Link href={"/api/auth/verify"}>Resend</Link>
      </span>
    </div>
  );
};

export default VerifyPage;
