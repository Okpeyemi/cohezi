"use client";

import React from "react";
import { X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all duration-300"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-1"
                    >
                        <div className="bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X size={18} />
                            </button>

                            <div className="p-8 flex flex-col items-center text-center space-y-6">
                                <div className="p-4 bg-emerald-500/10 rounded-full mb-2">
                                    <LogIn className="text-emerald-500" size={32} />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">
                                        Connexion Requise
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        Pour accéder au moteur d'analyse et sauvegarder vos décisions, vous devez vous identifier.
                                    </p>
                                </div>

                                <Button
                                    onClick={handleGoogleSignIn}
                                    className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-zinc-200 h-12 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                                >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                                        <path
                                            fill="currentColor"
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                        />
                                    </svg>
                                    Continuer avec Google
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
