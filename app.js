// ========= Helpers =========
const $ = (sel) => document.querySelector(sel);
const app = $("#app");
$("#y").textContent = new Date().getFullYear();

const setBanner = (title, sub) => {
  $("#banner-title").textContent = title;
  $("#banner-sub").textContent = sub || "";
};

// Large official artwork if we have an ID; fallback to PokéSprite for forms/mega/primal/regional.
const spriteURL = (p) => {
  if (p.id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`;
  }
  // Known form slugs (mega/primal/alola/galar/hisui/…)
  return `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${p.slug}.png`;
};

const eggDot = (km) => {
  const color =
    { 2: "#4ade80", 5: "#fb923c", 7: "#facc15", 10: "#a78bfa", 12: "#ef4444" }[
      km
    ] || "#e5e7eb";
  return `<span class="eggdot" style="--c:${color}"></span>`;
};

// External Pokédex links used in Eggs
const hubUrl = (slug) => `https://pokemongohub.net/pokedex/pokemon-go/${slug}/`;
const gpUrl = (slug) => `https://gamepress.gg/pokemongo/pokemon/${slug}`;

// ========= Home =========
const Home = () => {
  setBanner(
    "Pokémon GO Wissensbasis",
    "Dein schneller Weg zu Antworten – gemacht von unserer Community."
  );
  app.innerHTML = `
    <section class="section">
      <span class="badge">Pokémon GO • Community</span>
      <p class="lead">Wähle ein Thema:</p>
      <div class="grid-6">
        <a class="card" href="#/faq"><div class="icon i-faq">❓</div><div class="name">FAQ</div><div class="small">Häufige Fragen kompakt beantwortet.</div><span class="btn">Öffnen</span></a>
        <a class="card" href="#/raids-bosse"><div class="icon i-raids">⚔️</div><div class="name">Raids &amp; Bosse</div><div class="small">Aktuelle Bosse, Bilder & Konter.</div><span class="btn">Öffnen</span></a>
        <a class="card" href="#/events"><div class="icon i-events">📅</div><div class="name">Events</div><div class="small">Spotlight, Raid Hour & Community Day.</div><span class="btn">Öffnen</span></a>
        <a class="card" href="#/pvp-kaempfe"><div class="icon i-pvp">🥇</div><div class="name">PvP</div><div class="small">Ligen, Must-Haves & IV-Guide.</div><span class="btn">Öffnen</span></a>
        <a class="card" href="#/eier-ausbruten"><div class="icon i-eggs">🥚</div><div class="name">Eier</div><div class="small">Aktuelle Pools mit Bildern.</div><span class="btn">Öffnen</span></a>
        <a class="card" href="#/team-rocket"><div class="icon i-raids">🅁</div><div class="name">Team Rocket</div><div class="small">Grunts, Leiter & Giovanni (Bilder).</div><span class="btn">Öffnen</span></a>
        <a class="card" href="#/ressourcen"><div class="icon i-links">🔗</div><div class="name">Ressourcen</div><div class="small">Top-Webseiten & Tools.</div><span class="btn">Öffnen</span></a>
      </div>
    </section>`;
};

// ========= FAQ =========
const FAQ = () => {
  setBanner(
    "Häufig gestellte Fragen",
    "Schnelle Antworten auf die wichtigsten Themen"
  );
  app.innerHTML = `
    <section class="section">
      <details open><summary><span class="pill">RAID</span> Wie trete ich einem Raid bei?</summary>
        <p>Tippe auf eine Arena mit einem Raid, wähle „Kämpfen“ und nutze einen Raid-Pass. Für Fernraids brauchst du einen Fern-Raid-Pass.</p>
      </details>

      <details><summary><span class="pill">EX</span> Was sind EX-Raids?</summary>
        <p>Spezielle Einladungs-Raids an ausgewählten Arenen. Einladungen erhält man, wenn man dort zuvor Raids absolviert hat.</p>
      </details>

      <details><summary><span class="pill">IV</span> Was bedeutet IV und wie berechne ich %?</summary>
        <p>„Individual Values“ – versteckte Werte (Angriff, Verteidigung, Ausdauer). 100% = <strong>15-15-15</strong> = Summe <strong>45</strong>.</p>
        <p><strong>Formel:</strong> (Summe / 45) × 100. Beispiel: <code>15+15+14=44</code> → <code>44÷45 ≈ 0,977…</code> → ≈ <strong>98%</strong>.</p>
      </details>

      <details><summary><span class="pill">PASS</span> Wie bekomme ich Fern-Raid-Pässe?</summary>
        <p>Im In-Game-Shop kaufen; gelegentlich als Event-Belohnung erhältlich.</p>
      </details>

      <details><summary><span class="pill">COINS</span> Woher bekomme ich PokéMünzen?</summary>
        <ol>
          <li><strong>Arena-Verteidigung:</strong> Bis zu 50 Münzen/Tag, wenn dein Pokémon nach Einsatz in einer Arena besiegt wird.</li>
          <li><strong>Kauf im Shop:</strong> Direkt im In-Game-Shop oder im <a target="_blank" rel="noopener" href="https://store.pokemongolive.com/">Pokémon GO Webstore</a>.</li>
        </ol>
      </details>
    </section>`;
};

// ========= Raids & Bosse =========

// Must-Have Raid Pokémon (S → D). id = official artwork; slug = forms/mega/primal/etc.
const MUST_HAVE_RAIDS = [
  // S
  { tier: "S", name: "Proto-Groudon", slug: "groudon-primal" },
  { tier: "S", name: "Proto-Kyogre", slug: "kyogre-primal" },
  { tier: "S", name: "Mega-Rayquaza", slug: "rayquaza-mega" },
  { tier: "S", name: "Crypto-Mewtu", id: 150, slug: "mewtwo" },
  { tier: "S", name: "Eternatus", id: 890, slug: "eternatus" },
  { tier: "S", name: "Schwarzes Kyurem", slug: "kyurem-black" },
  { tier: "S", name: "Crypto-Brutalanda", id: 373, slug: "salamence" },
  { tier: "S", name: "Necrozma (Morgenschwingen)", slug: "necrozma-dawn" },
  { tier: "S", name: "Zacian (Königsschwert)", slug: "zacian-crowned" },

  // A+
  { tier: "A+", name: "Mega-Despotar", slug: "tyranitar-mega" },
  { tier: "A+", name: "Mega-Gengar", slug: "gengar-mega" },
  { tier: "A+", name: "Mega-Gewaldro", slug: "sceptile-mega" },
  { tier: "A+", name: "Mega-Lohgock", slug: "blaziken-mega" },
  { tier: "A+", name: "Mega-Metagross", slug: "metagross-mega" },
  { tier: "A+", name: "Mega-Glurak Y", slug: "charizard-mega-y" },
  { tier: "A+", name: "Reshiram", id: 643, slug: "reshiram" },
  { tier: "A+", name: "Zekrom", id: 644, slug: "zekrom" },
  { tier: "A+", name: "Crypto-Arktos", id: 144, slug: "articuno" },
  { tier: "A+", name: "Crypto-Lavados", id: 146, slug: "moltres" },
  { tier: "A+", name: "Crypto-Metagross", id: 376, slug: "metagross" },
  { tier: "A+", name: "Terrakium", id: 639, slug: "terrakion" },

  // A
  { tier: "A", name: "Lucario", id: 448, slug: "lucario" },
  { tier: "A", name: "Rameidon", id: 409, slug: "rampardos" },
  { tier: "A", name: "Knakrack", id: 445, slug: "garchomp" },
  { tier: "A", name: "Trikephalo", id: 635, slug: "hydreigon" },
  { tier: "A", name: "Skelabra", id: 609, slug: "chandelure" },
  { tier: "A", name: "Rihornior", id: 464, slug: "rhyperior" },
  { tier: "A", name: "Crypto-Snibunna", id: 461, slug: "weavile" },
  { tier: "A", name: "Crypto-Machomei", id: 68, slug: "machamp" },
  { tier: "A", name: "Crypto-Magnezone", id: 462, slug: "magnezone" },

  // B
  { tier: "B", name: "Mamutel", id: 473, slug: "mamoswine" },
  { tier: "B", name: "Impoleon", id: 395, slug: "empoleon" },
  { tier: "B", name: "Stalobor", id: 530, slug: "excadrill" },
  { tier: "B", name: "Roserade", id: 407, slug: "roserade" },
  { tier: "B", name: "Kingler", id: 99, slug: "kingler" },
  { tier: "B", name: "Fuegro", id: 727, slug: "incineroar" },
  { tier: "B", name: "Crypto-Hundemon", id: 229, slug: "houndoom" },
  { tier: "B", name: "Crypto-Scherox", id: 212, slug: "scizor" },
  { tier: "B", name: "Katagami", id: 798, slug: "kartana" },

  // C
  { tier: "C", name: "Bojelin (Breloom)", id: 286, slug: "breloom" },
  { tier: "C", name: "Glaziola", id: 471, slug: "glaceon" },
  { tier: "C", name: "Folipurba", id: 470, slug: "leafeon" },
  { tier: "C", name: "Flamara", id: 136, slug: "flareon" },
  { tier: "C", name: "Blitza", id: 135, slug: "jolteon" },
  { tier: "C", name: "Aquana", id: 134, slug: "vaporeon" },

  // D
  { tier: "D", name: "Arkani", id: 59, slug: "arcanine" },
  { tier: "D", name: "Sarzenia", id: 71, slug: "victreebel" },
  { tier: "D", name: "Sandamer", id: 28, slug: "sandslash" },
  { tier: "D", name: "Rizeros", id: 112, slug: "rhydon" },
];

const renderTier = (label, css, items) => `
  <div class="tier-card">
    <div class="tier-head">
      <div class="name">Tierliste</div>
      <span class="tier-badge ${css}">Tier ${label}</span>
    </div>
    ${items
      .map(
        (p) => `
      <div class="tier-row">
        <img class="tier-icon" src="${spriteURL(p)}" alt="${
          p.name
        }" loading="lazy">
        <span class="tier-name">${p.name}</span>
      </div>
    `
      )
      .join("")}
  </div>
`;

const renderMustHaveRaids = () => {
  const by = (t) => MUST_HAVE_RAIDS.filter((x) => x.tier === t);
  return `
    <div class="must-have-card">
      <h3 style="margin-top:0">Must-Have Raid Pokémon – Tierliste</h3>
      <div class="tier-wrap">
        ${renderTier("S", "tier-S", by("S"))}
        ${renderTier("A+", "tier-Ap", by("A+"))}
        ${renderTier("A", "tier-A", by("A"))}
        ${renderTier("B", "tier-B", by("B"))}
        ${renderTier("C", "tier-C", by("C"))}
        ${renderTier("D", "tier-D", by("D"))}
      </div>
      <p class="small" style="margin-top:10px">
        Einordnung nach Gesamtleistung & Vielseitigkeit über viele Raid-Typen.
        Spezifische Konter sind je Boss weiterhin entscheidend.
      </p>
    </div>`;
};

const Raids = async () => {
  setBanner("Raids & Bosse", "Aktuelle Bosse, Bilder & Must-Haves");
  let raids;
  try {
    raids = await fetch(`data/raids.json?v=${Date.now()}`).then((r) =>
      r.json()
    );
  } catch {
    raids = null;
  }
  if (!raids) {
    app.innerHTML = `<section class="section"><p class="small">Fehler beim Laden der Raid-Daten.</p></section>`;
    return;
  }

  const renderList = (arr = []) =>
    arr
      .map(
        (r) => `
    <div class="row">
      <div class="mon-row">
        ${
          r.id || r.slug
            ? `<img class="mon-icon" loading="lazy" src="${spriteURL(
                r
              )}" alt="${r.name}">`
            : ""
        }
        <div>
          <div class="mon-name"><span class="pill">${r.tier}</span> ${
          r.name
        }</div>
          <div class="small">Von ${r.start} bis ${r.end}</div>
          ${
            r.counters_hint
              ? `<div class="konter">Konter: ${r.counters_hint}</div>`
              : ""
          }
        </div>
      </div>
    </div>
  `
      )
      .join("");

  const fiveStar = raids.five_star?.active?.length
    ? renderList(raids.five_star.active)
    : "<p class='small'>Keine 5★-Raids aktiv.</p>";
  const mega = raids.mega_raids?.active?.length
    ? renderList(raids.mega_raids.active)
    : "<p class='small'>Keine Mega-Raids aktiv.</p>";
  const shadow = raids.shadow_raids?.five_star_weekend
    ? `
    <div class="row">
      <div>
        <span class="pill">${raids.shadow_raids.five_star_weekend.tier}</span>
        <strong>${raids.shadow_raids.five_star_weekend.name}</strong>
        <div class="small">${raids.shadow_raids.five_star_weekend.schedule}</div>
      </div>
    </div>`
    : "<p class='small'>Keine Shadow-Raids Infos.</p>";

  app.innerHTML = `
    <section class="section">
      <div class="grid-2">
        <div class="card"><div class="badge">5★ Raids</div>${fiveStar}</div>
        <div class="card"><div class="badge">Mega-Raids</div>${mega}</div>
      </div>
      <div class="card" style="margin-top:14px"><div class="badge">Shadow-Raids</div>${shadow}</div>

      ${renderMustHaveRaids()}

      <div class="card" style="margin-top:14px">
        <h3 style="margin-top:0">Tipps</h3>
        <ul>
          <li>Typ-Vorteile nutzen (z. B. Elektro &gt; Wasser, Gestein &gt; Flug).</li>
          <li>Lobbys koordinieren und passende Konter wählen.</li>
        </ul>
        <p><a class="btn btn-primary" href="${
          raids.links?.raid_guide || "https://www.pokebattler.com/raids"
        }" target="_blank" rel="noopener">Aktuelle Konter & Bosse</a></p>
        <p class="small">Zuletzt aktualisiert: ${raids.last_updated || ""}</p>
      </div>
    </section>`;
};

// ========= Events =========
const Events = async () => {
  setBanner("Events", "Spotlight Hour, Raid Hour, Community Day & mehr");
  let events;
  try {
    events = await fetch(`data/events.json?v=${Date.now()}`).then((r) =>
      r.json()
    );
  } catch {
    events = null;
  }
  if (!events) {
    app.innerHTML = `<section class="section"><p class="small">Fehler beim Laden der Event-Daten.</p></section>`;
    return;
  }

  const rec =
    (events.recurring || [])
      .map(
        (e) => `
    <div class="row"><div><strong>${e.title}:</strong> ${e.time}</div><div>${
          e.icon || "📅"
        }</div></div>`
      )
      .join("") || "<p class='small'>Keine wiederkehrenden Events.</p>";

  const upc =
    (events.upcoming || [])
      .map(
        (e) => `
    <div class="row"><div><strong>${e.title}</strong><div class="small">${
          e.date
        }${e.details ? ` – ${e.details}` : ""}</div></div><div>${
          e.icon || "⭐"
        }</div></div>`
      )
      .join("") || "<p class='small'>Keine aktuellen Events.</p>";

  const season = events.season
    ? `
    <div class="card" style="margin-top:14px">
      <div class="badge">Saison: ${events.season.name}</div>
      <p><strong>${events.season.window}</strong></p>
      <ul>${(events.season.bonuses_sample || [])
        .map((b) => `<li>${b}</li>`)
        .join("")}</ul>
      <p class="small">${events.season.notes || ""}</p>
    </div>`
    : "";

  app.innerHTML = `
    <section class="section">
      <div class="grid-2">
        <div class="card"><div class="badge">Wiederkehrend</div>${rec}</div>
        <div class="card"><div class="badge">Aktuelle Termine</div>${upc}</div>
      </div>
      ${season}
    </section>`;
};

// ========= Eggs =========
const Eggs = async () => {
  setBanner("Eier & Ausbrüten", "Eiertypen, Pokémon-Pools & Effizienz");
  let data;
  try {
    data = await fetch(`data/eggs.json?v=${Date.now()}`).then((r) => r.json());
  } catch {
    data = null;
  }
  if (!data) {
    app.innerHTML = `<section class="section"><p class="small">Fehler beim Laden der Eier-Daten.</p></section>`;
    return;
  }

  const renderEgg = (km, block) => {
    const list =
      (block?.pokemon || [])
        .map(
          (p) => `
      <div class="poke-row">
        <img class="poke-icon" loading="lazy" src="${spriteURL(p)}" alt="${
            p.name
          }">
        <span>
          <a class="poke-link" href="${hubUrl(
            p.slug
          )}" target="_blank" rel="noopener">${p.name}</a>
          <a class="poke-link-ext" href="${gpUrl(
            p.slug
          )}" target="_blank" rel="noopener" aria-label="GamePress">↗</a>
        </span>
      </div>
    `
        )
        .join("") || `<p class="small">Keine Daten.</p>`;

    return `
      <div class="card">
        <div class="row">
          <div><span class="pill">${km} km</span></div>
          <div>${eggDot(String(km))}</div>
        </div>
        <div class="grid-2">${list}</div>
      </div>`;
  };

  app.innerHTML = `
    <section class="section">
      <div class="grid-2">
        ${renderEgg(2, data.eggs["2km"])}
        ${renderEgg(5, data.eggs["5km"])}
        ${renderEgg(7, data.eggs["7km"])}
        ${renderEgg(10, data.eggs["10km"])}
        ${renderEgg(12, data.eggs["12km"])}
      </div>
      <div class="card" style="margin-top:14px">
        <h3 style="margin-top:0">Hinweis & Quellen</h3>
        <p class="small">Pools ändern sich häufig. Prüfe bei Bedarf:</p>
        <ul class="small">
          <li><a target="_blank" rel="noopener" href="https://leekduck.com/eggs/">LeekDuck – Current Eggs</a></li>
          <li><a target="_blank" rel="noopener" href="https://pokemongohub.net/post/chart/pokemon-go-eggs/">GO Hub – Egg-Chart</a></li>
        </ul>
        <p class="small">Zuletzt aktualisiert: ${data.last_updated}</p>
      </div>
    </section>`;
};

// ========= Team GO Rocket =========
const Rocket = async () => {
  setBanner("Team GO Rocket", "Aktuelle Shadow-Pokémon, Leiter & Giovanni");
  let rocket;
  try {
    rocket = await fetch(`data/rocket.json?v=${Date.now()}`).then((r) =>
      r.json()
    );
  } catch {
    rocket = null;
  }
  if (!rocket) {
    app.innerHTML = `<section class="section"><p class="small">Fehler beim Laden der Rocket-Daten.</p></section>`;
    return;
  }

  const grunts = (rocket.grunts || [])
    .map(
      (g) => `
    <div class="card">
      <div class="badge">${g.type}</div>
      ${(g.lineup || [])
        .map(
          (p) => `
        <div class="mon-row">
          <img class="mon-icon sm" loading="lazy" src="${spriteURL(p)}" alt="${
            p.name
          }">
          <div class="mon-name">${p.name}</div>
        </div>
      `
        )
        .join("")}
    </div>`
    )
    .join("");

  const leaders = (rocket.leaders || [])
    .map(
      (l) => `
    <div class="card">
      <div class="badge">Leader ${l.name}</div>
      ${(l.teams || [])
        .map(
          (team, i) => `
        <div class="row"><strong>Slot ${i + 1}</strong></div>
        ${team
          .map(
            (p) => `
          <div class="mon-row">
            <img class="mon-icon sm" loading="lazy" src="${spriteURL(
              p
            )}" alt="${p.name}">
            <div class="mon-name">${p.name}</div>
          </div>
        `
          )
          .join("")}
      `
        )
        .join("")}
    </div>`
    )
    .join("");

  const boss = rocket.boss
    ? `
    <div class="card">
      <div class="badge">${rocket.boss.name}</div>
      ${(rocket.boss.lineup || [])
        .map(
          (slot, i) => `
        <div class="row"><strong>Slot ${i + 1}</strong></div>
        ${slot
          .map(
            (p) => `
          <div class="mon-row">
            <img class="mon-icon sm" loading="lazy" src="${spriteURL(
              p
            )}" alt="${p.name}">
            <div class="mon-name">${p.name}</div>
          </div>
        `
          )
          .join("")}
      `
        )
        .join("")}
      ${rocket.boss.notes ? `<p class="small">${rocket.boss.notes}</p>` : ""}
    </div>`
    : "";

  app.innerHTML = `
    <section class="section">
      <div class="badge">Grunts</div>
      <div class="flex-grid">${grunts}</div>
    </section>
    <section class="section">
      <div class="badge">Leiter</div>
      <div class="flex-grid">${leaders}</div>
    </section>
    <section class="section">
      ${boss}
      <p class="small">Zuletzt aktualisiert: ${
        rocket.last_updated || ""
      }. Lineups rotieren regelmäßig.</p>
    </section>`;
};

// ========= PvP =========

// Simple “must-have” PvP picks (Superliga-fokussiert + ein paar Allrounder)
const MUST_HAVE_PVP = [
  {
    name: "Azumarill",
    id: 184,
    slug: "azumarill",
    note: "Superliga-Tank, starke Coverage",
  },
  {
    name: "Meditalis",
    id: 308,
    slug: "medicham",
    note: "Meta-Pick, Counter/Nahkampf",
  },
  {
    name: "Galar-Flunschlik",
    id: 618,
    slug: "stunfisk-galar",
    note: "Top Boden/Stahl-Wall",
  },
  {
    name: "Skarmory",
    id: 227,
    slug: "skarmory",
    note: "Starker Flyer in Superliga",
  },
  {
    name: "Altaria",
    id: 334,
    slug: "altaria",
    note: "Konstanter Core-Breaker",
  },
  {
    name: "Registeel",
    id: 379,
    slug: "registeel",
    note: "Tank mit Focus Blast",
  },
  {
    name: "Knacklion (GL anwachsen → Libelldra)",
    id: 330,
    slug: "flygon",
    note: "Guter Boden/Drache-Flex",
  },
  {
    name: "Trevenant",
    id: 709,
    slug: "trevenant",
    note: "Geist/Pflanze Druck",
  },
  { name: "Noctuh", id: 164, slug: "noctowl", note: "Sehr solide mit Fliegen" },
];

const PvP = () => {
  setBanner("PvP & Kämpfe", "Ligen, Must-Haves & IV-Guide");
  const must = MUST_HAVE_PVP.map(
    (p) => `
    <div class="mon-row">
      <img class="mon-icon sm" src="${spriteURL(p)}" alt="${
      p.name
    }" loading="lazy">
      <div>
        <div class="mon-name">${p.name}</div>
        <div class="small">${p.note || ""}</div>
      </div>
    </div>
  `
  ).join("");

  app.innerHTML = `
    <section class="section">
      <div class="grid-2">
        <div class="card">
          <div class="row"><div><span class="pill">Superliga</span> Max. 1.500 WP</div><div>🥊</div></div>
          <div class="row"><div><span class="pill">Hyperliga</span> Max. 2.500 WP</div><div>⚔️</div></div>
          <div class="row"><div><span class="pill">Meisterliga</span> Keine WP-Grenze</div><div>🏆</div></div>
        </div>
        <div class="card">
          <h3 style="margin-top:0">Must-Have PvP Pokémon</h3>
          ${must}
          <p class="small">Mehr Rankings & Teams: <a href="https://pvpoke.com" target="_blank" rel="noopener">PvPoke</a></p>
        </div>
      </div>

      <details class="card" style="margin-top:14px">
        <summary><span class="pill">Perfekte PvP-IVs</span> Warum ist <strong>0-15-15</strong> ideal?</summary>
        <p>
          In PvP zählt <strong>Überlebensfähigkeit (KP & Verteidigung)</strong> oft mehr als reiner Angriff.
          Mit <strong>0 Angriff, 15 Verteidigung, 15 KP</strong> erreicht dein Pokémon das höchstmögliche Level,
          das noch unter der Liga-Grenze bleibt (1500/2500 WP). Dadurch bekommst du <strong>mehr Bulk</strong>
          und gewinnst knappe Matchups häufiger.
        </p>
        <ul>
          <li><strong>Formel:</strong> WP hängen von Level und IVs ab. Niedriger Angriff lässt mehr Level zu → mehr KP/Def.</li>
          <li><strong>Ausnahmen:</strong> Manche Sets wollen <em>Breakpoints</em> (etwas mehr Angriff). Das ist team- & matchup-abhängig.</li>
        </ul>
      </details>
    </section>`;
};

// ========= Ressourcen =========
const Resources = () => {
  setBanner("Ressourcen", "Links & Tools für Trainer");
  app.innerHTML = `
    <section class="section">
      <div class="grid-3">
        <a class="card" href="https://www.pokebattler.com/raids" target="_blank" rel="noopener">
          <div class="icon i-raids">⚔️</div><div class="name">Pokebattler</div><div class="small">Raid-Guides & Konter.</div>
        </a>
        <a class="card" href="https://leekduck.com/events/" target="_blank" rel="noopener">
          <div class="icon i-events">📅</div><div class="name">LeekDuck</div><div class="small">Eventliste & Übersichten.</div>
        </a>
        <a class="card" href="https://gamepress.gg/pokemongo/" target="_blank" rel="noopener">
          <div class="icon i-faq">📘</div><div class="name">GamePress</div><div class="small">Guides & Analysen.</div>
        </a>
      </div>
    </section>`;
};

// ========= Router =========
const routes = {
  "": Home,
  "/": Home,
  "/faq": FAQ,
  "/raids-bosse": Raids,
  "/events": Events,
  "/pvp-kaempfe": PvP,
  "/eier-ausbruten": Eggs,
  "/team-rocket": Rocket,
  "/ressourcen": Resources,
};

function router() {
  // normalize hash (decode, strip trailing slash)
  let hash = decodeURIComponent(location.hash.replace(/^#/, "")).replace(
    /\/+$/,
    ""
  );
  if (!hash) hash = "/";
  // aliases for safety
  const aliases = {
    "/teamrocket": "/team-rocket",
    "/team%20rocket": "/team-rocket",
    "/team_rocket": "/team-rocket",
  };
  hash = aliases[hash] || hash;

  const view =
    routes[hash] ||
    (() => {
      setBanner("Seite nicht gefunden", "Bitte nutze die Navigation.");
      app.innerHTML = `<section class="section"><p>Diese Seite existiert nicht. Zurück zur <a href="#/">Startseite</a>.</p></section>`;
    });
  view();
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
