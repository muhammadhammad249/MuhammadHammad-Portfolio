import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'crimson';
    const saved = localStorage.getItem('portfolio_theme_v2');
    if (saved === 'light' || saved === 'dark' || saved === 'crimson') return saved;
    return 'crimson';
  });

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-crimson');
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('portfolio_theme_v2', theme);
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  // Transition helper for View Transitions API
  const switchThemeWithTransition = useCallback((nextTheme, event) => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || isReducedMotion) {
      setThemeState(nextTheme);
      return;
    }

    // Get click origin for circular reveal
    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setThemeState(nextTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 480,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  }, []);

  // Smooth circular-reveal cycle: crimson -> dark -> light -> crimson
  const toggleTheme = useCallback((event) => {
    const cycle = {
      crimson: 'dark',
      dark: 'light',
      light: 'crimson',
    };
    const nextTheme = cycle[theme] || 'crimson';
    switchThemeWithTransition(nextTheme, event);
  }, [theme, switchThemeWithTransition]);

  const setTheme = useCallback((newTheme, event) => {
    switchThemeWithTransition(newTheme, event);
  }, [switchThemeWithTransition]);

  return {
    theme,
    isDark: theme !== 'light',
    isCrimson: theme === 'crimson',
    toggleTheme,
    setTheme
  };
}

