"use client";

import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { AnalysisPDF } from './AnalysisPDF';
import { FinalVerdict } from '@/types/analysis';
import { FileDown, Loader2 } from 'lucide-react';

interface DownloadReportButtonProps {
    decision: string;
    reasoning: string;
    verdict: FinalVerdict;
    className?: string;
}

export function DownloadReportButton({ decision, reasoning, verdict, className }: DownloadReportButtonProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <PDFDownloadLink
            document={<AnalysisPDF decision={decision} reasoning={reasoning} verdict={verdict} />}
            fileName={`cohezi_report_${new Date().toISOString().split('T')[0]}.pdf`}
            className={className}
        >
            {({ blob, url, loading, error }) => (
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${loading ? "bg-zinc-800 text-zinc-500 cursor-wait" : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 cursor-pointer border border-emerald-500/20"
                    }`}>
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={16} />
                            <span className="text-xs font-semibold">Génération...</span>
                        </>
                    ) : (
                        <>
                            <FileDown size={16} />
                            <span className="text-xs font-semibold">Exporter PDF</span>
                        </>
                    )}
                </div>
            )}
        </PDFDownloadLink>
    );
}
