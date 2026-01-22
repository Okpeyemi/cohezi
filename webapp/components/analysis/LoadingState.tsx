"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const LOADING_MESSAGES = [
    "Initialisation de l'orchestrateur...",
    "Extraction des hypothèses implicites...",
    "Déploiement des 5 agents spécialisés...",
    "Analyse de la cohérence interne (Agent Logique)...",
    "Simulation des ondes de choc (Agent Causal)...",
    "Identification des points de rupture (Agent Risque)...",
    "Défiance systématique et traque des biais (Agent Sceptique)...",
    "Stress-test en conditions critiques...",
    "Compilation de la synthèse finale..."
];

export function LoadingState({ message }: { message?: string }) {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        if (message) return; // Don't cycle if message is provided
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [message]);

    return (
        <div className="w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center space-y-6">
            <div className="relative">
                <Loader2 className="w-24 h-24 text-zinc-700 animate-spin mx-auto" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 animate-pulse">Processing</span>
                </div>
            </div>
            <div className="space-y-3 text-center">
                <p className="text-lg font-medium text-zinc-200">{message || LOADING_MESSAGES[messageIndex]}</p>
                <div className="flex gap-2 justify-center">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
