"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain } from "lucide-react";

interface InputPanelProps {
    onAnalyze: (decision: string, reasoning: string) => void;
    isLoading: boolean;
}

export function InputPanel({ onAnalyze, isLoading }: InputPanelProps) {
    const [decision, setDecision] = useState("");
    const [reasoning, setReasoning] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (decision.trim()) {
            onAnalyze(decision, reasoning);
        }
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Brain className="text-zinc-400" size={24} />
                    <h2 className="text-2xl font-semibold tracking-tight">L'Intention</h2>
                </div>
                <p className="text-sm text-zinc-400">
                    Décrivez la décision que vous souhaitez soumettre à l'analyse de Cohezi.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Votre Décision</label>
                    <Textarea
                        placeholder="Ex: Lancer une nouvelle ligne de produits eco-friendly..."
                        className="min-h-[100px] bg-zinc-950 border-zinc-800 focus:border-zinc-700 transition-colors"
                        value={decision}
                        onChange={(e) => setDecision(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Votre Raisonnement (Optionnel)</label>
                    <Textarea
                        placeholder="Pourquoi cette décision ? Quelles sont vos hypothèses ?"
                        className="min-h-[200px] bg-zinc-950 border-zinc-800 focus:border-zinc-700 transition-colors"
                        value={reasoning}
                        onChange={(e) => setReasoning(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-medium"
                    disabled={isLoading || !decision.trim()}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <span className="animate-pulse">Analyse en cours...</span>
                        </span>
                    ) : (
                        "Lancer l'Arène"
                    )}
                </Button>
            </form>
        </div>
    );
}
