

export const POKE_API = "https://pokeapi.co/api/v2/pokemon";
export const PAGE_SIZE = 20;

export async function fetchPokemonData(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch details: ${res.status}`);
  }
  return await res.json();
}