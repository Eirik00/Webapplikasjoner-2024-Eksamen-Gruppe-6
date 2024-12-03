"use client";
import localFont from "next/font/local";
import React, { useState } from "react";
import "../styles/tailwind/main.css";
import Header from "@/components/Header";
import { AdminProvider } from "@/contexts/AdminContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AdminProvider>
          <Header />
          {children}
        </AdminProvider>
      </body>
    </html>
  );
}