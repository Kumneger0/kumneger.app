import './globals.css'
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from '@/components/footer/footer';



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portifolio | Kumneger Wondimu",
  description: "Full Stack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
