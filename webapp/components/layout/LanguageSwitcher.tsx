"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Languages } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none">
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all">
                    <Languages size={16} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-950 border-white/10 text-zinc-200">
                <DropdownMenuItem
                    className={`cursor-pointer focus:bg-zinc-900  ${locale === 'fr' ? 'text-emerald-500 focus:text-emerald-500' : ''}`}
                    onClick={() => switchLocale('fr')}
                >
                    Français
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={`cursor-pointer focus:bg-zinc-900  ${locale === 'en' ? 'text-emerald-500 focus:text-emerald-500' : ''}`}
                    onClick={() => switchLocale('en')}
                >
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
