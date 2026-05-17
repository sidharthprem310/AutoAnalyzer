"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff } from "lucide-react";

export default function OfflineWarning() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsOffline(!navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 text-center bg-[var(--background)]/80"
        >
          {/* Subtle Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="z-10 flex flex-col items-center max-w-2xl bg-[var(--card)]/50 p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 mb-6 drop-shadow-2xl">
              <Image
                src="/car_offline.png"
                alt="Stranded SUV - No Internet Connection"
                fill
                className="object-contain"
                priority
              />
            </div>

            <motion.div 
              animate={{ 
                rotate: [-5, 5, -5],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 text-red-500 mb-6"
            >
              <WifiOff className="w-8 h-8" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
              Connection Lost!
            </h1>

            <p className="text-[var(--muted-foreground)] text-lg mb-2 max-w-md">
              Your navigation system is offline. We need an internet connection to process your bills and fetch data.
            </p>
            
            <p className="text-primary font-medium animate-pulse mt-4">
              Waiting for connection to resume...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
