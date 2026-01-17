"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain } from "lucide-react";

interface InputPanelProps {
    onAnalyze: (decision: string, reasoning: string) => void;
    isLoading: boolean;
    defaultValues?: {
        decision: string;
        reasoning: string;
    };
}

export function InputPanel({ onAnalyze, isLoading, defaultValues }: InputPanelProps) {
    const [decision, setDecision] = useState(defaultValues?.decision || "");
    const [reasoning, setReasoning] = useState(defaultValues?.reasoning || "");

    React.useEffect(() => {
        if (defaultValues) {
            setDecision(defaultValues.decision);
            setReasoning(defaultValues.reasoning);
        }
    }, [defaultValues]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (decision.trim()) {
            onAnalyze(decision, reasoning);
        }
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-900 rounded-lg border border-white/5">
                        <Brain className="text-emerald-500" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight gradient-text">L'Intention</h2>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                    Soumettez votre décision pour une évaluation cognitive multi-agents.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 pl-1">Votre Décision</label>
                    <Textarea
                        placeholder="Ex: Pivoter l'entreprise vers un modèle 100% remote dès le mois prochain..."
                        className="min-h-[120px] bg-zinc-950/50 border-zinc-800 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all duration-300 resize-none rounded-xl text-sm leading-relaxed"
                        value={decision}
                        onChange={(e) => setDecision(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 pl-1">Votre Raisonnement <span className="text-zinc-700 font-normal">(Optionnel)</span></label>
                    <Textarea
                        placeholder="Quelles sont vos hypothèses ? Vos doutes ? L'IA cherchera à les confirmer ou les invalider."
                        className="min-h-[220px] bg-zinc-950/50 border-zinc-800 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all duration-300 resize-none rounded-xl text-sm leading-relaxed"
                        value={reasoning}
                        onChange={(e) => setReasoning(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-zinc-100 text-zinc-950 hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 h-12 rounded-xl font-bold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                    disabled={isLoading || !decision.trim()}
                >
                    {isLoading ? (
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                            <span>Orchestration...</span>
                        </div>
                    ) : (
                        "Lancer l'Analyse"
                    )}
                </Button>
            </form>
        </div>
    );
}
