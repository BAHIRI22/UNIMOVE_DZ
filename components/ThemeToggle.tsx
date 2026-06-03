'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';

export function ThemeToggle() {
  const { mode, toggle } = useTheme();

  const icon = mode === 'dark' ? <Moon className="w-4 h-4" /> : mode === 'light' ? <Sun className="w-4 h-4" /> : <Monitor className="w-4 h-4" />;
  const label = mode === 'dark' ? 'Dark' : mode === 'light' ? 'Light' : 'System';

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-sm font-semibold text-slate-700 dark:text-slate-200"
      aria-label={`Theme: ${label}`}
      title={`Theme: ${label}`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
