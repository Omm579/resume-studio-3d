import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "ResumeVerse 3D | Build ATS-Optimized Resume in Seconds",
  description:
    "Build ATS-optimized resumes in seconds. Get real-time ATS score, AI suggestions, and export instantly.",
  keywords: [
    "ATS resume builder",
    "AI resume builder",
    "resume builder free",
    "ATS score checker",
    "resume maker online"
  ],
  authors: [{ name: "Om Debasish" }],
  creator: "Om Debasish",
  metadataBase: new URL("https://www.resumeverse3d.me"),
  themeColor: "#000000",
  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "ResumeVerse 3D | Build ATS-Optimized Resumes",
    description:
      "Create ATS-friendly resumes with real-time scoring, AI suggestions, and instant export.",
    siteName: "ResumeVerse 3D",
    images: [
      {
        url: "https://resumeverse3d.me/og-image.png", // 👈 yeh important
        width: 1200,
        height: 630,
        alt: "ResumeVerse 3D Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ATS-Optimized Resume Builder",
    description:
      "Create resumes that pass ATS filters. Get 90+ score instantly.",
    images: ["https://resumeverse3d.me/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-cyan-400/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}