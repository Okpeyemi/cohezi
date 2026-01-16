import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scale, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";
import { VerdictCard } from "./VerdictCard";
import { FinalVerdict } from "@/types/analysis";
import { ConclusionModal } from "./ConclusionModal";
import { cn } from "@/lib/utils";

interface VerdictSidebarProps {
    verdict: FinalVerdict | null;
    decisionContext?: string;
    originalDecision?: string;
    originalReasoning?: string;
}

export function VerdictSidebar({ verdict, decisionContext, originalDecision, originalReasoning }: VerdictSidebarProps) {
    const [isConclusionOpen, setIsConclusionOpen] = useState(false);

    if (!verdict) {
        // ... (keep unused code collapsed if needed, but here replace works better with context)
        return (
            <div className="h-full flex flex-col bg-zinc-950">
                <div className="flex justify-center p-6 border-b border-white/5 bg-zinc-950/40 backdrop-blur-xl z-20">
                    <h2 className="text-2xl font-bold tracking-tight gradient-text">Le Verdict</h2>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 text-center space-y-4 opacity-50 p-6">
                    <Scale size={48} className="text-zinc-800" />
                    <p className="text-sm font-bold">Analyse non initiée</p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">En attente de données...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-zinc-950 relative">
            <div className="flex justify-center p-6 border-b border-white/5 bg-zinc-950/40 backdrop-blur-xl z-20">
                <h2 className="text-2xl font-bold tracking-tight gradient-text">Le Verdict</h2>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-6">
                    <div className="space-y-10 py-4 pb-24">
                        {/* Failles Critiques */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-rose-500 border-b border-rose-500/10 pb-2">
                                <AlertTriangle size={16} />
                                <h3 className="text-xs font-bold uppercase tracking-widest">Failles Critiques</h3>
                            </div>
                            <div className="space-y-3">
                                {verdict.critical_flaws.map((f, i) => (
                                    <VerdictCard
                                        key={f.title}
                                        title={f.title}
                                        subtitle={f.impact}
                                        detail={f.detailed_explanation}
                                        solution={f.solution}
                                        type="flaw"
                                        delay={0.1 * i}
                                    />
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
                                {verdict.decision_paths.map((p, i) => (
                                    <VerdictCard
                                        key={p.path}
                                        title={p.path}
                                        score={p.robustness_score}
                                        validIf={p.valid_if}
                                        failsIf={p.fails_if}
                                        detail={p.detailed_explanation}
                                        type="path"
                                        delay={0.5 + (0.1 * i)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>

            {/* Conclusion Button - Floating Bottom */}
            <div className=" bottom-6 left-0 w-full p-6 z-30 border-t border-white/5 pointer-events-none">
                <button
                    onClick={() => setIsConclusionOpen(true)}
                    className="w-full pointer-events-auto group bg-white hover:bg-zinc-200 text-zinc-950 p-4 rounded-xl shadow-[0_10px_40px_-10px_rgba(255,255,255,0.2)] transition-all duration-300 border border-white/20 flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-zinc-950/10 p-2 rounded-lg text-zinc-900">
                            <Sparkles size={18} />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] uppercase font-black tracking-widest opacity-60">Synthèse</p>
                            <p className="text-sm font-bold">Voir la Conclusion</p>
                        </div>
                    </div>
                    <Scale size={18} className="opacity-40 group-hover:scale-110 transition-transform duration-300" />
                </button>
            </div>

            <ConclusionModal
                isOpen={isConclusionOpen}
                onClose={() => setIsConclusionOpen(false)}
                context={decisionContext || "Aucun contexte disponible."}
                originalDecision={originalDecision || ""}
                originalReasoning={originalReasoning || ""}
                verdict={verdict}
            />
        </div>
    );
}
