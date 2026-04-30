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

export const metadata: Metadata = {
  title: {
    default: "Resumeverse3D — Build. Impress. Get Hired.",
    template: "%s | Resumeverse3D",
  },

  description:
    "Create stunning resumes and cover letters with a next-gen 3D interactive experience. Designed to help you stand out and get hired faster.",

  keywords: [
    "resume builder",
    "cover letter generator",
    "3D resume",
    "ATS resume",
    "portfolio builder",
    "job application tools",
  ],

  authors: [{ name: "Om Debasish" }],
  creator: "Om Debasish",

  metadataBase: new URL("https://www.resumeverse3d.me"),

  themeColor: "#000000",

  openGraph: {
    title: "Resumeverse3D — 3D Resume Studio",
    description:
      "Build stunning resumes & cover letters in a futuristic 3D environment. Impress recruiters instantly.",
    url: "https://www.resumeverse3d.me",
    siteName: "Resumeverse3D",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Resumeverse3D - 3D Resume Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Resumeverse3D — Build. Impress. Get Hired.",
    description:
      "Create stunning resumes and cover letters with a futuristic 3D experience.",
    images: ["/og.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
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