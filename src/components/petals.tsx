"use client";
import { useEffect, useState } from "react";

type Petal = {
  id: number;
  left: number;
  top: number;
  delay: number;
  size: number;
  duration: number;
  color: string;
};

export default function Petals({ count = 60 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const colors = [
      "from-rose-300 to-rose-100", // pink
      "from-yellow-300 to-yellow-100", // yellow
      "from-blue-300 to-blue-100", // soft blue
      "from-red-300 to-red-100", // red
      "from-gray-700 to-gray-500", // blackish (muted)
    ];

    const generated: Petal[] = Array.from({ length: count }, (_, i) => {
      const r = Math.random();
      const topBias = Math.pow(r, 2.5) * 120 - 20;
      return {
        id: i,
        left: Math.random() * 100,
        top: topBias,
        delay: Math.random() * 10,
        size: 10 + Math.random() * 16,
        duration: 14 + Math.random() * 18,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    // Schedule state update after render to avoid cascading render warning
    Promise.resolve().then(() => setPetals(generated));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      {petals.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full bg-gradient-to-br ${p.color}`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.8}px`,
            opacity: 0,
            animation: `float ${p.duration}s linear ${p.delay}s infinite`,
            animationDelay: `${p.delay}s`,
            animationFillMode: "forwards",
            filter: "blur(0.6px)",
            borderRadius: "60% 40% 60% 40% / 60% 60% 40% 40%",
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) rotate(90deg);
            opacity: 0.7;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(100vh) rotate(180deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
