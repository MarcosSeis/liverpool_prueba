import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Toolbar, Snackbar, Alert, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { searchPokemonByName } from "../../store/pokemonSlice";

const PokemonSearch = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.pokemon);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFilterChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(searchPokemonByName(searchQuery.toLowerCase())).finally(() => {
        setOpenSnackbar(true);
      });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Toolbar>
        <SearchIcon className="icono" />
        <TextField
          className="textarea"
          label="Buscar Pokémon"
          variant="standard"
          value={searchQuery}
          onChange={handleFilterChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          sx={{ marginRight: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={!searchQuery.trim()}
        >
          Buscar
        </Button>
      </Toolbar>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error ? error : "¡Pokémon encontrado exitosamente!"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PokemonSearch;
