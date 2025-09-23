// js/utils/images.js
import { PLACEHOLDER_IMG } from "../config.js";

export function imageURL({ id, slug, image }) {
  if (image && /^https?:\/\//i.test(image)) return image;

  const idStr = (id ?? "").toString().trim();
  if (idStr) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idStr}.png`;
  }

  const slugStr = (slug ?? "").toString().trim().toLowerCase();
  if (slugStr) {
    return `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${slugStr}.png`;
  }

  return PLACEHOLDER_IMG;
}
