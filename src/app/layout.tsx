import './globals.css'
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from '@/components/footer/footer';
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portifolio | Kumneger Wondimu",
  description: "Full Stack Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const url = headers().get("x-invoke-path");
  return (
    <html lang="en">
      <body className={inter.className}>
        {url?.trim() == "/" ? <Header /> : null}
        {children}
        <Footer />
      </body>
    </html>
  );
}
