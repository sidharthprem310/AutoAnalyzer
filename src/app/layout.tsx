import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Service Bill Analyzer | AI Powered Vehicle Insights",
  description: "Understand your vehicle service bills easily with AI-powered insights, simplified explanations, and cost analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="bg-gradient-radial">{children}</body>
    </html>
  );
}
