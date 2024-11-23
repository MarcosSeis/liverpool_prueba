import { useDispatch } from "react-redux";
import { fetchPokemones, resetPokemonState } from "../../store/pokemonSlice";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(resetPokemonState());
    dispatch(fetchPokemones("1"));
    navigate("/");
  };

  return (
    <header className="header">
      <div className="contenedor contenido-header">
        <div onClick={handleClick}>
          <h1>Pokedex</h1>
        </div>

        <nav className="navegacion-principal">
          <Link to="/formulario">Formulario</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
