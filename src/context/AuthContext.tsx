"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAccount } from "wagmi";
import { useListAccounts, useSignInEmail } from "@0xsequence/connect";

interface AuthContextType {
  walletAddress: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useAccount();
  const email = useSignInEmail();
  const { data } = useListAccounts();

  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    } else {
      setWalletAddress(null);
    }
  }, [address]);

  const value: AuthContextType = {
    walletAddress,
    email: email || null,
    isAuthenticated: !!address && !!email,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
