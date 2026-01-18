"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfileModal } from "@/components/modals/UserProfileModal";
import { HistoryModal } from "@/components/modals/HistoryModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BrainCircuit, LogOut, Settings, User, LogIn, Loader2, History } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { signInWithGoogle, logOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export function Header() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [isProfileOpen, setIsProfileOpen] = React.useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);

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
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <BrainCircuit className="text-emerald-500" size={18} />
                    </div>
                    <h1 className="text-lg font-bold tracking-tight text-white mb-0.5">
                        Cohezi <span className="text-zinc-600 font-medium text-xs ml-2">v1.0</span>
                    </h1>
                </div>

                {/* Profile Menu or Sign In */}
                <div className="flex items-center gap-4">
                    {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
                    ) : user ? (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsHistoryOpen(true)}
                                className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all"
                                title="Historique"
                            >
                                <History size={16} />
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
                                        onClick={() => setIsProfileOpen(true)}
                                    >
                                        <User className="mr-2 h-4 w-4 text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                                        <span>Profil</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white cursor-pointer group">
                                        <Settings className="mr-2 h-4 w-4 text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                                        <span>Paramètres</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem
                                        className="focus:bg-zinc-900 focus:text-white cursor-pointer group text-rose-500 focus:text-rose-500"
                                        onClick={handleSignOut}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Se déconnecter</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <button
                            onClick={handleSignIn}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-200 transition-colors"
                        >
                            <LogIn size={14} />
                            Se connecter
                        </button>
                    )}
                </div>
            </header>

            <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
            <HistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
        </>
    );
}
