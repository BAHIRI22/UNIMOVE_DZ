export const CORRECT_PASSCODE = 'UNIMOVE2026';

export const PROTECTED_PATHS = [
  '/presentation',
  '/financial-plan',
  '/investors',
  '/startup',
  '/business-model',
  '/about-project',
  '/demo',
];

export function getUnlockKey(path: string): string {
  const normalized = path.replace(/^\/+/, '').replace(/\//g, '_') || 'home';
  return `unlock_${normalized}`;
}

export function isProtectedPath(href: string): boolean {
  return PROTECTED_PATHS.some((path) => href === path || href.startsWith(path + '/'));
}
