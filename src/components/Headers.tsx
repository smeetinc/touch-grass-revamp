"use client";
import { useState, useEffect } from "react";
import { sequence } from "../app/config";
import { useRouter } from "next/navigation";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

function Login() {
  const [signingIn, setSigningIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (await sequence.isSignedIn()) {
        router.push("/");
      }
    })();
  }, []);

  const handleGoogleLogin = async (tokenResponse: CredentialResponse) => {
    const walletAddress = await sequence.signIn(
      {
        idToken: tokenResponse.credential!,
      },
      "MacBook Pro - Chrome"
    );

    console.log(`Wallet address: ${walletAddress}`);
    router.push("/");
  };

  return (
    <>
      <GoogleLogin onSuccess={handleGoogleLogin} shape="circle" width={230} />
    </>
  );
}

export default Login;
