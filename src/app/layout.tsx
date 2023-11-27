"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
// import { useState } from "react";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// Batasi  Navbar
const disabledNavbar = ["/login", "/register"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [tambah, setTambah] = useState(0);
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Disabled Navbar */}
        {!disabledNavbar.includes(pathname) && <Navbar />}
        {/* <div className="flex items-center justify-center"> */}
        {/* <button
            className="bg-blue-500 p-2 rounded-lg text-white"
            onClick={() => setTambah(tambah + 1)}
          > */}
        {/* Layout (Tidak Berubah Walau Pindah Page)
          </button> */}
        {/* <h1>{tambah}</h1> */}
        {/* </div> */}
        {children}
      </body>
    </html>
  );
}
