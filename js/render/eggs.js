// js/render/eggs.js
export function renderEggs(eggsData) {
  const root = document.getElementById("eggs-root");
  if (!root) return;
  root.innerHTML = "";

  const kmOrder = ["2km", "5km", "7km", "10km", "12km"];
  const blocks = kmOrder
    .map((k) => {
      const group = eggsData.eggs[k];
      if (!group || !group.pokemon?.length) return "";
      const cards = group.pokemon
        .map(
          (p) => `
      <div class="card-egg">
        <div class="mon">
          <img loading="lazy" src="${p.image}" alt="${p.name}" />
          <div>
            <div class="title">${p.name}</div>
            <div class="meta">${p.id ? `#${p.id}` : p.slug || ""}</div>
          </div>
        </div>
      </div>
    `
        )
        .join("");
      return `
      <div class="egg-group">
        <div class="egg-head">
          <span class="eggdot"></span>
          <div class="h2">${k}-Eier</div>
        </div>
        <div class="grid-cards">${cards}</div>
      </div>
    `;
    })
    .join("");

  root.insertAdjacentHTML(
    "beforeend",
    `
    ${blocks}
    <div class="small" style="margin-top:10px;opacity:.8">Aktualisiert: ${new Date(
      eggsData.last_updated
    ).toLocaleString("de-DE")}</div>
  `
  );
}
