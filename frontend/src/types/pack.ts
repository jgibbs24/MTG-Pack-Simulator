export type CardDto = {
  id: string;
  name: string;
  rarity: string;
  imageUrl: string;
  priceUsd: number;
};

export type OpenedPackDto = {
  setCode: string;
  cards: CardDto[];
  totalValueUsd: number;
};

export type SupportedSetDto = {
  setCode: string;
  setName: string;
  packType: string;
};

export type SessionStats = {
  packsOpened: number;
  totalEstimatedValue: number;
  totalSpent: number;
  netProfitLoss: number;
  averagePackValue: number;
  bestCard: CardDto | null;
  bestPackValue: number;
  mythicsPulled: number;
};
