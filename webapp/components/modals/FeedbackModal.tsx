"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
    const { user } = useAuth();
    const t = useTranslations("FeedbackModal");
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!feedback.trim()) return;

        setLoading(true);
        try {
            const response = await fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    feedback,
                    user: {
                        displayName: user?.displayName,
                        email: user?.email,
                    },
                }),
            });

            if (response.ok) {
                toast.success(t("success"), { // Ensure success key is added to translations or use safe fallback
                    description: t("successDescription")
                });
                setFeedback("");
                onClose();
            } else {
                throw new Error("Failed to send feedback");
            }
        } catch (error) {
            console.error("Feedback error:", error);
            toast.error(t("error"), {
                description: t("errorDescription")
            });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose} modal={false}>
            <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-white/10 text-zinc-100">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-emerald-500" />
                        {t("title")}
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        {t("description")}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <Textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder={t("placeholder")}
                        disabled={loading}
                        className="min-h-[150px] bg-zinc-900/50 border-white/10 text-zinc-200 resize-none focus:ring-emerald-500/20 focus:border-emerald-500/50 disabled:opacity-50"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                        className="border-white/10 hover:bg-zinc-900 hover:text-white bg-transparent text-zinc-400"
                    >
                        {t("cancel")}
                    </Button>
                    <Button
                        onClick={handleSend}
                        disabled={!feedback.trim() || loading}
                        className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-medium"
                    >
                        {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="mr-2 h-4 w-4" />
                        )}
                        {loading ? t("sending") : t("send")}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
