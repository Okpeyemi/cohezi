"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { logOut } from "@/lib/firebase/auth";
import { LogOut, User, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
    const { user } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        await logOut();
        onClose();
        router.push("/");
    };

    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose} modal={false}>
            <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-white/10 text-zinc-100">
                <DialogHeader>
                    <DialogTitle>Profil Utilisateur</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Gérez vos informations personnelles et vos préférences.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-6 py-6">
                    <div className="relative">
                        <Avatar className="h-24 w-24 ring-4 ring-white/5">
                            <AvatarImage src={user.photoURL || ""} />
                            <AvatarFallback className="text-2xl bg-zinc-900 border border-white/10">
                                {user.displayName?.slice(0, 2).toUpperCase() || "ME"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1.5 ring-4 ring-zinc-950">
                            <ShieldCheck size={16} className="text-zinc-950 fill-current" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center text-center gap-1">
                        <h3 className="text-xl font-bold tracking-tight text-white">{user.displayName}</h3>
                        <p className="text-sm text-zinc-500 font-medium">{user.email}</p>
                    </div>

                    <div className="w-full space-y-3 mt-2">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-white/5">
                            <div className="p-2 rounded-md bg-zinc-800 text-zinc-400">
                                <User size={16} />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-xs text-zinc-500 font-medium">Nom d'affichage</p>
                                <p className="text-sm truncate text-zinc-200">{user.displayName}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-white/5">
                            <div className="p-2 rounded-md bg-zinc-800 text-zinc-400">
                                <Mail size={16} />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-xs text-zinc-500 font-medium">Adresse Email</p>
                                <p className="text-sm truncate text-zinc-200">{user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline" onClick={onClose} className="border-white/10 hover:bg-zinc-900 hover:text-white bg-transparent">
                        Fermer
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleSignOut}
                        className="bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 hover:text-rose-400 border border-rose-500/20"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Se déconnecter
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
