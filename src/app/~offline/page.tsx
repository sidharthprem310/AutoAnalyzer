import Image from "next/image";
import { WifiOff } from "lucide-react";

export const metadata = {
  title: "Offline | AutoAnalyzer",
};

export default function OfflineFallback() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="z-10 flex flex-col items-center max-w-2xl bg-[var(--card)]/50 p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 mb-6 drop-shadow-2xl">
          <img
            src="/car_offline.png"
            alt="Stranded SUV - No Internet Connection"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 text-red-500 mb-6">
          <WifiOff className="w-8 h-8" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
          Connection Lost!
        </h1>

        <p className="text-[var(--muted-foreground)] text-lg mb-2 max-w-md">
          Your navigation system is offline. We need an internet connection to process your bills and fetch data.
        </p>
        
        <p className="text-primary font-medium animate-pulse mt-4">
          Please check your internet connection and refresh the page.
        </p>
      </div>
    </div>
  );
}
