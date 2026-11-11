export const SITE_URL = 'https://repukeel.com';

/**
 * Returns an absolute canonical URL with consistent https://repukeel.com origin
 * and no trailing slashes.
 */
export function canonicalFor(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/' || cleanPath === '') {
    return SITE_URL;
  }
  return `${SITE_URL}${cleanPath.replace(/\/+$/, '')}`;
}
