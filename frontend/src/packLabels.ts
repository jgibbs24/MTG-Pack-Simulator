export type BoosterType = 'play' | 'collector';

export type BoosterOption = {
  label: string;
  msrpUsd: number;
  value: BoosterType;
};

export const BOOSTER_OPTIONS: BoosterOption[] = [
  {
    label: 'Play Booster',
    msrpUsd: 5.99,
    value: 'play',
  },
  {
    label: 'Collector Booster',
    msrpUsd: 24.99,
    value: 'collector',
  },
];

export function formatPackType(packType: string | undefined): string {
  if (packType === 'play-booster-barebones') {
    return 'Play Booster';
  }

  return packType ?? 'Play Booster';
}

export function getBoosterOption(boosterType: BoosterType): BoosterOption {
  return BOOSTER_OPTIONS.find((option) => option.value === boosterType) ?? BOOSTER_OPTIONS[0];
}
