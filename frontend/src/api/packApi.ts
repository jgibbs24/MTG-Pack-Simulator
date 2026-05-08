import type { OpenedPackDto, SupportedSetDto } from '../types/pack';

export async function fetchSupportedSets(): Promise<SupportedSetDto[]> {
  const response = await fetch('/api/sets', {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Unable to load supported sets with status ${response.status}`);
  }

  return response.json();
}

export async function openPack(setCode: string): Promise<OpenedPackDto> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`/api/packs/${setCode}/open`, {
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const message = typeof errorBody?.message === 'string'
        ? errorBody.message
        : `Pack opening failed with status ${response.status}`;

      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Opening this pack took too long. Please try again.');
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
