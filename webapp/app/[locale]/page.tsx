"use client";

import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation"; // TODO: Migrate to i18n/routing if using localized router, but for push we might need usePathname/useRouter from next-intl/navigation
import { LoginModal } from "@/components/auth/LoginModal";
import { useTranslations } from "next-intl";

export default function LandingPage() {
    const t = useTranslations("LandingPage");

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
                        {t("subtitle")}
                    </p>
                </div>

                <React.Suspense fallback={<div>{t("loading")}</div>}>
                    <LandingPageContent />
                </React.Suspense>
            </div>

            <div className="absolute bottom-10 text-zinc-600 text-xs uppercase tracking-widest">
                {t("version")}
            </div>
        </div>
    );
}

function LandingPageContent() {
    const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
    const { user } = useAuth();
    // Using standard router for now, but should ideally use next-intl router for localized internal links
    const router = useRouter();
    const t = useTranslations("LandingPage");

    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect");

    useEffect(() => {
        if (redirectUrl && !user) {
            setIsLoginModalOpen(true);
        } else if (redirectUrl && user) {
            router.push(decodeURIComponent(redirectUrl));
        }
    }, [redirectUrl, user, router]);

    const handleStart = () => {
        if (user) {
            router.push("/decision/new");
        } else {
            setIsLoginModalOpen(true);
        }
    };

    const handleLoginSuccess = () => {
        if (redirectUrl) {
            router.push(decodeURIComponent(redirectUrl));
        } else {
            router.push("/decision/new");
        }
    };

    return (
        <>
            <button
                onClick={handleStart}
                className="group flex items-center gap-3 px-8 py-4 bg-white text-zinc-950 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)]"
            >
                {t("cta")}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onSuccess={handleLoginSuccess}
            />
        </>
    );
}