import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import clsx from "clsx";


export const metadata: Metadata = {
  title: "ADS E-commerce",
  description: "Um projeto de e-commerce para WEB III",
};

import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={clsx("bg-slate-700")}>
        <Navbar></Navbar>
        <main className="bg-slate-700 h-screen p-16">{children}</main>
      </body>
    </html>
  );
}
