import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchMockyData } from "../store/pokemonSlice";
import Header from "../components/header/Header";
import FormMock from "../components/form/FormMock";
import { CircularProgress, Box, Typography } from "@mui/material";

const Form = (props) => {
  const dispatch = useDispatch();
  const { mockyData, loading, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchMockyData());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        flexDirection="column"
      >
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Cargando...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        flexDirection="column"
      >
        <Typography variant="h6" color="error">
          Error al cargar los datos: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={"4rem"}
        flexDirection="column"
      >
        <FormMock mockyData={mockyData} />
      </Box>
    </>
  );
};

Form.propTypes = {};

export default Form;
