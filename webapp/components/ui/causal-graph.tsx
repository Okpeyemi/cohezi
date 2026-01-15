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
        <div className="w-full py-8 space-y-6">
            <div className="flex items-center gap-2 px-6">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Chaines de Causalité Identifiées
                </h4>
            </div>

            <div className="flex flex-col gap-8 px-6">
                {elements.map((el, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.15 }}
                        className="flex flex-col md:flex-row items-center gap-4 group"
                    >
                        {/* Cause Node */}
                        <div className="flex-1 bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl group-hover:border-zinc-700 transition-colors">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Cause</span>
                            <p className="text-sm font-medium text-zinc-200">{el.cause}</p>
                        </div>

                        {/* Connection */}
                        <div className="flex flex-col items-center justify-center gap-1">
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <ArrowRight className="text-zinc-600" size={20} />
                            </motion.div>
                            <div className="flex items-center gap-1">
                                <div className="h-1 w-12 bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${el.confidence * 100}%` }}
                                        className="h-full bg-emerald-500/50"
                                    />
                                </div>
                                <span className="text-[9px] font-mono text-zinc-600">{Math.round(el.confidence * 100)}%</span>
                            </div>
                        </div>

                        {/* Effect Node */}
                        <div className="flex-1 bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl group-hover:border-emerald-500/20 transition-colors">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Effet</span>
                            <p className="text-sm font-medium text-zinc-200">{el.effect}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="px-6 py-4 bg-zinc-900/30 border-t border-zinc-800/50 flex items-start gap-2">
                <Info size={14} className="text-zinc-500 mt-0.5" />
                <p className="text-[10px] text-zinc-500 leading-relaxed italic">
                    Cette visualisation montre comment les agents anticipent la propagation de votre décision. Les barres indiquent l'indice de confiance du modèle sur le lien de causalité.
                </p>
            </div>
        </div>
    );
}
