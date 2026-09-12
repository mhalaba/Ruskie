import { LMD } from "./units-lmd.mjs";
import { MMD } from "./units-mmd.mjs";
import { SMD } from "./units-smd.mjs";
import { CMD } from "./units-cmd.mjs";
import { EMD } from "./units-emd.mjs";
import { VDV } from "./units-vdv.mjs";
import { NAVAL } from "./units-naval.mjs";
import { GRU } from "./units-gru.mjs";
import { VKS } from "./units-vks.mjs";
import { RVSN } from "./units-rvsn.mjs";
import { EXTRA } from "./units-extra.mjs";

export const CATALOG = [
  ...LMD,
  ...MMD,
  ...SMD,
  ...CMD,
  ...EMD,
  ...VDV,
  ...NAVAL,
  ...GRU,
  ...VKS,
  ...RVSN,
  ...EXTRA,
];
