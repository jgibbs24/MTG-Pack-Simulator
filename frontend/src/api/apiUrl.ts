const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export function apiUrl(path: string): string {
  if (!API_BASE_URL) {
    // Local development relies on Vite's /api proxy, so relative paths should stay relative.
    return path;
  }

  const normalizedBaseUrl = API_BASE_URL.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBaseUrl}${normalizedPath}`;
}
