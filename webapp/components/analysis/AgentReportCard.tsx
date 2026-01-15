"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { AgentReport } from "@/types/analysis";

interface AgentReportCardProps {
    agent: AgentReport;
    index: number;
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
                        <div key={fi} className="p-4 bg-zinc-950/50 rounded-xl border border-white/[0.03] space-y-2 hover:bg-zinc-950 transition-colors">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-zinc-200">{f.point}</p>
                                <span className={cn(
                                    "px-2 py-0.5 rounded text-[8px] uppercase font-black tracking-tighter",
                                    f.severity === "high" ? "bg-rose-500/20 text-rose-400" :
                                        f.severity === "medium" ? "bg-amber-500/20 text-amber-400" :
                                            "bg-emerald-500/20 text-emerald-400"
                                )}>
                                    {f.severity}
                                </span>
                            </div>
                            <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">{f.explanation}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-zinc-500 italic">Aucune observation détaillée générée par cet agent.</p>
                )}
            </div>
        </motion.div>
    );
}
