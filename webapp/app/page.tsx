"use client";

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { InputPanel } from "@/components/panels/input-panel";
import { BrainCircuit, Loader2, Scale, AlertTriangle, ShieldCheck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CausalGraph } from "@/components/ui/causal-graph";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [loadingMessage, setLoadingMessage] = useState(0);

    const loadingMessages = [
        "Initialisation de l'orchestrateur...",
        "Extraction des hypothèses implicites...",
        "Déploiement des 5 agents spécialisés...",
        "Analyse des chaînes de causalité...",
        "Stress-test des scénarios critiques...",
        "Synthèse du verdict final..."
    ];

    useEffect(() => {
        let interval: any;
        if (isLoading) {
            interval = setInterval(() => {
                setLoadingMessage((prev) => (prev + 1) % loadingMessages.length);
            }, 2000);
        } else {
            setLoadingMessage(0);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

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

    // Collecter tous les éléments causaux pour le graphe
    const allCausalElements = results?.agents?.flatMap((a: any) => a.causal_elements || []) || [];

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
                                <div className="w-full max-w-4xl mx-auto animate-in fade-in duration-1000">
                                    {/* Visualisations Globales (Phase 2) */}
                                    {allCausalElements.length > 0 && (
                                        <div className="mb-12 border-b border-zinc-900">
                                            <CausalGraph elements={allCausalElements} />
                                        </div>
                                    )}

                                    <div className="p-6 space-y-8 pb-24">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="h-px flex-1 bg-zinc-900" />
                                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-4">Analyse Détaillée</span>
                                            <div className="h-px flex-1 bg-zinc-900" />
                                        </div>

                                        <div className="grid grid-cols-1 gap-8">
                                            {(results?.agents || []).map((agent: any, idx: number) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 + (idx * 0.1) }}
                                                    className="bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800 text-left space-y-6 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-500 group"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
                                                                    <BrainCircuit size={18} className="text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                                                                </div>
                                                                <h3 className="text-xl font-bold capitalize tracking-tight text-zinc-100">{agent.agent_name}</h3>
                                                            </div>
                                                            <p className="text-[10px] text-zinc-500 font-mono uppercase">Agent Spécialisé #{idx + 1}</p>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-2">
                                                            <span className="text-[9px] font-mono px-2 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded uppercase tracking-tighter shadow-sm">Validation 100%</span>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-6">
                                                        {(agent?.findings && Array.isArray(agent.findings) && agent.findings.length > 0) ? (
                                                            agent.findings.map((f: any, i: number) => (
                                                                <div key={i} className="relative pl-6 border-l border-zinc-800 group/item py-1">
                                                                    <div className="absolute left-[-1px] top-0 h-4 w-[1px] bg-emerald-500/50 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                                                    <p className="font-semibold text-zinc-200 text-sm mb-1 group-hover/item:text-emerald-400 transition-colors">{f.point}</p>
                                                                    <p className="text-sm text-zinc-500 leading-relaxed">{f.explanation}</p>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p className="text-sm text-zinc-500 italic">Aucune observation détaillée générée par cet agent.</p>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
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
                                    <p className="text-sm font-medium">Analyse non initiée</p>
                                    <p className="text-[10px] uppercase tracking-widest">En attente de données...</p>
                                </div>
                            ) : (
                                <div className="space-y-10 py-4 animate-in fade-in duration-1000 pb-24">
                                    <div className="space-y-8">
                                        {/* Failles Critiques */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-rose-500 border-b border-rose-500/10 pb-2">
                                                <AlertTriangle size={16} />
                                                <h3 className="text-xs font-bold uppercase tracking-widest">Failles Critiques</h3>
                                            </div>
                                            <div className="space-y-3">
                                                {(results?.verdict?.critical_flaws || []).map((f: any, i: number) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 1 + (i * 0.1) }}
                                                        className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-xl group hover:bg-rose-500/10 transition-colors"
                                                    >
                                                        <p className="font-bold text-rose-200 text-sm mb-1">{f.title}</p>
                                                        <p className="text-[11px] text-rose-300/70 leading-relaxed font-medium">{f.impact}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Chemins de Décision */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-emerald-500 border-b border-emerald-500/10 pb-2">
                                                <ShieldCheck size={16} />
                                                <h3 className="text-xs font-bold uppercase tracking-widest">Chemins de Résilience</h3>
                                            </div>
                                            <div className="space-y-3">
                                                {(results?.verdict?.decision_paths || []).map((p: any, i: number) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 1.5 + (i * 0.1) }}
                                                        className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4 hover:border-emerald-500/20 transition-all group"
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <p className="font-bold text-zinc-100 text-sm flex-1 leading-tight">{p.path}</p>
                                                            <span className="text-[10px] font-mono font-bold text-emerald-500">{p.robustness_score}%</span>
                                                        </div>

                                                        <div className="space-y-3">
                                                            <div className="flex items-start gap-2">
                                                                <div className="mt-1 w-1 h-1 rounded-full bg-emerald-500" />
                                                                <p className="text-[10px] text-zinc-400 leading-tight uppercase font-bold"><span className="text-emerald-500">VALIDE SI:</span> {p.valid_if}</p>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <div className="mt-1 w-1 h-1 rounded-full bg-rose-500" />
                                                                <p className="text-[10px] text-zinc-400 leading-tight uppercase font-bold"><span className="text-rose-500">ÉCHOUE SI:</span> {p.fails_if}</p>
                                                            </div>
                                                        </div>

                                                        <div className="w-full bg-zinc-950 h-1 rounded-full overflow-hidden border border-zinc-800/50">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${p.robustness_score}%` }}
                                                                transition={{ delay: 2, duration: 1 }}
                                                                className="bg-emerald-500 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                                                            />
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
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