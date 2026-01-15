"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";
import { AgentReport } from "@/types/analysis";

interface AgentReportCardProps {
    agent: AgentReport;
    index: number;
}

function FindingItem({ finding }: { finding: any }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="p-4 bg-zinc-950/50 rounded-xl border border-white/[0.03] space-y-3 hover:bg-zinc-950 transition-colors group/item">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-zinc-200">{finding.point}</p>
                        <span className={cn(
                            "px-2 py-0.5 rounded text-[8px] uppercase font-black tracking-tighter",
                            finding.severity === "high" ? "bg-rose-500/20 text-rose-400" :
                                finding.severity === "medium" ? "bg-amber-500/20 text-amber-400" :
                                    "bg-emerald-500/20 text-emerald-400"
                        )}>
                            {finding.severity}
                        </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">{finding.explanation}</p>
                </div>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn(
                        "p-2 rounded-lg transition-all duration-300 border flex items-center gap-2",
                        isExpanded
                            ? "bg-zinc-200 text-zinc-900 border-white"
                            : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
                    )}
                >
                    <span className="text-[8px] font-black uppercase tracking-widest hidden group-hover/item:block">
                        {isExpanded ? "Fermer" : "Détails"}
                    </span>
                    <MessageSquareText size={12} className={cn("transition-transform duration-300", isExpanded && "rotate-12")} />
                </button>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-3 mt-3 border-t border-white/5">
                            <p className="text-[11px] text-zinc-300 italic leading-relaxed bg-zinc-900/50 p-3 rounded-lg border border-white/[0.02]">
                                {finding.detailed_explanation || "Analyse approfondie en cours de génération..."}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function AgentReportCard({ agent, index }: AgentReportCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (index * 0.1) }}
            className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all group relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-6xl font-black uppercase italic">{index + 1}</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-zinc-950 rounded-xl border border-white/5">
                    <Info size={18} className="text-zinc-400" />
                </div>
                <div>
                    <h3 className="text-lg font-bold tracking-tight text-white capitalize">
                        Agent {agent.agent_name}
                    </h3>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Analyse de Segment</p>
                </div>
            </div>

            <div className="space-y-4 relative z-10 font-bold">
                {agent.findings && agent.findings.length > 0 ? (
                    agent.findings.map((f: any, fi: number) => (
                        <FindingItem key={fi} finding={f} />
                    ))
                ) : (
                    <p className="text-sm text-zinc-500 italic">Aucune observation détaillée générée par cet agent.</p>
                )}
            </div>
        </motion.div>
    );
}
