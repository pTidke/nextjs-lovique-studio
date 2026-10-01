"use client";

import { motion, AnimatePresence } from "framer-motion";
import { playfair, poppins } from "@/lib/fonts";
import { X } from "lucide-react";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export default function LegalModal({
  isOpen,
  onClose,
  title,
  content,
}: LegalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-pink-100/50 overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-pink-50 flex items-center justify-between bg-[#fffafa]">
              <h2
                className={`${playfair.className} italic text-2xl text-[#2a1b1b]`}
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-pink-50 rounded-full transition-colors text-gray-400 hover:text-[#ee2b8c]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div
                className={`${poppins.className} text-sm text-gray-500 leading-relaxed space-y-6 font-light`}
              >
                {content}
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-gray-50/50 flex justify-end">
              <button
                onClick={onClose}
                className={`${poppins.className} text-[10px] font-bold tracking-[0.2em] uppercase text-[#ee2b8c] hover:text-[#d41b76] transition-colors`}
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
