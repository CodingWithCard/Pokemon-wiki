// Helpers
const $ = (sel) => document.querySelector(sel);
const app = $("#app");
$("#y").textContent = new Date().getFullYear();

const setBanner = (title, sub) => {
  $("#banner-title").textContent = title;
  $("#banner-sub").textContent = sub || "";
};

// ----- Sprite sources -----
// Large official artwork when we have numeric ID; otherwise fallback to a form sprite CDN.
const spriteURL = (p) => {
  if (p.id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`;
  }
  return `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${p.slug}.png`;
};

// Colored egg marker
const eggDot = (km) => {
  const color =
    { 2: "#4ade80", 5: "#fb923c", 7: "#facc15", 10: "#a78bfa", 12: "#ef4444" }[
      km
    ] || "#e5e7eb";
  return `<span class="eggdot" style="--c:${color}"></span>`;
};

// ---------- PAGES ----------
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
        <a class="card" href="#/raids-bosse"><div class="icon i-raids">⚔️</div><div class="name">Raids &amp; Bosse</div><div class="small">Aktuelle Bosse, Tipps & Konter.</div><span class="btn">Öffnen</span></a>
        <a class="card" href="#/events"><div class="icon i-events">📅</div><div class="name">Events</div><div class="small">Spotlight, Raid Hour & Community Day.</div><span class="btn">Öffnen</span></a>
        <a class="card" href="#/pvp-kaempfe"><div class="icon i-pvp">🥇</div><div class="name">PvP & Kämpfe</div><div class="small">Ligen, Basics & Ressourcen.</div><span class="btn">Öffnen</span></a>
        <a class="card" href="#/eier-ausbruten"><div class="icon i-eggs">🥚</div><div class="name">Eier & Ausbrüten</div><div class="small">Eier-Typen & Effizienz.</div><span class="btn">Öffnen</span></a>
        <a class="card" href="#/ressourcen"><div class="icon i-links">🔗</div><div class="name">Ressourcen</div><div class="small">Top-Webseiten & Tools.</div><span class="btn">Öffnen</span></a>
      </div>
    </section>`;
};

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
        <p>„Individual Values“ – versteckte Werte (Angriff, Verteidigung, Ausdauer). Jeder Wert 0–15. 100% = <strong>15-15-15</strong> = <strong>45</strong> Gesamt.</p>
        <p><strong>Formel:</strong> (Summe der drei Werte / 45) × 100.<br>
        Beispiel: <code>15 + 15 + 14 = 44</code> → <code>44 ÷ 45 ≈ 0,977…</code> → ≈ <strong>98%</strong>.</p>
      </details>

      <details><summary><span class="pill">PASS</span> Wie bekomme ich Fern-Raid-Pässe?</summary>
        <p>Im In-Game-Shop kaufen; gelegentlich als Event-Belohnung erhältlich.</p>
      </details>

      <details><summary><span class="pill">FRIEND</span> Wie finde ich neue Freunde?</summary>
        <p>Teile deinen Trainercode in unserer Community oder nutze Foren/Discords.</p>
      </details>

      <details><summary><span class="pill">COINS</span> Woher bekomme ich PokéMünzen?</summary>
        <ol>
          <li><strong>Arena-Verteidigung:</strong> Bis zu 50 Münzen/Tag, wenn dein Pokémon nach Einsatz in einer Arena besiegt wird.</li>
          <li><strong>Kauf im Shop:</strong> Direkt im In-Game-Shop oder <a href="https://store.pokemongolive.com/" target="_blank" rel="noopener">Pokémon GO Webstore</a>.</li>
        </ol>
      </details>
    </section>`;
};

const Raids = async () => {
  setBanner("Raids & Bosse", "Aktuelle Tierliste, Konter & Tipps");
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

  const fiveStar =
    (raids.five_star?.active || [])
      .map(
        (r) => `
    <div class="row">
      <div>
        <span class="pill">${r.tier}</span> <strong>${r.name}</strong>
        <div class="small">Von ${r.start} bis ${r.end}</div>
        ${
          r.counters_hint
            ? `<div class="konter">Konter: ${r.counters_hint}</div>`
            : ""
        }
      </div>
      <div>⭐</div>
    </div>`
      )
      .join("") || "<p class='small'>Keine 5★-Raids aktiv.</p>";

  const mega =
    (raids.mega_raids?.active || [])
      .map(
        (r) => `
    <div class="row">
      <div>
        <span class="pill">${r.tier}</span> <strong>${r.name}</strong>
        <div class="small">Von ${r.start} bis ${r.end}</div>
      </div>
      <div>🔥</div>
    </div>`
      )
      .join("") || "<p class='small'>Keine Mega-Raids aktiv.</p>";

  const shadow = raids.shadow_raids?.five_star_weekend
    ? `
    <div class="row">
      <div>
        <span class="pill">${raids.shadow_raids.five_star_weekend.tier}</span>
        <strong>${raids.shadow_raids.five_star_weekend.name}</strong>
        <div class="small">${raids.shadow_raids.five_star_weekend.schedule}</div>
      </div>
      <div>👥</div>
    </div>`
    : "<p class='small'>Keine Shadow-Raids Infos.</p>";

  app.innerHTML = `
    <section class="section">
      <div class="grid-2">
        <div class="card"><div class="badge">5★ Raids</div>${fiveStar}</div>
        <div class="card"><div class="badge">Mega-Raids</div>${mega}</div>
      </div>
      <div class="card" style="margin-top:14px"><div class="badge">Shadow-Raids</div>${shadow}</div>
      <div class="card" style="margin-top:14px">
        <h3 style="margin-top:0">Tipps</h3>
        <ul>
          <li>Typ-Vorteile nutzen (z. B. Elektro &gt; Wasser, Gestein &gt; Flug).</li>
          <li>Vor dem Start im Chat absprechen, Lobbys koordinieren.</li>
          <li>Nach dem Raid Tränke/Beleber einsetzen.</li>
        </ul>
        ${
          raids.links?.raid_guide
            ? `<p><a class="btn btn-primary" href="${raids.links.raid_guide}" target="_blank" rel="noopener">Aktuelle Konter & Bosse</a></p>`
            : ""
        }
      </div>
    </section>`;
};

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

// Helper urls for external Pokédex pages (use slug; works for forms too)
const hubUrl = (slug) => `https://pokemongohub.net/pokedex/pokemon-go/${slug}/`;
const gpUrl = (slug) => `https://gamepress.gg/pokemongo/pokemon/${slug}`;

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
        <p class="small">Pools ändern sich innerhalb der Saison monatlich. Prüfe bei Bedarf:</p>
        <ul class="small">
          <li><a target="_blank" rel="noopener" href="https://leekduck.com/eggs/">LeekDuck – Current Eggs</a></li>
          <li><a target="_blank" rel="noopener" href="https://pokemongohub.net/post/chart/pokemon-go-eggs/">GO Hub – Egg-Chart</a></li>
        </ul>
        <p class="small">Zuletzt aktualisiert: ${data.last_updated}</p>
      </div>
    </section>`;
};

const PvP = () => {
  setBanner("PvP & Kämpfe", "Ligen, Ressourcen & Mikro-Tipps");
  app.innerHTML = `
    <section class="section">
      <div class="grid-2">
        <div class="card">
          <div class="row"><div><span class="pill">Superliga</span> Max. 1.500 WP</div><div>🥊</div></div>
          <div class="row"><div><span class="pill">Hyperliga</span> Max. 2.500 WP</div><div>⚔️</div></div>
          <div class="row"><div><span class="pill">Meisterliga</span> Keine WP-Grenze</div><div>🏆</div></div>
        </div>
        <div class="card">
          <h3 style="margin-top:0">Tipps & Ressourcen</h3>
          <ul>
            <li>Schilde gezielt für Schlüssel-Pokémon einsetzen.</li>
            <li>Auf Typ-Vorteile achten (z. B. Wasser &gt; Feuer).</li>
          </ul>
          <p><a href="https://pvpoke.com" target="_blank" rel="noopener">PvPoke – Rankings & Teams</a></p>
        </div>
      </div>
    </section>`;
};

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

// ---------- Router ----------
const routes = {
  "": Home,
  "/": Home,
  "/faq": FAQ,
  "/raids-bosse": Raids,
  "/events": Events,
  "/pvp-kaempfe": PvP,
  "/eier-ausbruten": Eggs,
  "/ressourcen": Resources,
};
function router() {
  const hash = location.hash.replace(/^#/, "");
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
