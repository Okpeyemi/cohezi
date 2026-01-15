"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
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
    if (!elements || elements.length === 0) return null;

    return (
        <div className="w-full py-12 px-6">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                        Flux de Causalité Cognitive
                    </h4>
                </div>
                <div className="px-3 py-1 bg-zinc-900/50 border border-white/5 rounded-full text-[10px] font-mono text-zinc-500">
                    {elements.length} Nœuds Identifiés
                </div>
            </div>

            <div className="grid grid-cols-1 gap-12 max-w-3xl mx-auto relative">
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

            <div className="mt-16 glass p-4 rounded-xl flex items-start gap-3 bg-emerald-500/[0.02]">
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
        </div>
    );
}
