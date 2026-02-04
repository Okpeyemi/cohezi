"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfileModal } from "@/components/modals/UserProfileModal";
import { HistoryModal } from "@/components/modals/HistoryModal";
import { FeedbackModal } from "@/components/modals/FeedbackModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BrainCircuit, LogOut, Settings, User, LogIn, Loader2, History, Share2, Users, Plus, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { signInWithGoogle, logOut } from "@/lib/firebase/auth";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

import { useTranslations } from "next-intl";

export function Header() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const decisionId = params?.id as string;
    const t = useTranslations("Header");

    const [isProfileOpen, setIsProfileOpen] = React.useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = React.useState(false);
    const [isShared, setIsShared] = React.useState(false);

    // ... (keep useEffect and handlers same)
    const showShare = decisionId && decisionId !== "new";

    React.useEffect(() => {
        const checkOwnership = async () => {
            if (!user || !decisionId || decisionId === "new") {
                setIsShared(false);
                return;
            }

            try {
                const docRef = doc(db, "decisions", decisionId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.userId !== user.uid) {
                        setIsShared(true);
                    } else {
                        setIsShared(false);
                    }
                }
            } catch (error) {
                console.error("Error verifying ownership:", error);
            }
        };

        checkOwnership();
    }, [decisionId, user]);

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => toast.success("Lien copié dans le presse-papier !"))
            .catch(() => toast.error("Erreur lors de la copie du lien."));
    };

    const handleSignOut = async () => {
        await logOut();
        router.push("/");
    };

    const handleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <header className="fixed top-0 left-0 right-0 h-16 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl z-50 flex items-center justify-between px-6">
                {/* Logo / Brand */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <BrainCircuit className="text-emerald-500" size={18} />
                        </div>
                        <h1 className="text-lg font-bold tracking-tight text-white mb-0.5">
                            Cohezi <span className="text-zinc-600 font-medium text-xs ml-2">v1.0</span>
                        </h1>
                    </div>

                    {isShared && (
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium animate-in fade-in slide-in-from-left-4 duration-500">
                            <Users size={12} />
                            <span>{t("sharedDiscussion")}</span>
                        </div>
                    )}
                </div>

                {/* Profile Menu or Sign In */}
                <div className="flex items-center gap-4">
                    {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
                    ) : user ? (
                        <div className="flex items-center gap-3">
                            <LanguageSwitcher />

                            <button
                                className="hidden md:flex w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all"
                                title={t("history")}
                                onClick={() => setIsHistoryOpen(true)}
                            >
                                <History size={16} />
                            </button>

                            <button
                                className="hidden md:flex items-center gap-2 px-3 h-8 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all"
                                title={t("feedback")}
                                onClick={() => setIsFeedbackOpen(true)}
                            >
                                <MessageSquare size={16} />
                                <span className="text-xs font-medium">{t("feedback")}</span>
                            </button>

                            {/* Share Button */}
                            {showShare && (
                                <button
                                    onClick={handleShare}
                                    className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all"
                                    title="Partager la discussion"
                                >
                                    <Share2 size={16} />
                                </button>
                            )}

                            <button
                                className="flex items-center gap-2 px-2 h-8 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all"
                                title={t("newDecision")}
                                onClick={() => router.push("/decision/new")}
                            >
                                <Plus size={16} />
                                <span className="text-xs font-medium hidden sm:inline">{t("newDecision")}</span>
                            </button>

                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger className="outline-none">
                                    <Avatar className="h-8 w-8 ring-2 ring-white/10 hover:ring-white/20 transition-all cursor-pointer">
                                        <AvatarImage src={user.photoURL || ""} />
                                        <AvatarFallback>{user.displayName?.slice(0, 2).toUpperCase() || "ME"}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border-white/10 text-zinc-200">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.displayName}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem
                                        className="focus:bg-zinc-900 focus:text-white cursor-pointer group"
                                        onClick={() => router.push("/decision/new")}
                                    >
                                        <Plus className="mr-2 h-4 w-4 text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                                        <span>{t("newDecision")}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="focus:bg-zinc-900 focus:text-white cursor-pointer group"
                                        onClick={() => setIsHistoryOpen(true)}
                                    >
                                        <History className="mr-2 h-4 w-4 text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                                        <span>{t("history")}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="focus:bg-zinc-900 focus:text-white cursor-pointer group"
                                        onClick={() => setIsFeedbackOpen(true)}
                                    >
                                        <MessageSquare className="mr-2 h-4 w-4 text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                                        <span>{t("feedback")}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem
                                        className="focus:bg-zinc-900 focus:text-white cursor-pointer group"
                                        onClick={() => setIsProfileOpen(true)}
                                    >
                                        <User className="mr-2 h-4 w-4 text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                                        <span>{t("profile")}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white cursor-pointer group">
                                        <Settings className="mr-2 h-4 w-4 text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                                        <span>{t("settings")}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem
                                        className="focus:bg-zinc-900 focus:text-white cursor-pointer group text-rose-500 focus:text-rose-500"
                                        onClick={handleSignOut}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>{t("signOut")}</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <LanguageSwitcher />
                            <button
                                onClick={handleSignIn}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-200 transition-colors"
                            >
                                <LogIn size={14} />
                                {t("signIn")}
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
            <HistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
            <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
        </>
    );
}
