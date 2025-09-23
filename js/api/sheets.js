// js/api/sheets.js
import { ENDPOINTS, FALLBACKS } from "../config.js";
import { imageURL } from "../utils/images.js";

async function fetchJSON(url, fallback = null) {
  try {
    const res = await fetch(`${url}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn("Fetch failed:", url, e);
    if (fallback) {
      const r2 = await fetch(fallback, { cache: "no-store" });
      if (r2.ok) return await r2.json();
    }
    return [];
  }
}

/* ---------- RAIDS ---------- */
export async function loadRaids() {
  const rows = await fetchJSON(ENDPOINTS.raids, FALLBACKS.raids);
  const data = {
    five_star: { active: [] },
    mega_raids: { active: [] },
    shadow_raids: { five_star_weekend: null },
    last_updated: new Date().toISOString(),
  };

  for (const r of rows) {
    const tier = (r.tier || "").trim();
    const item = {
      tier,
      name: (r.name || "").trim(),
      id: (r.id || "").toString().trim(),
      slug: (r.slug || "").trim(),
      start: (r.start || "").trim(),
      end: (r.end || "").trim(),
      counters_hint: (r.counters_hint || "").trim(),
      image: imageURL({ id: r.id, slug: r.slug, image: r.image }),
    };
    if (/^mega$/i.test(tier)) {
      data.mega_raids.active.push(item);
    } else if (/shadow/i.test(tier)) {
      if (!data.shadow_raids.five_star_weekend) {
        data.shadow_raids.five_star_weekend = {
          tier,
          name: item.name,
          schedule: [item.start, item.end].filter(Boolean).join(" – "),
        };
      }
    } else {
      data.five_star.active.push(item);
    }
  }
  return data;
}

/* ---------- EGGS ---------- */
export async function loadEggs() {
  const rows = await fetchJSON(ENDPOINTS.eggs, FALLBACKS.eggs);
  const out = {
    eggs: {
      "2km": { pokemon: [] },
      "5km": { pokemon: [] },
      "7km": { pokemon: [] },
      "10km": { pokemon: [] },
      "12km": { pokemon: [] },
    },
    last_updated: new Date().toISOString(),
  };
  for (const r of rows) {
    const km = (r.km ?? "").toString().trim();
    if (!km) continue;
    const key = `${km}km`;
    if (!out.eggs[key]) out.eggs[key] = { pokemon: [] };
    out.eggs[key].pokemon.push({
      name: (r.name || "").trim(),
      id: (r.id || "").toString().trim(),
      slug: (r.slug || "").trim(),
      image: imageURL({ id: r.id, slug: r.slug, image: r.image }),
    });
  }
  return out;
}

/* ---------- ROCKET ---------- */
export async function loadRocket() {
  const rows = await fetchJSON(ENDPOINTS.rocket, FALLBACKS.rocket);
  const out = {
    grunts: [],
    leaders: [],
    boss: { name: "Giovanni", lineup: [[], [], []], notes: "" },
    last_updated: new Date().toISOString(),
  };

  const gruntMap = new Map();
  const leaderMap = new Map();

  for (const r of rows) {
    const section = (r.section || "").trim().toLowerCase();
    const slot = Math.max(1, Math.min(3, parseInt(r.slot || "1", 10))) - 1;

    const mon = {
      name: (r.name || "").trim(),
      id: (r.id || "").toString().trim(),
      slug: (r.slug || "").trim(),
      image: imageURL({ id: r.id, slug: r.slug, image: r.image }),
    };

    if (section === "grunt") {
      const key = (r["type/leader"] || r.type || "Grunt").trim();
      if (!gruntMap.has(key)) gruntMap.set(key, []);
      gruntMap.get(key).push(mon);
    } else if (section === "leader") {
      const name = (r["type/leader"] || r.leader || "").trim();
      if (!leaderMap.has(name))
        leaderMap.set(name, { name, teams: [[], [], []] });
      leaderMap.get(name).teams[slot].push(mon);
    } else if (section === "boss") {
      out.boss.name = (r["type/leader"] || out.boss.name).trim();
      out.boss.lineup[slot].push(mon);
    }
  }
  gruntMap.forEach((lineup, type) => out.grunts.push({ type, lineup }));
  leaderMap.forEach((obj) => out.leaders.push(obj));
  return out;
}

/* ---------- META (RAIDS) ---------- */
export async function loadMetaRaids() {
  const rows = await fetchJSON(ENDPOINTS.metaRaids, FALLBACKS.metaRaids);
  // group by tier; sort by order
  const tiers = { S: [], A: [], B: [], C: [], D: [] };
  for (const r of rows) {
    const t = (r.tier || "").toUpperCase();
    const entry = {
      tier: t,
      role: (r.role || "").trim(),
      name: (r.name || "").trim(),
      id: (r.id || "").toString().trim(),
      slug: (r.slug || "").trim(),
      image: imageURL({ id: r.id, slug: r.slug, image: r.image }),
      moves: (r.moves || "").trim(),
      notes: (r.notes || "").trim(),
      order: parseInt(r.order || "999", 10),
    };
    if (tiers[t]) tiers[t].push(entry);
  }
  Object.values(tiers).forEach((arr) =>
    arr.sort(
      (a, b) =>
        (a.order || 999) - (b.order || 999) || a.name.localeCompare(b.name)
    )
  );
  return { tiers, last_updated: new Date().toISOString() };
}

/* ---------- META (PvP) ---------- */
export async function loadMetaPvp() {
  const rows = await fetchJSON(ENDPOINTS.metaPvp, FALLBACKS.metaPvp);
  // group by league; sort by order
  const leagues = { Great: [], Ultra: [], Master: [] };
  for (const r of rows) {
    const lg = (r.league || "").trim();
    if (!leagues[lg]) leagues[lg] = [];
    leagues[lg].push({
      league: lg,
      name: (r.name || "").trim(),
      id: (r.id || "").toString().trim(),
      slug: (r.slug || "").trim(),
      image: imageURL({ id: r.id, slug: r.slug, image: r.image }),
      iv_goal: (r.iv_goal || "").trim(),
      moves: (r.moves || "").trim(),
      role: (r.role || "").trim(),
      notes: (r.notes || "").trim(),
      order: parseInt(r.order || "999", 10),
    });
  }
  Object.values(leagues).forEach((arr) =>
    arr.sort(
      (a, b) =>
        (a.order || 999) - (b.order || 999) || a.name.localeCompare(b.name)
    )
  );
  return { leagues, last_updated: new Date().toISOString() };
}

/* ---------- Convenience ---------- */
export async function loadAll() {
  const [raids, eggs, rocket] = await Promise.all([
    loadRaids(),
    loadEggs(),
    loadRocket(),
  ]);
  return { raids, eggs, rocket };
}
