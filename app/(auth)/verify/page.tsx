"use client";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

const VerifyPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleRequestLink = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/verify");
      setLoading(false);
      if (response.status == 200) {
        const detail = await response.json();
        toast({ title: "Success!", description: detail.detail });
        setSent(true);
      }
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Error ocuured when requesting verification email",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      {sent
        ? "Din't receive verification email."
        : "To complete your account setup, please verify your email."}
      <span
        className="underline text-muted-foreground hover:cursor-pointer"
        onClick={handleRequestLink}
      >
        {sent ? "Resend" : "Verify"}
      </span>
      {loading && (
        <div className="flex justify-center">
          <PuffLoader
            // color={color}
            loading={loading}
            // cssOverride={override}
            className="w-100 h-100"
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
