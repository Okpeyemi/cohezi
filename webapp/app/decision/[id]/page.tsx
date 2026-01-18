"use client";

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { InputPanel } from "@/components/panels/input-panel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingState } from "@/components/analysis/LoadingState";
import { AgentReportList } from "@/components/analysis/AgentReportList";
import { VerdictSidebar } from "@/components/analysis/VerdictSidebar";
import { motion } from "framer-motion";
import { AnalysisResponse } from "@/types/analysis";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase/config";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function DecisionPage() {
    const params = useParams();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const id = params?.id as string;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<AnalysisResponse | null>(null);
    const [inputs, setInputs] = useState<{ decision: string; reasoning: string } | null>(null);

    // Auth Guard
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        const fetchData = async () => {
            if (!user || !id || id === "new") return;

            setIsLoading(true);
            try {
                // 1. Fetch Decision
                const decisionDoc = await getDoc(doc(db, "decisions", id));
                if (!decisionDoc.exists()) {
                    setError("Décision introuvable.");
                    return;
                }
                const decisionData = decisionDoc.data();
                setInputs({
                    decision: decisionData.context,
                    reasoning: decisionData.reasoning,
                });

                if (decisionData.status === "pending") {
                    // Poll or listen? For now just show pending state
                    return;
                }

                // 2. Fetch Analysis
                const q = query(collection(db, "analyses"), where("decisionId", "==", id));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const analysisData = querySnapshot.docs[0].data();
                    setResults({
                        orchestration: analysisData.orchestrationResult,
                        agents: analysisData.agentReports,
                        verdict: analysisData.finalVerdict,
                    } as AnalysisResponse);
                }

            } catch (err: any) {
                console.error("Error fetching data:", err);
                if (err.code === 'unavailable') {
                    setError("Connexion impossible au serveur Firebase. Vérifiez votre connexion.");
                } else if (err.code === 'permission-denied') {
                    setError("Permission refusée. Vous devez être connecté.");
                } else {
                    setError("Erreur lors du chargement de la décision.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [id, user]);

    const handleAnalyze = async (decision: string, reasoning: string) => {
        if (!user) return;

        setIsLoading(true);
        setError(null);
        setResults(null);
        setInputs({ decision, reasoning }); // Store inputs for PDF export
        try {
            // Use the proxy route in the webapp itself (which calls backend + saves to DB)
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ decision, reasoning, userId: user.uid }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Erreur inconnue" }));
                throw new Error(errorData.error || `Erreur ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            // Redirect to the persistent URL if we have an ID
            if (data.decisionId) {
                router.push(`/decision/${data.decisionId}`);
            } else {
                // Fallback (shouldn't happen with new API)
                setResults(data);
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Une erreur est survenue lors de l'analyse.");
            setIsLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-zinc-950 text-white">
                <Loader2 className="animate-spin text-emerald-500" size={32} />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <MainLayout
            leftPanel={
                <ScrollArea className="h-full">
                    <div className="p-6">
                        <InputPanel
                            onAnalyze={handleAnalyze}
                            isLoading={isLoading}
                            defaultValues={inputs || undefined}
                        />
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
            rightPanel={
                <VerdictSidebar
                    verdict={results?.verdict || null}
                    decisionContext={results?.orchestration?.decision_summary}
                    originalDecision={inputs?.decision || ""}
                    originalReasoning={inputs?.reasoning || ""}
                />
            }
        />
    );
}
