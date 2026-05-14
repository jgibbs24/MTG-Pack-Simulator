import type { BoosterType } from './packLabels';

import blbCollector from './assets/pack-wrappers/MTGBLB_EN_Bstr_Clctr_01_01.png';
import blbPlay from './assets/pack-wrappers/MTGBLB_EN_Bstr_Play_01_01.png';
import dskCollector from './assets/pack-wrappers/MTGDSK_EN_Bstr_Clctr_01_02.png';
import dskPlay from './assets/pack-wrappers/MTGDSK_EN_Bstr_Play_01_02.png';
import fdnCollector from './assets/pack-wrappers/MTGFND_EN_Bstr_Clctr_01_02.png';
import fdnPlay from './assets/pack-wrappers/MTGFND_EN_Bstr_Play_01_02.png';
import lciCollector from './assets/pack-wrappers/MTGLCI_EN_ClctrBstr_01_02.png';
import lciPlay from './assets/pack-wrappers/MTGLCI_EN_Bstr_Set_01_02.png';
import mkmCollector from './assets/pack-wrappers/MTGMKM_EN_ClctrBstr_01_02.png';
import mkmPlay from './assets/pack-wrappers/MTGMKM_EN_Bstr_Play_01_02.png';
import momCollector from './assets/pack-wrappers/MTG_MOM_EN_Bstr_Clctr_01_02.png';
import momPlay from './assets/pack-wrappers/MTGMOM_EN_Bstr_Set_01_02.png';
import oneCollector from './assets/pack-wrappers/MTGONE_EN_ClctrBstr_01_02.png';
import onePlay from './assets/pack-wrappers/MTGONE_EN_Bstr_Set_01_02.png';
import otjCollector from './assets/pack-wrappers/MTGOTJ_EN_ClctrBstr_1_2.png';
import otjPlay from './assets/pack-wrappers/MTGOTJ_EN_Bstr_Play_1_2.png';
import woeCollector from './assets/pack-wrappers/MTGWOE_EN_ClctrBstr_01_02.png';
import woePlay from './assets/pack-wrappers/MTGWOE_EN_Bstr_Set_01_02.png';

type PackWrapperImage = {
  cropScale?: number;
  fit?: 'contain' | 'cover';
  src: string;
};

const packWrapperImages: Record<string, Partial<Record<BoosterType, PackWrapperImage>>> = {
  blb: {
    collector: { src: blbCollector },
    play: { src: blbPlay },
  },
  dsk: {
    collector: { src: dskCollector },
    play: { src: dskPlay },
  },
  fdn: {
    collector: { src: fdnCollector },
    play: { src: fdnPlay },
  },
  lci: {
    collector: { src: lciCollector },
    play: { src: lciPlay },
  },
  mkm: {
    collector: { src: mkmCollector },
    play: { src: mkmPlay },
  },
  mom: {
    collector: { cropScale: 1.12, fit: 'cover', src: momCollector },
    play: { src: momPlay },
  },
  one: {
    collector: { src: oneCollector },
    play: { src: onePlay },
  },
  otj: {
    collector: { src: otjCollector },
    play: { src: otjPlay },
  },
  woe: {
    collector: { src: woeCollector },
    play: { src: woePlay },
  },
};

export function getPackWrapperImage(
  setCode: string | undefined,
  boosterType: BoosterType,
): PackWrapperImage | undefined {
  if (!setCode) {
    return undefined;
  }

  return packWrapperImages[setCode.toLowerCase()]?.[boosterType];
}
