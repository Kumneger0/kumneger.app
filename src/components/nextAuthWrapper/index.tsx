"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-wrap-balancer";

function NextAuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}

export default NextAuthWrapper;
