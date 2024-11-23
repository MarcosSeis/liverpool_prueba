import PropTypes from "prop-types";
import Header from "../components/header/Header";
import PokemonSearch from "../components/list/PokemonSearch";
import Productos from "../components/list/Productos";

const Principal = (props) => {
  return (
    <>
      <Header />
      <div className="contenedor">
        <PokemonSearch className="busqueda" />
        <Productos />
      </div>
    </>
  );
};

Principal.propTypes = {};

export default Principal;
