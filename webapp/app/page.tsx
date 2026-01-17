"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { LoginModal } from "@/components/auth/LoginModal";

export default function LandingPage() {
    const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const handleStart = () => {
        if (user) {
            router.push("/decision/new");
        } else {
            setIsLoginModalOpen(true);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-zinc-950 text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-8 p-6">
                <div className="space-y-4">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter gradient-text">
                        Cohezi
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 font-light tracking-wide max-w-2xl">
                        Le Moteur d'Évaluation Cognitive pour vos Décisions Stratégiques
                    </p>
                </div>

                <button
                    onClick={handleStart}
                    className="group flex items-center gap-3 px-8 py-4 bg-white text-zinc-950 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)]"
                >
                    Tester le Moteur
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="absolute bottom-10 text-zinc-600 text-xs uppercase tracking-widest">
                Version Bêta 0.1
            </div>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onSuccess={() => router.push("/decision/new")}
            />
        </div>
    );
}