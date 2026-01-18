"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, FileText, Upload, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface InputPanelProps {
    onAnalyze: (decision: string, reasoning: string) => void;
    isLoading: boolean;
    defaultValues?: {
        decision: string;
        reasoning: string;
    };
    isReadOnly?: boolean;
}

export function InputPanel({ onAnalyze, isLoading, defaultValues, isReadOnly = false }: InputPanelProps) {
    const [decision, setDecision] = useState(defaultValues?.decision || "");
    const [reasoning, setReasoning] = useState(defaultValues?.reasoning || "");
    const [inputType, setInputType] = useState<"text" | "file">("text");
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    React.useEffect(() => {
        if (defaultValues) {
            setDecision(defaultValues.decision);
            setReasoning(defaultValues.reasoning);
        }
    }, [defaultValues]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            setFileContent(content);
        };
        reader.readAsText(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (inputType === "file" && fileContent && !isReadOnly) {
            // For file input, we treat the whole file content as the decision context
            // and pass an empty string or a standard message for reasoning?
            // Or maybe we split it if possible? For now, let's treat it as decision context.
            onAnalyze(fileContent, "Basé sur le fichier importé : " + fileName);
        } else if (inputType === "text" && decision.trim() && !isReadOnly) {
            onAnalyze(decision, reasoning);
        }
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-zinc-900 rounded-lg border border-white/5">
                            <Brain className="text-emerald-500" size={20} />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight gradient-text">L'Intention</h2>
                    </div>

                    {!isReadOnly && (
                        <div className="flex bg-zinc-900/50 p-1 rounded-lg border border-white/5">
                            <button
                                onClick={() => setInputType("text")}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${inputType === "text"
                                    ? "bg-zinc-800 text-white shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-300"
                                    }`}
                            >
                                Texte
                            </button>
                            <button
                                onClick={() => setInputType("file")}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${inputType === "file"
                                    ? "bg-zinc-800 text-white shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-300"
                                    }`}
                            >
                                Fichier
                            </button>
                        </div>
                    )}
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                    {isReadOnly
                        ? "Mode lecture seule : Cette décision appartient à un autre utilisateur."
                        : "Soumettez votre décision pour une évaluation cognitive multi-agents."
                    }
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {inputType === "text" ? (
                    <>
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 pl-1">Votre Décision</label>
                            <Textarea
                                placeholder="Ex: Pivoter l'entreprise vers un modèle 100% remote dès le mois prochain..."
                                className="min-h-[120px] bg-zinc-950/50 border-zinc-800 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all duration-300 resize-none rounded-xl text-sm leading-relaxed disabled:opacity-70 disabled:cursor-not-allowed"
                                value={decision}
                                onChange={(e) => setDecision(e.target.value)}
                                disabled={isLoading || isReadOnly}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 pl-1">Votre Raisonnement <span className="text-zinc-700 font-normal">(Optionnel)</span></label>
                            <Textarea
                                placeholder="Quelles sont vos hypothèses ? Vos doutes ? L'IA cherchera à les confirmer ou les invalider."
                                className="min-h-[220px] bg-zinc-950/50 border-zinc-800 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all duration-300 resize-none rounded-xl text-sm leading-relaxed disabled:opacity-70 disabled:cursor-not-allowed"
                                value={reasoning}
                                onChange={(e) => setReasoning(e.target.value)}
                                disabled={isLoading || isReadOnly}
                            />
                        </div>
                    </>
                ) : (
                    <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:border-zinc-700 transition-colors bg-zinc-950/30">
                        {fileContent ? (
                            <div className="flex flex-col items-center gap-3 w-full">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                    <FileText size={24} />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-white">{fileName}</p>
                                    <p className="text-xs text-zinc-500 mt-1">Prêt pour l'analyse</p>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setFileContent(null);
                                        setFileName(null);
                                    }}
                                    className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10"
                                >
                                    Supprimer
                                </Button>
                                <ScrollArea className="w-full mt-4 h-[400px] rounded-lg border border-white/5 bg-zinc-950">
                                    <div className="p-4">
                                        <pre className="text-xs text-zinc-400 whitespace-pre-wrap font-mono">{fileContent}</pre>
                                    </div>
                                </ScrollArea>
                            </div>
                        ) : (
                            <>
                                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500">
                                    <Upload size={24} />
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-sm font-medium text-zinc-300">Importer un fichier</p>
                                    <p className="text-xs text-zinc-500">Supporte .md, .txt (Max 5MB)</p>
                                </div>
                                <input
                                    type="file"
                                    accept=".md,.txt,.json"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="file-upload"
                                    disabled={isLoading || isReadOnly}
                                />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="mt-2"
                                    onClick={() => document.getElementById("file-upload")?.click()}
                                    disabled={isLoading || isReadOnly}
                                >
                                    Sélectionner un fichier
                                </Button>
                            </>
                        )}
                    </div>
                )}

                {!isReadOnly && (
                    <Button
                        type="submit"
                        className="w-full bg-zinc-100 text-zinc-950 hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 h-12 rounded-xl font-bold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                        disabled={isLoading || (inputType === "text" ? !decision.trim() : !fileContent)}
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
                )}
            </form>
        </div>
    );
}
