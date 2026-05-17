"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 flex flex-col items-center max-w-2xl"
      >
        <div className="relative w-80 h-80 sm:w-96 sm:h-96 mb-8 drop-shadow-2xl">
          <Image
            src="/car_404.png"
            alt="Broken Down SUV - 404 Error"
            fill
            className="object-contain"
            priority
          />
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl sm:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
        >
          404
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl font-semibold text-[var(--foreground)] mb-4"
        >
          Dead End!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[var(--muted-foreground)] text-lg mb-8 max-w-md"
        >
          Looks like your navigation system failed. The page you are looking for has broken down or doesn't exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-primary rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)]"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="relative">Tow Back Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
