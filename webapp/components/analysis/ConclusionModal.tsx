"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Quote, Scale, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import { FinalVerdict } from "@/types/analysis";

interface ConclusionModalProps {
    isOpen: boolean;
    onClose: () => void;
    context: string;
    verdict: FinalVerdict;
}

export function ConclusionModal({ isOpen, onClose, context, verdict }: ConclusionModalProps) {
    // Extract solutions from critical flaws
    const solutions = verdict.critical_flaws
        .filter(f => f.solution)
        .map(f => ({ title: f.title, solution: f.solution! }));

    // Extract valid conditions from decision paths
    const successConditions = verdict.decision_paths
        .filter(p => p.robustness_score > 50)
        .map(p => ({ path: p.path, condition: p.valid_if }));

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl z-50 px-4"
                    >
                        <div className="relative bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="p-8 flex-shrink-0">
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-indigo-400 mb-2">
                                            <Sparkles size={16} />
                                            <span className="text-xs font-bold uppercase tracking-widest">Synthèse Stratégique</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white leading-tight">
                                            Plan d'Action & Résilience
                                        </h2>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-400 hover:text-white"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-y-auto px-8 pb-8 custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Left Column: Context & Summary */}
                                    <div className="space-y-6">
                                        {/* Context Section */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-zinc-400">
                                                <Quote size={14} />
                                                <h3 className="text-xs font-bold uppercase tracking-wider">L'Intention Initiale</h3>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 text-zinc-400 text-xs leading-relaxed italic">
                                                "{context}"
                                            </div>
                                        </div>

                                        {/* Synthesis Summary */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-zinc-200">
                                                <Scale size={14} />
                                                <h3 className="text-xs font-bold uppercase tracking-wider">Le Verdict du Juge</h3>
                                            </div>
                                            <div className="text-zinc-300 text-sm leading-relaxed">
                                                {verdict.synthesis_summary}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Action Plan */}
                                    <div className="space-y-8">
                                        {/* Solutions (Prioritized) */}
                                        {solutions.length > 0 && (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-amber-500 border-b border-amber-500/10 pb-2">
                                                    <Lightbulb size={16} />
                                                    <h3 className="text-xs font-bold uppercase tracking-widest">Actions Correctives Prioritaires</h3>
                                                </div>
                                                <div className="space-y-3">
                                                    {solutions.map((s, i) => (
                                                        <div key={i} className="bg-amber-500/[0.03] border border-amber-500/10 rounded-xl p-4">
                                                            <div className="flex items-center gap-2 mb-1.5">
                                                                <AlertTriangle size={12} className="text-amber-500" />
                                                                <span className="text-[10px] uppercase font-bold text-amber-500/80">{s.title}</span>
                                                            </div>
                                                            <p className="text-xs text-zinc-300 font-medium">{s.solution}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Success Conditions */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-emerald-500 border-b border-emerald-500/10 pb-2">
                                                <CheckCircle2 size={16} />
                                                <h3 className="text-xs font-bold uppercase tracking-widest">Conditions de Succès</h3>
                                            </div>
                                            <div className="space-y-3">
                                                {successConditions.map((c, i) => (
                                                    <div key={i} className="bg-emerald-500/[0.03] border border-emerald-500/10 rounded-xl p-4">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                            <span className="text-[10px] uppercase font-bold text-emerald-500/80">Si vous choisissez : {c.path}</span>
                                                        </div>
                                                        <p className="text-xs text-zinc-300 font-medium">
                                                            <span className="text-zinc-500">Alors :</span> {c.condition}
                                                        </p>
                                                    </div>
                                                ))}
                                                {successConditions.length === 0 && (
                                                    <p className="text-xs text-zinc-500 italic">Aucune condition de succès clair identifiée avec un bon score de robustesse.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Action */}
                                <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-2.5 bg-white text-zinc-950 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors"
                                    >
                                        J'ai compris le plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
