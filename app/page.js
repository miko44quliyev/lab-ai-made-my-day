"use client";

import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonDetail from "./components/PokemonDetail";
import Pagination from "./components/Pagination";
import styles from "./page.module.css";
import { POKE_API, PAGE_SIZE, fetchPokemonData } from "./lib/pokeapi";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true);
      setError(null);

      try {
        const offset = (page - 1) * PAGE_SIZE;
        const res = await fetch(`${POKE_API}?limit=${PAGE_SIZE}&offset=${offset}`);

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        
        // Secondary resolving phase: fetch full detail payloads for every grid position
        const compositeDetailPayloads = await Promise.all(
          data.results.map((p) => fetchPokemonData(p.url))
        );
        
        setPokemon(compositeDetailPayloads);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, [page]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>Pokédex</h1>
        <p className={styles.subtitle}>Click on a Pokémon to see its details.</p>
      </header>

      {loading && <p className={styles.loading}>Loading Pokémon…</p>}

      {error && (
        <div className={styles.errorBox}>
          <strong>Oops! We couldn&apos;t load the Pokémon.</strong>
          <p style={{ marginTop: "4px", fontSize: "14px" }}>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className={styles.grid}>
            {pokemon.map((p) => (
              <PokemonCard key={p.id} pokemon={p} onSelect={setSelected} />
            ))}
          </div>

          <Pagination
            page={page}
            onPrev={() => setPage((prev) => Math.max(1, prev - 1))}
            onNext={() => setPage((prev) => prev + 1)}
          />
        </>
      )}

      {selected && (
        <PokemonDetail pokemon={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}