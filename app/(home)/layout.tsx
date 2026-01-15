import React from "react";
import HeaderShell from "components/layout/HeaderShell";
import FooterShell from "components/layout/FooterShell";
import { Header, Footer } from "@/components/variants/modern";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderShell />

      {/* <Header /> */}
      <main
        className="flex-grow"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {children}
      </main>
      {/* <Footer /> */}
      <FooterShell />
    </>
  );
}
