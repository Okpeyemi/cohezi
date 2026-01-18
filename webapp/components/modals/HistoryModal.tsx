"use client";

import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase/config";
import { collection, query, where, getDocs, deleteDoc, doc, orderBy } from "firebase/firestore";
import { Search, Trash2, Clock, CalendarDays, ArrowRight, Loader2, AlertCircle, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { ConfirmationModal } from "./ConfirmationModal";

interface HistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Decision {
    id: string;
    context: string;
    reasoning: string;
    createdAt: any;
    status: string;
}

export function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
    const { user } = useAuth();
    const router = useRouter();
    const [decisions, setDecisions] = useState<Decision[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmData, setConfirmData] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null });

    useEffect(() => {
        if (isOpen && user) {
            fetchDecisions();
        }
    }, [isOpen, user]);

    const fetchDecisions = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const q = query(
                collection(db, "decisions"),
                where("userId", "==", user.uid),
                orderBy("createdAt", "desc")
            );
            // NOTE: If you see a "requires an index" error, create it here:
            // https://console.firebase.google.com/v1/r/project/handy-geography-438515-u5/firestore/indexes?create_composite=Cltwcm9qZWN0cy9oYW5keS1nZW9ncmFwaHktNDM4NTE1LXU1L2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9kZWNpc2lvbnMvaW5kZXhlcy9fEAEaCgoGdXNlcklkEAEaDQoJY3JlYXRlZEF0EAIaDAoIX19uYW1lX18QAg
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Decision));
            setDecisions(data);
        } catch (error) {
            console.error("Error fetching decisions:", error);
            toast.error("Erreur lors du chargement de l'historique.");
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!confirmData.id) return;

        setDeletingId(confirmData.id);
        try {
            await deleteDoc(doc(db, "decisions", confirmData.id));
            setDecisions(prev => prev.filter(d => d.id !== confirmData.id));
            toast.success("Décision supprimée avec succès.");
        } catch (error) {
            console.error("Error deleting decision:", error);
            toast.error("Impossible de supprimer la décision.");
        } finally {
            setDeletingId(null);
            setConfirmData({ isOpen: false, id: null });
        }
    };

    const handleShare = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        const url = `${window.location.origin}/decision/${id}`;
        navigator.clipboard.writeText(url)
            .then(() => toast.success("Lien copié dans le presse-papier !"))
            .catch(() => toast.error("Erreur lors de la copie du lien."));
    };

    const handleDeleteClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setConfirmData({ isOpen: true, id });
    };

    const handleNavigate = (id: string) => {
        onClose();
        router.push(`/decision/${id}`);
    };

    const filteredDecisions = decisions.filter(decision =>
        decision.context.toLowerCase().includes(searchTerm.toLowerCase()) ||
        decision.reasoning?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose} modal={false}>
            <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col p-0 gap-0 bg-zinc-950 border-white/10 text-zinc-100 overflow-hidden">
                <div className="p-6 border-b border-white/10 shrink-0">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-emerald-500" />
                            Historique des Décisions
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Retrouvez vos analyses passées et relancez-les si besoin.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            placeholder="Rechercher une décision..."
                            className="bg-zinc-900/50 border-white/10 pl-9 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-emerald-500/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <ScrollArea className="flex-1 p-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
                            <Loader2 className="h-8 w-8 animate-spin mb-3 text-emerald-500" />
                            <p>Chargement de l'historique...</p>
                        </div>
                    ) : filteredDecisions.length > 0 ? (
                        <div className="space-y-3">
                            {filteredDecisions.map((decision) => (
                                <div
                                    key={decision.id}
                                    onClick={() => handleNavigate(decision.id)}
                                    className="group relative flex flex-col gap-2 p-4 rounded-xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/80 hover:border-emerald-500/30 transition-all cursor-pointer overflow-hidden"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <h4 className="font-semibold text-zinc-200 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                                            {decision.context || "Sans titre"}
                                        </h4>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 border border-white/5">
                                                {decision.status === 'completed' ? 'Complété' : 'En cours'}
                                            </span>
                                        </div>
                                    </div>

                                    {decision.reasoning && (
                                        <p className="text-sm text-zinc-500 line-clamp-2 pr-8">
                                            {decision.reasoning}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                                        <div className="flex items-center gap-2 text-xs text-zinc-600 group-hover:text-zinc-500">
                                            <CalendarDays size={12} />
                                            {decision.createdAt?.seconds
                                                ? format(new Date(decision.createdAt.seconds * 1000), "d MMMM yyyy 'à' HH:mm", { locale: fr })
                                                : "Date inconnue"}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-7 w-7 text-zinc-600 hover:text-indigo-400 hover:bg-indigo-500/10 z-10"
                                                onClick={(e) => handleShare(e, decision.id)}
                                                title="Partager"
                                            >
                                                <Share2 size={14} />
                                            </Button>

                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-7 w-7 text-zinc-600 hover:text-rose-500 hover:bg-rose-500/10 z-10"
                                                onClick={(e) => handleDeleteClick(e, decision.id)}
                                                disabled={deletingId === decision.id}
                                            >
                                                {deletingId === decision.id ? (
                                                    <Loader2 className="h-3 w-3 animate-spin" />
                                                ) : (
                                                    <Trash2 size={14} />
                                                )}
                                            </Button>
                                            <div className="bg-emerald-500/10 p-1.5 rounded-md text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-zinc-500 text-center">
                            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mb-4 border border-zinc-800">
                                <AlertCircle className="h-6 w-6 opacity-50" />
                            </div>
                            <p className="font-medium">Aucune décision trouvée.</p>
                            <p className="text-sm mt-1 opacity-60">Commencez une nouvelle analyse pour remplir votre historique.</p>
                        </div>
                    )}
                </ScrollArea>

                <div className="p-4 border-t border-white/10 shrink-0 bg-zinc-950/50 backdrop-blur flex justify-between items-center">
                    <p className="text-xs text-zinc-600">
                        {filteredDecisions.length} décision{filteredDecisions.length !== 1 && 's'} archivée{filteredDecisions.length !== 1 && 's'}
                    </p>
                    <Button variant="ghost" onClick={onClose} className="h-8 text-xs hover:bg-white/5 text-zinc-400 hover:text-white">
                        Fermer l'historique
                    </Button>
                </div>
            </DialogContent>

            <ConfirmationModal
                isOpen={confirmData.isOpen}
                onClose={() => setConfirmData({ isOpen: false, id: null })}
                onConfirm={confirmDelete}
                title="Supprimer la décision ?"
                description="Cette action est irréversible. Toutes les données d'analyse associées seront perdues."
                confirmText="Supprimer définitivement"
                variant="destructive"
                loading={!!deletingId}
            />
        </Dialog>
    );
}
