/**
 * Path helper for GitHub Pages subpath deployment support.
 * Works seamlessly whether base is empty ('/') or set to a subpath (e.g. '/docuverse/').
 */

export function getAssetPath(path: string = '/'): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  if (!path || path === '/') {
    return base ? `${base}/` : '/';
  }
  // If already prefixed with base, return as-is
  if (base && path.startsWith(base)) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
