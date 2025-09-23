// js/render/rocket.js
export function renderRocket(rocket) {
  const root = document.getElementById("rocket-root");
  if (!root) return;
  root.innerHTML = "";

  // Grunts
  const gruntBlocks = rocket.grunts
    .map(
      (g) => `
    <div class="card-rocket">
      <div class="title">${g.type}</div>
      <div class="grid-cards">
        ${g.lineup
          .map(
            (m) => `
          <div class="card-rocket">
            <div class="mon">
              <img loading="lazy" src="${m.image}" alt="${m.name}" />
              <div>
                <div class="title">${m.name}</div>
                <div class="meta">${m.id ? `#${m.id}` : m.slug || ""}</div>
              </div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `
    )
    .join("");

  // Leaders
  const leaderBlocks = rocket.leaders
    .map(
      (l) => `
    <div class="card-rocket">
      <div class="title">Anführer: ${l.name}</div>
      ${l.teams
        .map(
          (slot, idx) => `
        <div class="slot">Slot ${idx + 1}</div>
        <div class="grid-cards">
          ${slot
            .map(
              (m) => `
            <div class="card-rocket">
              <div class="mon">
                <img loading="lazy" src="${m.image}" alt="${m.name}" />
                <div>
                  <div class="title">${m.name}</div>
                  <div class="meta">${m.id ? `#${m.id}` : m.slug || ""}</div>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `
        )
        .join("")}
    </div>
  `
    )
    .join("");

  // Boss
  const boss = rocket.boss;
  const bossBlock = `
    <div class="card-rocket">
      <div class="title">Boss: ${boss.name}</div>
      ${boss.lineup
        .map(
          (slot, idx) => `
        <div class="slot">Slot ${idx + 1}</div>
        <div class="grid-cards">
          ${slot
            .map(
              (m) => `
            <div class="card-rocket">
              <div class="mon">
                <img loading="lazy" src="${m.image}" alt="${m.name}" />
                <div>
                  <div class="title">${m.name}</div>
                  <div class="meta">${m.id ? `#${m.id}` : m.slug || ""}</div>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `
        )
        .join("")}
    </div>
  `;

  root.insertAdjacentHTML(
    "beforeend",
    `
    <div class="h2">Grunts</div>
    ${gruntBlocks || '<div class="small">Keine Daten.</div>'}

    <div class="h2" style="margin-top:16px;">Anführer</div>
    ${leaderBlocks || '<div class="small">Keine Daten.</div>'}

    <div class="h2" style="margin-top:16px;">Giovanni</div>
    ${bossBlock}

    <div class="small" style="margin-top:10px;opacity:.8">Aktualisiert: ${new Date(
      rocket.last_updated
    ).toLocaleString("de-DE")}</div>
  `
  );
}
