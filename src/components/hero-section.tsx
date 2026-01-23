"use client";

import { useState, useEffect } from "react";
import { Playfair_Display, Poppins } from "next/font/google";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function HeroSection() {
  const [petals, setPetals] = useState<
    {
      x: number;
      sway1: number;
      sway2: number;
      duration: number;
      delay: number;
      size: number;
    }[]
  >([]);

  useEffect(() => {
    const initialPetals = [...Array(8)].map(() => ({
      x: Math.random() * 1000 - 500,
      sway1: Math.random() * 100 - 50,
      sway2: Math.random() * -100 + 50,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 20,
      size: Math.random() * 6 + 4,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPetals(initialPetals);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* 🌸 Animated Blobs Layer - Enhanced */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Blob 1: Accent Pink (Top Left) */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#ee2b8c]/40 blur-[50px] mix-blend-multiply"
        />

        {/* Blob 2: Soft Purple (Bottom Right) */}
        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute bottom-[-5%] right-[-5%] w-[450px] h-[450px] rounded-full bg-purple-300/40 blur-[60px] mix-blend-multiply"
        />

        {/* Blob 3: Warm Peach (Center Left) */}
        <motion.div
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -70, 40, 0],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-orange-200/40 blur-[50px] mix-blend-multiply"
        />

        {/* Blob 4: Soft Teal (Top Right) - New Contrast */}
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-[5%] right-[10%] w-[300px] h-[300px] rounded-full bg-teal-200/30 blur-[40px] mix-blend-multiply"
        />

        {/* Blob 5: Deep Rose (Bottom Left) - Depth */}
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute bottom-[10%] left-[20%] w-[250px] h-[250px] rounded-full bg-rose-300/30 blur-[45px] mix-blend-multiply"
        />
      </div>

      {/* 🌫️ Noise Texture Overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-2 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 🍃 Floating Petals Layer */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {petals.map((petal, i) => (
          <motion.div
            key={i}
            initial={{
              y: -100,
              x: petal.x,
              opacity: 0,
            }}
            animate={{
              y: ["0%", "100vh"],
              x: [0, petal.sway1, petal.sway2],
              opacity: [0, 0.8, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            }}
            className="absolute top-0 left-1/2 w-3 h-3 bg-pink-300/60 rounded-full blur-[1px]"
            style={{
              width: `${petal.size}px`,
              height: `${petal.size}px`,
            }}
          />
        ))}
      </div>

      {/* 🧊 Frosted Glass Overlay - Light Adjustment */}
      <div className="absolute inset-0 z-[1] sm:bg-white/0 sm:backdrop-blur-[0px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center gap-8">
        {/* Title */}
        <h1
          className={`${playfair.className} italic text-6xl md:text-8xl lg:text-9xl text-[#2a1b1b] tracking-tight drop-shadow-sm`}
        >
          Lovique <span className="text-[#ee2b8c]">Studio</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`${poppins.className} text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-gray-600 max-w-xl leading-loose`}
        >
          Wrapped in grace, sealed with love <br className="hidden sm:block" />
          <span className="italic normal-case tracking-normal text-gray-500 font-serif text-lg ml-1">
            where flowers meet forever
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-8">
          <Link
            href="/catalogue"
            className="bg-[#ee2b8c] text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#d41b76] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore Collection
          </Link>
          <Link
            href="/story"
            className="bg-transparent border border-[#2a1b1b]/20 text-[#2a1b1b] px-8 py-3.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-white/50 transition-all hover:border-black"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2 animate-bounce opacity-60 z-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-medium">
          Discover
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </section>
  );
}
