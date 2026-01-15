"use client";

import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { InputPanel } from "@/components/panels/input-panel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingState } from "@/components/analysis/LoadingState";
import { AgentReportList } from "@/components/analysis/AgentReportList";
import { VerdictSidebar } from "@/components/analysis/VerdictSidebar";
import { motion } from "framer-motion";
import { AnalysisResponse } from "@/types/analysis";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<AnalysisResponse | null>(null);

    const handleAnalyze = async (decision: string, reasoning: string) => {
        setIsLoading(true);
        setResults(null);
        try {
            const response = await fetch("http://localhost:3001/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ decision, reasoning }),
            });

            if (!response.ok) throw new Error("Erreur lors de l'analyse");

            const data: AnalysisResponse = await response.json();
            setResults(data);
        } catch (error) {
            console.error(error);
            // On pourra implémenter un Toast ici plus tard
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MainLayout
            leftPanel={
                <ScrollArea className="h-full">
                    <div className="p-6">
                        <InputPanel onAnalyze={handleAnalyze} isLoading={isLoading} />
                    </div>
                </ScrollArea>
            }
            centerPanel={
                <div className="flex flex-col h-full gradient-subtle">
                    {/* Header Fixe */}
                    <div className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-950/40 backdrop-blur-xl z-20">
                        <h2 className="text-2xl font-bold tracking-tight gradient-text">L'Arène de Cohezi</h2>
                        {results && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Analyse Complétée</p>
                            </motion.div>
                        )}
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-6 min-h-full flex flex-col">
                            {isLoading ? (
                                <LoadingState />
                            ) : (
                                <AgentReportList agents={results?.agents || null} isLoading={isLoading} />
                            )}
                        </div>
                    </ScrollArea>
                </div>
            }
            rightPanel={<VerdictSidebar verdict={results?.verdict || null} />}
        />
    );
}