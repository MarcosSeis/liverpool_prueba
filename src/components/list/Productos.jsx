import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import { fetchPokemones } from "../../store/pokemonSlice";

const Productos = () => {
  const dispatch = useDispatch();
  const loader = useRef(null);

  const { pokemonData, offset, hasMore, loading } = useSelector(
    (state) => state.pokemon
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          dispatch(fetchPokemones(offset));
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) observer.observe(loader.current);

    return () => observer.disconnect();
  }, [dispatch, hasMore, offset, loading]);

  useEffect(() => {
    if (pokemonData.length === 0 && hasMore) {
      dispatch(fetchPokemones(offset));
    }
  }, [dispatch, pokemonData.length, offset, hasMore]);

  return (
    <div className="productos">
      {pokemonData.map((pokemon, index) => {
        const pokemonId = pokemon.id || index + 1;
        return (
          <div key={pokemonId} className="producto">
            <PokemonCard name={pokemon.name} index={pokemonId} />
          </div>
        );
      })}
      {hasMore && !loading && (
        <div ref={loader} style={{ height: "50px", marginTop: "10px" }}>
          <p>Cargando más Pokémon...</p>
        </div>
      )}
      {loading && <p>Cargando...</p>}
    </div>
  );
};

export default Productos;
