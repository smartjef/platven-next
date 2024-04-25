import { SessionContext } from "@/context";
import { useContext } from "react";

const useSessionContext = () => {
  const session = useContext(SessionContext);
  const signOut = async () => {
    await fetch("/api/auth/logout");
  };
  return { ...session, signOut };
};

export default useSessionContext;
