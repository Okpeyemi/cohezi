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
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<AnalysisResponse | null>(null);

    const handleAnalyze = async (decision: string, reasoning: string) => {
        setIsLoading(true);
        setError(null);
        setResults(null);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
            console.log("Environment API URL:", process.env.NEXT_PUBLIC_API_URL);
            console.log("Resolved API URL:", apiUrl);

            const response = await fetch(`${apiUrl}/api/analyze`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ decision, reasoning }),
            });

            if (!response.ok) throw new Error("Erreur lors de l'analyse");

            const data: AnalysisResponse = await response.json();
            setResults(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Une erreur est survenue lors de l'analyse.");
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
                            ) : error ? (
                                <div className="flex h-full items-center justify-center p-6">
                                    <div className="bg-rose-500/10 border border-rose-500/20 text-rose-200 p-6 rounded-xl text-center max-w-sm">
                                        <h3 className="font-bold mb-2">Erreur système</h3>
                                        <p className="text-sm opacity-80">{error}</p>
                                    </div>
                                </div>
                            ) : (
                                <AgentReportList agents={results?.agents || null} isLoading={isLoading} />
                            )}
                        </div>
                    </ScrollArea>
                </div>
            }
            rightPanel={<VerdictSidebar verdict={results?.verdict || null} decisionContext={results?.orchestration?.decision_summary} />}
        />
    );
}