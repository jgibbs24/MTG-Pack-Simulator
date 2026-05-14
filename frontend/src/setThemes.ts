export type SetTheme = {
  accent: string;
  background: string;
  flavor: string;
  primary: string;
  secondary: string;
  text: string;
};

const defaultTheme: SetTheme = {
  accent: '#f4b860',
  background: '#13111c',
  flavor: 'Play Booster',
  primary: '#8b5cf6',
  secondary: '#3b2d57',
  text: '#f8fafc',
};

const setThemes: Record<string, SetTheme> = {
  blb: {
    accent: '#f4b860',
    background: '#16231b',
    flavor: 'Woodland Valor',
    primary: '#7f9f58',
    secondary: '#31543d',
    text: '#fff7ed',
  },
  dsk: {
    accent: '#fb7185',
    background: '#17111a',
    flavor: 'Haunted Rooms',
    primary: '#6d334b',
    secondary: '#241727',
    text: '#fff1f2',
  },
  fdn: {
    accent: '#facc15',
    background: '#14151f',
    flavor: 'Core Magic',
    primary: '#2563eb',
    secondary: '#3730a3',
    text: '#eff6ff',
  },
  lci: {
    accent: '#22d3ee',
    background: '#0d211f',
    flavor: 'Sunken Relics',
    primary: '#0f766e',
    secondary: '#164e63',
    text: '#ecfeff',
  },
  mkm: {
    accent: '#f97316',
    background: '#181820',
    flavor: 'Case Files',
    primary: '#475569',
    secondary: '#7c2d12',
    text: '#f8fafc',
  },
  mom: {
    accent: '#f8fafc',
    background: '#171312',
    flavor: 'Multiverse War',
    primary: '#991b1b',
    secondary: '#3f3f46',
    text: '#fff7ed',
  },
  one: {
    accent: '#f87171',
    background: '#141316',
    flavor: 'Oil and Steel',
    primary: '#52525b',
    secondary: '#7f1d1d',
    text: '#fafafa',
  },
  otj: {
    accent: '#fde68a',
    background: '#1b1714',
    flavor: 'Frontier Spoils',
    primary: '#a16207',
    secondary: '#78350f',
    text: '#fffbeb',
  },
  woe: {
    accent: '#f0abfc',
    background: '#181326',
    flavor: 'Storybook Magic',
    primary: '#7e22ce',
    secondary: '#be123c',
    text: '#fdf4ff',
  },
};

export function getSetTheme(setCode: string | undefined): SetTheme {
  if (!setCode) {
    return defaultTheme;
  }

  return setThemes[setCode.toLowerCase()] ?? defaultTheme;
}
