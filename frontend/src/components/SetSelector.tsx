import type { SupportedSetDto } from '../types/pack';

type SetSelectorProps = {
  sets: SupportedSetDto[];
  selectedSetCode: string;
  isLoading: boolean;
  onSelectedSetChange: (setCode: string) => void;
};

export function SetSelector({ sets, selectedSetCode, isLoading, onSelectedSetChange }: SetSelectorProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-stone-300">
      <span className="font-semibold uppercase tracking-[0.18em] text-ember">Set</span>
      <select
        className="rounded-md border border-white/10 bg-stone-950 px-3 py-3 font-semibold text-white outline-none transition focus:border-ember disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoading || sets.length === 0}
        onChange={(event) => onSelectedSetChange(event.target.value)}
        value={selectedSetCode}
      >
        {sets.map((set) => (
          <option key={set.setCode} value={set.setCode}>
            {set.setName}
          </option>
        ))}
      </select>
    </label>
  );
}
