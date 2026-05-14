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
    accent: '#f0c45c',
    background: '#102116',
    flavor: 'Woodland Valor',
    primary: '#8fb06a',
    secondary: '#244b35',
    text: '#fff7ed',
  },
  dsk: {
    accent: '#ff6f8c',
    background: '#160f18',
    flavor: 'Haunted Rooms',
    primary: '#7d3048',
    secondary: '#2b1425',
    text: '#fff1f2',
  },
  fdn: {
    accent: '#ffd91f',
    background: '#10162b',
    flavor: 'Core Magic',
    primary: '#1f56e5',
    secondary: '#132c8d',
    text: '#eff6ff',
  },
  lci: {
    accent: '#e6c56e',
    background: '#0a241f',
    flavor: 'Sunken Relics',
    primary: '#0f8c7c',
    secondary: '#123f63',
    text: '#ecfeff',
  },
  mkm: {
    accent: '#ff7a1a',
    background: '#18151a',
    flavor: 'Case Files',
    primary: '#6f7685',
    secondary: '#8a3a17',
    text: '#f8fafc',
  },
  mom: {
    accent: '#d9e947',
    background: '#101827',
    flavor: 'Multiverse War',
    primary: '#0d7d96',
    secondary: '#26316f',
    text: '#fff7ed',
  },
  one: {
    accent: '#f35b5f',
    background: '#121217',
    flavor: 'Oil and Steel',
    primary: '#515160',
    secondary: '#8b1f27',
    text: '#fafafa',
  },
  otj: {
    accent: '#f4d06f',
    background: '#1b130c',
    flavor: 'Frontier Spoils',
    primary: '#b36d13',
    secondary: '#5d2f0e',
    text: '#fffbeb',
  },
  woe: {
    accent: '#f6a2ff',
    background: '#1b1027',
    flavor: 'Storybook Magic',
    primary: '#8b22c8',
    secondary: '#c01768',
    text: '#fdf4ff',
  },
};

export function getSetTheme(setCode: string | undefined): SetTheme {
  if (!setCode) {
    return defaultTheme;
  }

  return setThemes[setCode.toLowerCase()] ?? defaultTheme;
}
