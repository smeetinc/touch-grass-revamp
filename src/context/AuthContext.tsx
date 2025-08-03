"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAccount } from "wagmi";
import { useSignInEmail, useListAccounts } from "@0xsequence/connect";

interface AuthContextType {
  walletAddress: string | null;
  email: string | null;
  accountId: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  refetchAccounts: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useAccount();

  const {
    data: accountData,
    isLoading: isAuthLoading,
    refetch: refetchAccounts,
  } = useListAccounts();

  const email = accountData?.accounts[0]?.email;

  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    if (walletAddress && email) {
      fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ walletAddress, email }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("User profile:", data.user);
        })
        .catch((err) => console.error("User profile creation failed", err));
    }
  }, [walletAddress, email]);

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    } else {
      setWalletAddress(null);
    }
  }, [address]);

  useEffect(() => {
    if (
      accountData?.currentAccountId &&
      accountData?.accounts[0]?.email !== ""
    ) {
      setAccountId(accountData.currentAccountId);
    } else {
      setAccountId(null);
    }
  }, [accountData]);

  const value: AuthContextType = {
    walletAddress,
    email: email ?? null,
    accountId,
    isAuthenticated: !!(
      walletAddress && accountData?.accounts[0]?.email !== ""
    ),
    isAuthLoading,
    refetchAccounts,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
