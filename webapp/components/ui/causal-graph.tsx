"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Info, ChevronDown, ChevronUp, Network } from "lucide-react";
import { cn } from "@/lib/utils";

interface CausalElement {
    cause: string;
    effect: string;
    confidence: number;
}

interface CausalGraphProps {
    elements: CausalElement[];
}

export function CausalGraph({ elements }: CausalGraphProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (!elements || elements.length === 0) return null;

    return (
        <div className="w-full py-6 px-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between mb-8 group hover:bg-white/5 p-4 rounded-xl transition-all duration-300 border border-transparent hover:border-white/5"
            >
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                        isOpen ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-800 text-zinc-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-500"
                    )}>
                        <Network size={16} />
                    </div>
                    <div className="text-left space-y-0.5">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors">
                            Flux de Causalité Cognitive
                        </h4>
                        <p className="text-[10px] text-zinc-500 font-medium">
                            {isOpen ? "Masquer la visualisation" : "Afficher la visualisation causale"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-zinc-900/50 border border-white/5 rounded-full text-[10px] font-mono text-zinc-500">
                        {elements.length} Nœuds
                    </div>
                    {isOpen ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-1 gap-12 max-w-3xl mx-auto relative pb-12">
                            {/* Background decorative line */}
                            <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent hidden md:block" />

                            {elements.map((el, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative flex flex-col md:flex-row items-center justify-between gap-6 group"
                                >
                                    {/* Cause Side */}
                                    <div className="flex-1 w-full md:w-auto">
                                        <div className="glass p-5 rounded-2xl relative overflow-hidden group-hover:border-zinc-700 transition-all duration-300">
                                            <div className="absolute top-0 right-0 p-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                                            </div>
                                            <span className="text-[10px] font-bold text-zinc-600 uppercase mb-2 block tracking-tight">Condition Initiale</span>
                                            <p className="text-sm font-semibold text-zinc-200 leading-snug">{el.cause}</p>
                                        </div>
                                    </div>

                                    {/* Central Connector */}
                                    <div className="flex flex-col items-center justify-center gap-2 min-w-[120px]">
                                        <div className="relative h-1 w-24 bg-zinc-900 rounded-full border border-white/5 overflow-hidden">
                                            <motion.div
                                                animate={{ left: ["-100%", "100%"] }}
                                                transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: idx * 0.5 }}
                                                className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                            />
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="text-[9px] font-black font-mono text-emerald-500 bg-emerald-500/10 px-1.5 rounded-sm">
                                                {Math.round(el.confidence * 100)}%
                                            </span>
                                            <p className="text-[8px] uppercase tracking-tighter text-zinc-600 mt-1 font-bold italic">Probabilité Logique</p>
                                        </div>
                                    </div>

                                    {/* Effect Side */}
                                    <div className="flex-1 w-full md:w-auto">
                                        <div className="glass p-5 rounded-2xl relative overflow-hidden group-hover:border-emerald-500/30 group-hover:glow-emerald transition-all duration-500">
                                            <div className="absolute top-0 left-0 p-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                                            </div>
                                            <span className="text-[10px] font-bold text-emerald-500/70 uppercase mb-2 block tracking-tight">Réaction Anticipée</span>
                                            <p className="text-sm font-semibold text-zinc-200 leading-snug">{el.effect}</p>
                                        </div>
                                    </div>

                                    {/* Decorative background number */}
                                    <div className="absolute -left-8 text-[40px] font-black text-white/5 select-none pointer-events-none hidden lg:block">
                                        0{idx + 1}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-4 glass p-4 rounded-xl flex items-start gap-3 bg-emerald-500/[0.02]">
                            <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                                <Info size={14} className="text-emerald-500" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-wide">Note Cognitive</p>
                                <p className="text-[10px] text-zinc-500 leading-relaxed max-w-2xl">
                                    Le graphe ci-dessus modélise les ondes de choc prévisionnelles de votre décision. Les lignes de flux animées représentent la vélocité causale identifiée par l'Orchestrateur via l'Agent Causal.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
