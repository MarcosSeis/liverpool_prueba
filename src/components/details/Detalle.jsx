import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Typography, CircularProgress, Button } from "@mui/material";
import { capsFirst } from "../../helpers";

const Detalle = (props) => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        setPokemon(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon();
  }, [pokemonId]);

  const generadorPokemon = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const imagenUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    const { front_default } = sprites;

    return (
      <>
        <Typography variant="h1" className="titulo">
          {`${id}.`}
          {capsFirst(name)}
          <img src={front_default} alt={`Sprite ${name}`} />
        </Typography>
        <img src={imagenUrl} alt={`Imagen ${name}`} className="imagen" />
        <Typography variant="h3" className="info">
          Pokemon Info
        </Typography>

        <Typography className="centertext">
          <span className="bold">Especie:</span> {species.name}
        </Typography>
        <Typography className="centertext">
          <span className="bold">Altura:</span> {height}
        </Typography>
        <Typography className="centertext">
          <span className="bold">Peso:</span> {weight}
        </Typography>
        <Typography variant="h6" className="centertext bold">
          {types.length > 1 ? "Tipos:" : "Tipo:"}
        </Typography>

        {types.map((tipoInfo) => {
          const { type } = tipoInfo;
          const { name } = type;

          return (
            <Typography key={name} className="centertext">
              {name}
            </Typography>
          );
        })}
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && (
        <div className="carga">
          <CircularProgress color="warning" />
        </div>
      )}
      {pokemon !== undefined && pokemon && generadorPokemon()}
      {pokemon === false && <Typography> Pokemon no encontrado</Typography>}
      {pokemon !== undefined && (
        <Link to={`/`} className="link">
          <div className="btn">
            <Button variant="contained">Regresa a la pokedex</Button>
          </div>
        </Link>
      )}
    </>
  );
};

Detalle.propTypes = {};

export default Detalle;
