"use client";

import styles from "../page.module.css";

const TYPE_PALETTE = {
  normal: "#A8A77A", fire: "#EE8130", water: "#6390F0", electric: "#F7D02C",
  grass: "#7AC74C", ice: "#96D9D6", fighting: "#C22E28", poison: "#A33EA1",
  ground: "#E2BF65", flying: "#A98FF3", psychic: "#F95587", bug: "#A6B91A",
  rock: "#B6A136", ghost: "#735797", dragon: "#6F35FC", steel: "#B7B7CE",
  fairy: "#D685AD"
};

export default function PokemonCard({ pokemon, onSelect }) {
  const formatId = String(pokemon.id).padStart(3, "0");
  const fallbackSprite = pokemon.sprites.front_default;
  const highResImage = pokemon.sprites.other["official-artwork"]?.front_default || fallbackSprite;

  return (
    <div className={styles.card} onClick={() => onSelect(pokemon)}>
      <span className={styles.pokeId}>#{formatId}</span>
      <img src={highResImage} alt={pokemon.name} width={110} height={110} />
      <h3 className={styles.pokeName}>{pokemon.name}</h3>
      <div className={styles.badgeContainer}>
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className={styles.typeBadge}
            style={{ backgroundColor: TYPE_PALETTE[t.type.name] || "#7f8c8d" }}
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}