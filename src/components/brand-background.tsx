"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BrandBackground() {
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
    const initialPetals = [...Array(12)].map(() => ({
      x: Math.random() * 1000 - 500,
      sway1: Math.random() * 100 - 50,
      sway2: Math.random() * -100 + 50,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 20,
      size: Math.random() * 6 + 4,
    }));
    requestAnimationFrame(() => {
      setPetals(initialPetals);
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 🌸 Animated Blobs Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#ee2b8c]/15 blur-[80px] mix-blend-multiply"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-200/20 blur-[90px] mix-blend-multiply"
        />
      </div>

      {/* 🌫️ Noise Texture Overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 🍃 Floating Petals Layer */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        {petals.map((petal, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: petal.x, opacity: 0 }}
            animate={{
              y: ["0%", "100vh"],
              x: [0, petal.sway1, petal.sway2],
              opacity: [0, 0.5, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            }}
            className="absolute top-0 left-1/2 w-3 h-3 bg-pink-300/30 rounded-full blur-[1px]"
            style={{ width: `${petal.size}px`, height: `${petal.size}px` }}
          />
        ))}
      </div>
    </div>
  );
}
