import type { CSSProperties } from 'react';
import { formatPackType } from '../packLabels';
import type { SupportedSetDto } from '../types/pack';
import type { SetTheme } from '../setThemes';

type PackWrapperProps = {
  packTypeLabel?: string;
  set: SupportedSetDto | undefined;
  theme: SetTheme;
  size?: 'compact' | 'large';
};

export function PackWrapper({ packTypeLabel, set, theme, size = 'large' }: PackWrapperProps) {
  const wrapperStyle = {
    '--wrapper-accent': theme.accent,
    '--wrapper-background': theme.background,
    '--wrapper-primary': theme.primary,
    '--wrapper-secondary': theme.secondary,
    '--wrapper-text': theme.text,
  } as CSSProperties;

  const sizeClass = size === 'compact'
    ? 'h-40 w-28 rounded-lg p-3'
    : 'h-[25rem] w-[17.5rem] rounded-xl p-5';

  return (
    <div
      aria-hidden="true"
      className={`relative isolate overflow-hidden border border-white/15 shadow-card ${sizeClass}`}
      style={{
        ...wrapperStyle,
        background:
          'linear-gradient(145deg, var(--wrapper-primary), var(--wrapper-secondary) 58%, var(--wrapper-background))',
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.22)_20%,transparent_34%,transparent_62%,rgba(0,0,0,0.3)_100%)]" />
      <div
        className="absolute inset-x-0 top-0 h-24"
        style={{
          background:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.18) 0 8px, transparent 8px 18px)',
        }}
      />
      <div className="absolute -left-10 bottom-8 h-28 w-52 rotate-[-18deg] bg-black/25" />
      <div
        className="absolute bottom-0 right-0 h-28 w-28"
        style={{
          background:
            'linear-gradient(135deg, transparent 0%, transparent 45%, var(--wrapper-accent) 46%, var(--wrapper-accent) 100%)',
        }}
      />

      <div className="relative flex h-full flex-col justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: 'var(--wrapper-accent)' }}>
            {set?.setCode ?? 'MTG'}
          </p>
          <h3
            className={`${size === 'compact' ? 'mt-2 text-lg leading-5' : 'mt-3 text-3xl leading-8'} font-black`}
            style={{ color: 'var(--wrapper-text)' }}
          >
            {size === 'compact' ? set?.setCode.toUpperCase() ?? 'MTG' : set?.setName ?? 'Magic Pack'}
          </h3>
        </div>

        <div>
          <div className="mb-3 h-px bg-white/35" />
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
            {theme.flavor}
          </p>
          {size === 'large' && (
            <p className="mt-2 text-sm font-semibold text-white/70">
              {packTypeLabel ?? formatPackType(set?.packType)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
