"use client";

import { useWallet } from "@/context/WalletProvider";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isConnected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push("/login");
    }
  }, [isConnected, router]);

  if (!isConnected) {
    // You can return a loading spinner or null here
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
