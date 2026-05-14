import { afterEach, describe, expect, it, vi } from 'vitest';

async function loadApiUrl() {
  vi.resetModules();
  return import('./apiUrl');
}

describe('apiUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('keeps local proxy paths when no deployed API base URL is configured', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '');
    const { apiUrl } = await loadApiUrl();

    expect(apiUrl('/api/sets')).toBe('/api/sets');
  });

  it('prefixes API paths with the deployed backend URL', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://mtg-pack-api.example.com/');
    const { apiUrl } = await loadApiUrl();

    expect(apiUrl('/api/packs/blb/open?boosterType=collector'))
      .toBe('https://mtg-pack-api.example.com/api/packs/blb/open?boosterType=collector');
  });

  it('normalizes paths that do not start with a slash', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://mtg-pack-api.example.com');
    const { apiUrl } = await loadApiUrl();

    expect(apiUrl('api/sets')).toBe('https://mtg-pack-api.example.com/api/sets');
  });
});
