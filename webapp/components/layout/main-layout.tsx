"use client";

import React from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

interface MainLayoutProps {
    leftPanel: React.ReactNode;
    centerPanel: React.ReactNode;
    rightPanel: React.ReactNode;
}

export function MainLayout({ leftPanel, centerPanel, rightPanel }: MainLayoutProps) {
    return (
        <div className="h-[calc(100vh-4rem)] w-full bg-zinc-950 text-zinc-100 overflow-hidden">
            <ResizablePanelGroup direction="horizontal" className="h-full w-full">
                {/* Panneau Gauche : L'Intention */}
                <ResizablePanel defaultSize={25} minSize={20} className="bg-zinc-900/50 border-r border-zinc-800">
                    <div className="h-full">
                        {leftPanel}
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle className="bg-zinc-800" />

                {/* Panneau Central : L'Arène */}
                <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full">
                        {centerPanel}
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle className="bg-zinc-800" />

                {/* Panneau Droit : Le Verdict */}
                <ResizablePanel defaultSize={25} minSize={20} className="bg-zinc-900/50 border-l border-zinc-800">
                    <div className="h-full">
                        {rightPanel}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
