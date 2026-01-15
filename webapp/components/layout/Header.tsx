"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BrainCircuit, LogOut, Settings, User } from "lucide-react";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl z-50 flex items-center justify-between px-6">
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <BrainCircuit className="text-emerald-500" size={18} />
                </div>
                <h1 className="text-lg font-bold tracking-tight text-white mb-0.5">
                    Cohezi <span className="text-zinc-600 font-medium text-xs ml-2">v1.0</span>
                </h1>
            </div>

            {/* Profile Menu */}
            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <Avatar className="h-8 w-8 ring-2 ring-white/10 hover:ring-white/20 transition-all cursor-pointer">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border-white/10 text-zinc-200">
                        <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white cursor-pointer group">
                            <User className="mr-2 h-4 w-4 text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                            <span>Profil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white cursor-pointer group">
                            <Settings className="mr-2 h-4 w-4 text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                            <span>Paramètres</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white cursor-pointer group text-rose-500 focus:text-rose-500">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Se déconnecter</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
