"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerdictCardProps {
    title: string;
    subtitle?: string;
    detail?: string;
    type: "flaw" | "path";
    delay: number;
    score?: number;
    validIf?: string;
    failsIf?: string;
}

export function VerdictCard({
    title,
    subtitle,
    detail,
    type,
    delay,
    score,
    validIf,
    failsIf
}: VerdictCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className={cn(
                "group relative overflow-hidden transition-all duration-300 rounded-2xl border",
                type === "flaw"
                    ? "bg-rose-500/[0.03] border-rose-500/10 hover:border-rose-500/30 shadow-[0_4px_20px_rgba(244,63,94,0.05)]"
                    : "bg-zinc-900/40 border-zinc-800 hover:border-emerald-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            )}
        >
            <div className="p-5">
                <div className="flex flex-col w-full justify-between items-start gap-4">
                    <div className="flex-1 space-y-1 w-full">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className={cn(
                                "font-bold text-sm leading-tight tracking-tight",
                                type === "flaw" ? "text-rose-200" : "text-zinc-100"
                            )}>{title}</h4>
                            {type === "flaw" && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />}
                        </div>
                        {subtitle && <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">{subtitle}</p>}

                        {type === "path" && (
                            <div className="pt-3 space-y-2">
                                <div className="flex items-start gap-2">
                                    <div className="mt-1 w-1 h-1 rounded-full bg-emerald-500" />
                                    <p className="text-[9px] text-zinc-500 leading-tight uppercase font-bold"><span className="text-emerald-500/80">VALIDE SI:</span> {validIf}</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="mt-1 w-1 h-1 rounded-full bg-rose-500" />
                                    <p className="text-[9px] text-zinc-500 leading-tight uppercase font-bold"><span className="text-rose-500/80">ÉCHOUE SI:</span> {failsIf}</p>
                                </div>

                                <div className="pt-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[8px] uppercase font-bold text-zinc-600 tracking-wider">Coefficient de Résilience</span>
                                        <span className="text-[10px] font-mono font-bold text-emerald-500">{score}%</span>
                                    </div>
                                    <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${score}%` }}
                                            transition={{ delay: delay + 0.5, duration: 1.5, ease: "easeOut" }}
                                            className="bg-emerald-500 h-full rounded-full shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end w-full">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={cn(
                                "group/btn flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 border",
                                isExpanded
                                    ? "bg-emerald-500 text-zinc-950 border-emerald-400"
                                    : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900"
                            )}
                        >
                            <span className="text-[8px] font-black uppercase tracking-widest">{isExpanded ? "Réduire" : "Expliquer"}</span>
                            <MessageSquareText size={12} className={cn("transition-transform duration-300", isExpanded && "rotate-12")} />
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="mt-5 pt-5 border-t border-white/5 space-y-3 relative">
                                <div className="absolute top-0 left-0 w-8 h-[1px] bg-emerald-500" />
                                <div className="flex items-center gap-2">
                                    <div className="p-1 bg-emerald-500/10 rounded">
                                        <Info size={10} className="text-emerald-500" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500/80">Analyse de Profondeur</span>
                                </div>
                                <p className="text-xs text-zinc-300 leading-relaxed font-medium bg-zinc-950/30 p-3 rounded-xl border border-white/[0.02]">
                                    {detail || "L'algorithme de synthèse n'a pas généré d'explications supplémentaires pour ce segment de données."}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
