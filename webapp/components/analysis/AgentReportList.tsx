"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CausalGraph } from "@/components/ui/causal-graph";
import { AgentReportCard } from "./AgentReportCard";
import { BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import { AgentReport } from "@/types/analysis";

interface AgentReportListProps {
    agents: AgentReport[] | null;
    isLoading: boolean;
}

export function AgentReportList({ agents, isLoading }: AgentReportListProps) {
    const allCausalElements = agents?.flatMap((a) => a.causal_elements || []) || [];

    if (!agents && !isLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
                <div className="p-4 bg-zinc-900 rounded-full w-fit mx-auto">
                    <div className="w-12 h-12 border-2 border-zinc-700 rounded-full flex items-center justify-center">
                        <BrainCircuit className="text-zinc-400" size={32} />
                    </div>
                </div>
                <p className="text-zinc-400 font-medium">
                    Soumettez votre décision à gauche pour voir les agents s'activer ici.
                </p>
            </div>
        );
    }

    if (!agents) return null;

    return (
        <div className="w-full max-w-4xl mx-auto animate-in fade-in duration-1000">
            {allCausalElements.length > 0 && (
                <div className="mb-12 border-b border-zinc-900/50">
                    <CausalGraph elements={allCausalElements} />
                </div>
            )}

            <div className="p-6 space-y-8 pb-24">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-px flex-1 bg-zinc-900" />
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-4">Analyse Détaillée</span>
                    <div className="h-px flex-1 bg-zinc-900" />
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {agents.map((agent, i) => (
                        <AgentReportCard key={agent.agent_name} agent={agent} index={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
