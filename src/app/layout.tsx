import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import OfflineWarning from "@/components/OfflineWarning";
import "./globals.css";



const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auto Bill Analyzer | AutoAnalyzer AI",
  description: "Understand your vehicle service bills instantly. AutoAnalyzer is the ultimate AI-powered auto bill analyzer to translate confusing mechanic receipts into plain English.",
  keywords: ["auto bill analyzer", "auto analyzer", "autoanalyzer", "autobillanalyzer", "car service bill checker", "mechanic receipt reader", "vehicle repair cost estimator"],
  manifest: "/manifest.json",
  themeColor: "#09090b",
  openGraph: {
    title: "AutoAnalyzer | Your Personal Auto Bill Analyzer",
    description: "Don't get overcharged by your mechanic. Use our AI auto bill analyzer to instantly understand your vehicle service receipts.",
    url: "https://autobillanalyzer.netlify.app",
    siteName: "AutoAnalyzer",
    locale: "en_US",
    type: "website",
  },
  verification: {
    google: 'xp2FvRIj_pHwvnJ18dX5OVPKqtpp_QVBGoTGNZ82Oi8',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AutoAnalyzer',
    url: 'https://autobillanalyzer.netlify.app',
    description: 'AI-powered auto bill analyzer that translates complex mechanic receipts into plain English.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} bg-gradient-radial`}>
        <ThemeProvider>
          <OfflineWarning />
          <Navbar />
          <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
