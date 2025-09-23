// js/config.js
export const SHEET_ID = "1_BPcYuoOmzg8wz7_G8yL4E5DtphwhFGAw90atdX95Q0";
export const OPENSHEET_BASE = `https://opensheet.vercel.app/${SHEET_ID}`;

export const ENDPOINTS = {
  raids: `${OPENSHEET_BASE}/raids`,
  eggs: `${OPENSHEET_BASE}/eggs`,
  rocket: `${OPENSHEET_BASE}/rocket`,
  metaRaids: `${OPENSHEET_BASE}/meta_raids`,
  metaPvp: `${OPENSHEET_BASE}/meta_pvp`,
};

// local JSON fallbacks (optional)
export const FALLBACKS = {
  raids: "data/raids.json",
  eggs: "data/eggs.json",
  rocket: "data/rocket.json",
  metaRaids: null,
  metaPvp: null,
};

export const PLACEHOLDER_IMG = "images/placeholder.png";
