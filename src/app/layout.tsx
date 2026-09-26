import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Text Vault — Leave words that can outlast today",
    template: "%s · Text Vault",
  },
  description:
    "Write a private digital message for someone you love and preserve it for the future. Designed for long-term, decentralized preservation.",
  icons: {
    icon: "/logo-selected.svg",
  },
  openGraph: {
    title: "Text Vault — Leave words that can outlast today",
    description:
      "Write a private digital message for someone you love and preserve it for the future.",
    type: "website",
  },
};

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
        {children}
      </body>
    </html>
  );
}
