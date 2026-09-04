'use client';

import { useEffect } from 'react';

export const HERO_LIGHT_CLASS = 'hero-light';
/** Défilement (px) au-delà duquel la zone sombre du haut passe en clair, comme sur le site d'origine. */
export const HERO_LIGHT_THRESHOLD = 130;
const DESKTOP_QUERY = '(min-width: 768px)';

/**
 * Sans rendu : pose `hero-light` sur <body> quand la page est défilée au-delà du seuil,
 * uniquement à partir de 768 px (sur mobile le hero reste sombre). Les règles CSS de
 * `globals.css` (.page-dark, .hero-dark-change, .site-header) font la transition.
 */
export function HeroLightSwitch() {
  useEffect(() => {
    const media = typeof window.matchMedia === 'function' ? window.matchMedia(DESKTOP_QUERY) : null;
    const update = () => {
      const light = (media?.matches ?? true) && window.scrollY > HERO_LIGHT_THRESHOLD;
      document.body.classList.toggle(HERO_LIGHT_CLASS, light);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    media?.addEventListener('change', update);
    return () => {
      window.removeEventListener('scroll', update);
      media?.removeEventListener('change', update);
      document.body.classList.remove(HERO_LIGHT_CLASS);
    };
  }, []);
  return null;
}
