"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Trash2 } from "lucide-react";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
    loading?: boolean;
}

export function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirmer",
    cancelText = "Annuler",
    variant = "default",
    loading = false
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose} modal={false}>
            <DialogContent className="bg-zinc-950 border-white/10 text-zinc-100 sm:max-w-[425px]">
                <DialogHeader className="sm:text-left">
                    <div className="flex items-center gap-3 mb-2">
                        {variant === "destructive" ? (
                            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20">
                                <Trash2 size={18} />
                            </div>
                        ) : (
                            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 border border-white/10">
                                <AlertCircle size={18} />
                            </div>
                        )}
                        <DialogTitle>{title}</DialogTitle>
                    </div>
                    <DialogDescription className="text-zinc-400">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4 flex flex-row justify-end space-x-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="bg-transparent border-white/10 hover:bg-zinc-900 text-zinc-300 hover:text-white"
                        disabled={loading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        className={`
                            ${variant === 'destructive'
                                ? 'bg-rose-500 hover:bg-rose-600 text-white hover:text-white'
                                : 'bg-emerald-500 hover:bg-emerald-600 text-white'}
                        `}
                        disabled={loading}
                    >
                        {loading ? "Traitement..." : confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
