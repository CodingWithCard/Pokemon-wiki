// js/render/meta.js
export function renderMetaRaids(meta) {
  const root = document.getElementById("meta-raids-root");
  if (!root) return;
  root.innerHTML = "";

  const section = (label, items = []) => {
    if (!items.length) return "";
    const cards = items
      .map(
        (x) => `
      <div class="card">
        <div class="mon">
          <img loading="lazy" src="${x.image}" alt="${x.name}" />
          <div>
            <div class="title">${x.name}</div>
            <div class="meta">${x.role || ""}</div>
            ${x.moves ? `<div class="small">Moves: ${x.moves}</div>` : ""}
            ${x.notes ? `<div class="small">${x.notes}</div>` : ""}
          </div>
        </div>
      </div>
    `
      )
      .join("");
    return `
      <div class="h2">${label}</div>
      <div class="grid-cards">${cards}</div>
    `;
  };

  const { tiers, last_updated } = meta;
  root.insertAdjacentHTML(
    "beforeend",
    `
    ${section("S-Tier (Pflicht)", tiers.S)}
    ${section("A-Tier (Sehr stark)", tiers.A)}
    ${section("B-Tier (Gute Füller)", tiers.B)}
    ${section("C-Tier (Situativ)", tiers.C)}
    ${section("D-Tier (Nische)", tiers.D)}
    <div class="small" style="margin-top:10px;opacity:.8">Aktualisiert: ${new Date(
      last_updated
    ).toLocaleString("de-DE")}</div>
  `
  );
}

export function renderMetaPvp(meta) {
  const root = document.getElementById("meta-pvp-root");
  if (!root) return;
  root.innerHTML = "";

  const section = (label, items = []) => {
    if (!items.length) return "";
    const cards = items
      .map(
        (x) => `
      <div class="card">
        <div class="mon">
          <img loading="lazy" src="${x.image}" alt="${x.name}" />
          <div>
            <div class="title">${x.name}</div>
            <div class="meta">${x.role || ""}</div>
            ${x.iv_goal ? `<div class="small">IV-Ziel: ${x.iv_goal}</div>` : ""}
            ${x.moves ? `<div class="small">Moves: ${x.moves}</div>` : ""}
            ${x.notes ? `<div class="small">${x.notes}</div>` : ""}
          </div>
        </div>
      </div>
    `
      )
      .join("");
    return `
      <div class="h2">${label}</div>
      <div class="grid-cards">${cards}</div>
    `;
  };

  const { leagues, last_updated } = meta;
  root.insertAdjacentHTML(
    "beforeend",
    `
    ${section("Great League (1500)", leagues.Great)}
    ${section("Ultra League (2500)", leagues.Ultra)}
    ${section("Master League (∞)", leagues.Master)}
    <div class="small" style="margin-top:10px;opacity:.8">Aktualisiert: ${new Date(
      last_updated
    ).toLocaleString("de-DE")}</div>
  `
  );
}
