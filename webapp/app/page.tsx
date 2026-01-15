"use client";

import React, { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { InputPanel } from "@/components/panels/input-panel";
import { BrainCircuit, Loader2, Scale, AlertTriangle, ShieldCheck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any>(null);

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

            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue lors de l'analyse.");
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
                <div className="flex flex-col h-full">
                    {/* Header Fixe */}
                    <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md z-20">
                        <h2 className="text-2xl font-semibold text-center tracking-tight">L'Arène de Cohezi</h2>
                        {results && <p className="text-xs text-center text-zinc-500 mt-1 uppercase tracking-widest">Analyse en cours terminée</p>}
                    </div>

                    <ScrollArea className="flex-1">
                        <div className={cn(
                            "p-6 flex flex-col w-full",
                            !results && !isLoading ? "h-full items-center justify-center text-center" : "items-start"
                        )}>
                            {!results && !isLoading && (
                                <div className="max-w-md space-y-4">
                                    <div className="p-4 bg-zinc-900 rounded-full w-fit mx-auto">
                                        <div className="w-12 h-12 border-2 border-zinc-700 rounded-full flex items-center justify-center">
                                            <BrainCircuit className="text-zinc-400" size={32} />
                                        </div>
                                    </div>
                                    <p className="text-zinc-400">
                                        Soumettez votre décision à gauche pour voir les agents s'activer ici.
                                    </p>
                                </div>
                            )}

                            {isLoading && (
                                <div className="w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center space-y-6">
                                    <div className="relative">
                                        <Loader2 className="w-24 h-24 text-zinc-700 animate-spin mx-auto" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-xs font-mono uppercase tracking-widest animate-pulse">Processing</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-center">
                                        <p className="text-lg font-medium">Orchestration cognitive...</p>
                                        <div className="flex gap-2 justify-center">
                                            {[0, 1, 2, 3, 4].map((i) => (
                                                <div key={i} className="w-2 h-2 bg-zinc-700 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {results && (
                                <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
                                    <div className="grid grid-cols-1 gap-6">
                                        {results.agents.map((agent: any, idx: number) => (
                                            <div key={idx} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 text-left space-y-4 hover:border-zinc-700 transition-colors">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <BrainCircuit size={20} className="text-zinc-400" />
                                                        <h3 className="text-lg font-bold capitalize">{agent.agent_name}</h3>
                                                    </div>
                                                    <span className="text-xs font-mono px-2 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded uppercase tracking-tight">Terminé</span>
                                                </div>
                                                <div className="h-px bg-zinc-800 w-full" />
                                                <ul className="space-y-4">
                                                    {agent.findings.map((f: any, i: number) => (
                                                        <li key={i} className="space-y-1">
                                                            <p className="font-medium text-zinc-100">{f.point}</p>
                                                            <p className="text-sm text-zinc-400 leading-relaxed">{f.explanation}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            }
            rightPanel={
                <div className="flex flex-col h-full">
                    {/* Header Fixe */}
                    <div className="flex justify-center p-6 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md z-20">
                        <h2 className="text-2xl font-semibold tracking-tight">Le Verdict</h2>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-6">
                            {!results ? (
                                <div className="h-[calc(100vh-200px)] flex flex-col items-center justify-center text-zinc-500 text-center space-y-4 opacity-50">
                                    <Scale size={48} className="text-zinc-800" />
                                    <p className="text-sm">En attente de l'analyse...</p>
                                </div>
                            ) : (
                                <div className="space-y-8 animate-in fade-in duration-1000">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-rose-500">
                                                <AlertTriangle size={16} />
                                                <h3 className="text-sm font-bold uppercase tracking-wider">Failles Critiques</h3>
                                            </div>
                                            {results.verdict.critical_flaws.map((f: any, i: number) => (
                                                <div key={i} className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                                                    <p className="font-bold text-rose-200">{f.title}</p>
                                                    <p className="text-sm text-rose-300/80">{f.impact}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-emerald-500">
                                                <ShieldCheck size={16} />
                                                <h3 className="text-sm font-bold uppercase tracking-wider">Chemins de Décision</h3>
                                            </div>
                                            {results.verdict.decision_paths.map((p: any, i: number) => (
                                                <div key={i} className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg space-y-2">
                                                    <p className="font-bold text-emerald-200">{p.path}</p>
                                                    <p className="text-xs text-emerald-400">VALIDE SI: {p.valid_if}</p>
                                                    <p className="text-xs text-rose-400">ÉCHOUE SI: {p.fails_if}</p>
                                                    <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2">
                                                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${p.robustness_score}%` }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            }
        />
    );
}