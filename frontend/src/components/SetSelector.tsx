import type { SupportedSetDto } from '../types/pack';
import { BOOSTER_OPTIONS, type BoosterType, getBoosterOption } from '../packLabels';
import { getSetTheme } from '../setThemes';
import { PackWrapper } from './PackWrapper';

type SetSelectorProps = {
  boosterType: BoosterType;
  sets: SupportedSetDto[];
  selectedSetCode: string;
  isLoading: boolean;
  onContinue: () => void;
  onBoosterTypeChange: (boosterType: BoosterType) => void;
  onBack: () => void;
  onSelectedSetChange: (setCode: string) => void;
};

export function SetSelector({
  boosterType,
  sets,
  selectedSetCode,
  isLoading,
  onContinue,
  onBoosterTypeChange,
  onBack,
  onSelectedSetChange,
}: SetSelectorProps) {
  const selectedSet = sets.find((set) => set.setCode === selectedSetCode);
  const selectedBooster = getBoosterOption(boosterType);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-4">
          <button
            className="rounded-md border border-white/15 bg-white/[0.05] px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-stone-100 transition hover:border-white/35 hover:bg-white/10"
            onClick={onBack}
            type="button"
          >
            Back
          </button>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ember">Choose set</p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Pick your pack</h2>
          </div>
        </div>
        <button
          className="rounded-md bg-ember px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-stone-950 transition hover:-translate-y-0.5 hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          disabled={isLoading || !selectedSet}
          onClick={onContinue}
          type="button"
        >
          Continue
        </button>
      </div>

      {isLoading ? (
        <div className="flex min-h-[28rem] items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.03] px-6 text-center text-stone-400">
          Loading supported sets...
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sets.map((set) => {
            const theme = getSetTheme(set.setCode);
            const isSelected = set.setCode === selectedSetCode;

            return (
              <article
                className={`grid grid-cols-[7rem_minmax(0,1fr)] gap-4 rounded-lg border p-4 text-left shadow-card transition duration-200 hover:-translate-y-1 ${
                  isSelected
                    ? 'border-ember bg-white/[0.08]'
                    : 'border-white/10 bg-white/[0.035] hover:border-white/25'
                }`}
                key={set.setCode}
              >
                <button
                  aria-label={`Choose ${set.setName}`}
                  className="text-left focus:outline-none"
                  onClick={() => onSelectedSetChange(set.setCode)}
                  type="button"
                >
                  <PackWrapper set={set} theme={theme} size="compact" />
                </button>
                <div className="min-w-0 self-center">
                  <button
                    className="block w-full text-left focus:outline-none"
                    onClick={() => onSelectedSetChange(set.setCode)}
                    type="button"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: theme.accent }}
                      />
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-stone-400">
                        {set.setCode}
                      </span>
                    </div>
                    <h3 className="mt-2 line-clamp-2 text-xl font-bold leading-6 text-white">{set.setName}</h3>
                    <p className="mt-2 text-sm font-semibold text-stone-300">{theme.flavor}</p>
                  </button>
                </div>
                <dl className="col-span-2 grid grid-cols-[minmax(0,1fr)_5.5rem] gap-2 text-xs">
                  <div className="rounded-md bg-black/20 p-2">
                    <label className="block text-stone-500" htmlFor={`booster-type-${set.setCode}`}>
                      Pack
                    </label>
                    <select
                      className="mt-1 w-full rounded border border-white/10 bg-stone-950 px-2 py-1 font-semibold text-stone-200 outline-none transition focus:border-ember"
                      id={`booster-type-${set.setCode}`}
                      onChange={(event) => {
                        onSelectedSetChange(set.setCode);
                        onBoosterTypeChange(event.target.value as BoosterType);
                      }}
                      value={isSelected ? boosterType : selectedBooster.value}
                    >
                      {BOOSTER_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="rounded-md bg-black/20 p-2">
                    <dt className="text-stone-500">MSRP</dt>
                    <dd className="mt-2 font-semibold text-stone-200">${selectedBooster.msrpUsd.toFixed(2)}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
