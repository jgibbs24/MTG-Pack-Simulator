import { useEffect, useMemo, useState } from 'react';
import { fetchSupportedSets, openPack } from '../api/packApi';
import type { CardDto, OpenedPackDto, SessionStats, SupportedSetDto } from '../types/pack';
import { CardGrid } from './CardGrid';
import { PackSummary } from './PackSummary';
import { SessionStatsPanel } from './SessionStatsPanel';
import { SetSelector } from './SetSelector';

const DEFAULT_SET_CODE = 'blb';
const PACK_MSRP_USD = 5.99;

const initialSessionStats: SessionStats = {
  packsOpened: 0,
  totalEstimatedValue: 0,
  totalSpent: 0,
  netProfitLoss: 0,
  averagePackValue: 0,
  bestCard: null,
  bestPackValue: 0,
  mythicsPulled: 0,
};

export function PackOpener() {
  const [sets, setSets] = useState<SupportedSetDto[]>([]);
  const [selectedSetCode, setSelectedSetCode] = useState(DEFAULT_SET_CODE);
  const [pack, setPack] = useState<OpenedPackDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSets, setIsLoadingSets] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionStats, setSessionStats] = useState<SessionStats>(initialSessionStats);

  useEffect(() => {
    let ignore = false;

    async function loadSets() {
      try {
        const supportedSets = await fetchSupportedSets();
        if (ignore) {
          return;
        }

        setSets(supportedSets);
        if (supportedSets.length > 0 && !supportedSets.some((set) => set.setCode === DEFAULT_SET_CODE)) {
          setSelectedSetCode(supportedSets[0].setCode);
        }
      } catch (caughtError) {
        const message = caughtError instanceof Error ? caughtError.message : 'Unable to load supported sets.';
        setError(message);
      } finally {
        if (!ignore) {
          setIsLoadingSets(false);
        }
      }
    }

    loadSets();

    return () => {
      ignore = true;
    };
  }, []);

  const selectedSet = useMemo(
    () => sets.find((set) => set.setCode === selectedSetCode),
    [selectedSetCode, sets],
  );

  async function handleOpenPack() {
    setIsLoading(true);
    setError(null);

    try {
      const openedPack = await openPack(selectedSetCode);
      setPack(openedPack);
      setSessionStats((currentStats) => updateSessionStats(currentStats, openedPack));
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'Unable to open pack.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid flex-1 gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <div className="min-w-0">
        <div className="mb-6 flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <div className="grid gap-4 sm:grid-cols-[minmax(12rem,18rem)_minmax(0,1fr)] sm:items-end">
            <SetSelector
              isLoading={isLoading || isLoadingSets}
              onSelectedSetChange={setSelectedSetCode}
              selectedSetCode={selectedSetCode}
              sets={sets}
            />
            <div>
              <h2 className="text-xl font-semibold text-white">{selectedSet?.setName ?? 'Stage 2 pack opener'}</h2>
              <p className="mt-1 text-sm text-stone-300">
                {selectedSet?.packType ?? 'Loading supported sets...'}
              </p>
            </div>
          </div>
          <button
            className="rounded-md bg-ember px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-stone-950 transition hover:-translate-y-0.5 hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            disabled={isLoading || isLoadingSets}
            onClick={handleOpenPack}
            type="button"
          >
            {isLoading ? 'Opening...' : `Open ${selectedSetCode.toUpperCase()} Pack`}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        {pack ? (
          <CardGrid cards={pack.cards} />
        ) : (
          <div className="flex min-h-[28rem] items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.03] px-6 text-center text-stone-400">
            Your opened Bloomburrow cards will appear here.
          </div>
        )}
      </div>

      <div className="space-y-5">
        <PackSummary pack={pack} isLoading={isLoading} selectedSetCode={selectedSetCode} />
        <SessionStatsPanel stats={sessionStats} />
      </div>
    </div>
  );
}

function updateSessionStats(currentStats: SessionStats, pack: OpenedPackDto): SessionStats {
  const packsOpened = currentStats.packsOpened + 1;
  const totalEstimatedValue = currentStats.totalEstimatedValue + pack.totalValueUsd;
  const totalSpent = packsOpened * PACK_MSRP_USD;
  const netProfitLoss = totalEstimatedValue - totalSpent;
  const mythicsPulled = currentStats.mythicsPulled
    + pack.cards.filter((card) => card.rarity === 'mythic').length;
  const bestCardInPack = findBestCard(pack.cards);
  const bestCardOverall = bestCardInPack && (!currentStats.bestCard || bestCardInPack.priceUsd > currentStats.bestCard.priceUsd)
    ? bestCardInPack
    : currentStats.bestCard;

  return {
    packsOpened,
    totalEstimatedValue,
    totalSpent,
    netProfitLoss,
    averagePackValue: totalEstimatedValue / packsOpened,
    bestCard: bestCardOverall,
    bestPackValue: Math.max(currentStats.bestPackValue, pack.totalValueUsd),
    mythicsPulled,
  };
}

function findBestCard(cards: CardDto[]): CardDto | null {
  return cards.reduce<CardDto | null>((best, card) => {
    if (!best || card.priceUsd > best.priceUsd) {
      return card;
    }
    return best;
  }, null);
}
