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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

import { useTranslations } from "next-intl";

export default function DecisionPage() {
    const params = useParams();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const id = params?.id as string;
    const t = useTranslations("DecisionPage");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<AnalysisResponse | null>(null);
    const [inputs, setInputs] = useState<{ decision: string; reasoning: string; userId: string } | null>(null);
    const [activeTab, setActiveTab] = useState("intention");

    // Auth Guard
    useEffect(() => {
        if (!authLoading && !user) {
            const returnUrl = encodeURIComponent(window.location.pathname);
            router.push(`/?redirect=${returnUrl}`);
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
                    setError(t("errors.notFound"));
                    return;
                }
                const decisionData = decisionDoc.data();
                setInputs({
                    decision: decisionData.context,
                    reasoning: decisionData.reasoning,
                    userId: decisionData.userId,
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
                    setError(t("errors.connection"));
                } else if (err.code === 'permission-denied') {
                    setError(t("errors.permission"));
                } else {
                    setError(t("errors.loadError"));
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
        setInputs({ decision, reasoning, userId: user.uid }); // Store inputs for PDF export
        try {
            // Use the proxy route in the webapp itself (which calls backend + saves to DB)
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ decision, reasoning, userId: user.uid }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: t("errors.unknown") }));
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
            setError(err.message || t("errors.unknown"));
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
    const isOwner = inputs && user ? inputs.userId === user.uid : true;

    return (
        <>
            {/* Mobile/Tablet Layout (Tabs) */}
            <div className="lg:hidden h-[calc(100vh-64px)] flex flex-col bg-zinc-950 pt-4">
                <Tabs defaultValue="intention" className="w-full h-full flex flex-col" onValueChange={setActiveTab}>
                    <div className="px-4 pb-4 shrink-0">
                        <TabsList className="w-full grid grid-cols-3 bg-zinc-900/50 border border-white/5">
                            <TabsTrigger value="intention">{t("tabs.intention")}</TabsTrigger>
                            <TabsTrigger value="arena">{t("tabs.arena")}</TabsTrigger>
                            <TabsTrigger value="verdict">{t("tabs.verdict")}</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="intention" className="flex-1 overflow-hidden mt-0 data-[state=inactive]:hidden h-full">
                        <ScrollArea className="h-full">
                            <div className="p-4 pt-0">
                                <InputPanel
                                    onAnalyze={handleAnalyze}
                                    isLoading={isLoading}
                                    defaultValues={inputs || undefined}
                                    isReadOnly={!isOwner}
                                />
                            </div>
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="arena" className="flex-1 overflow-hidden mt-0 data-[state=inactive]:hidden h-full">
                        <div className="flex flex-col h-full gradient-subtle">
                            {/* Header Fixe Mobile */}
                            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-zinc-950/40 backdrop-blur-xl z-20">
                                <h2 className="text-xl font-bold tracking-tight gradient-text">{t("tabs.arena")}</h2>
                                {results && (
                                    <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{t("status.completed")}</p>
                                    </div>
                                )}
                            </div>
                            <ScrollArea className="flex-1">
                                <div className="p-4 min-h-full flex flex-col">
                                    {isLoading ? (
                                        <LoadingState />
                                    ) : error ? (
                                        <div className="flex h-full items-center justify-center p-6">
                                            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-200 p-6 rounded-xl text-center max-w-sm">
                                                <h3 className="font-bold mb-2">{t("errors.system")}</h3>
                                                <p className="text-sm opacity-80">{error}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <AgentReportList agents={results?.agents || null} isLoading={isLoading} />
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    </TabsContent>

                    <TabsContent value="verdict" className="flex-1 overflow-hidden mt-0 data-[state=inactive]:hidden h-full">
                        <VerdictSidebar
                            verdict={results?.verdict || null}
                            decisionContext={results?.orchestration?.decision_summary}
                            originalDecision={inputs?.decision || ""}
                            originalReasoning={inputs?.reasoning || ""}
                        />
                    </TabsContent>
                </Tabs>
            </div>

            {/* Desktop Layout (Original) */}
            <div className="hidden lg:block h-[calc(100vh-64px)]">
                <MainLayout
                    leftPanel={
                        <ScrollArea className="h-full">
                            <div className="p-6">
                                <InputPanel
                                    onAnalyze={handleAnalyze}
                                    isLoading={isLoading}
                                    defaultValues={inputs || undefined}
                                    isReadOnly={!isOwner}
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
                                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{t("status.analysisCompleted")}</p>
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
                                                <h3 className="font-bold mb-2">{t("errors.system")}</h3>
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
            </div>
        </>
    );
}
