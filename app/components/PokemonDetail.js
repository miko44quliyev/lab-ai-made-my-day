"use client";

import styles from "../page.module.css";

export default function PokemonDetail({ pokemon, onClose }) {
  const formatId = String(pokemon.id).padStart(3, "0");
  const fallbackSprite = pokemon.sprites.front_default;
  const highResImage = pokemon.sprites.other["official-artwork"]?.front_default || fallbackSprite;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeX} onClick={onClose}>&times;</button>
        
        <h2 className={styles.pokeName}>{pokemon.name} (#{formatId})</h2>
        <img src={highResImage} alt={pokemon.name} width={180} height={180} />

        <div className={styles.detailStats}>
          <div className={styles.statLine}>
            <strong>Height:</strong>
            <span>{pokemon.height / 10} m</span>
          </div>
          <div className={styles.statLine}>
            <strong>Weight:</strong>
            <span>{pokemon.weight / 10} kg</span>
          </div>
          
          {pokemon.stats.map((s) => (
            <div className={styles.statLine} key={s.stat.name}>
              <strong style={{ textTransform: "capitalize" }}>
                {s.stat.name.replace("-", " ")}:
              </strong>
              <span>{s.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}