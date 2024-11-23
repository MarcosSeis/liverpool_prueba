import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Alert,
  Box,
  Typography,
  Snackbar,
} from "@mui/material";

const FormMock = ({ mockyData }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setOpenSnackbar(true);
  };

  useEffect(() => {
    reset();
  }, [mockyData, reset]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <Box mb={2} className="field-container">
        {mockyData && mockyData.length > 0 ? (
          mockyData.map((field) => (
            <Box key={field.identifier} mb={2} className="field-box">
              <TextField
                label={field.friendlyName}
                fullWidth
                required={field.mandatory}
                {...register(field.identifier, {
                  required:
                    field.mandatory && `${field.friendlyName} es obligatorio`,
                })}
                error={!!errors[field.identifier]}
                helperText={errors[field.identifier]?.message}
                variant="outlined"
                className="input-field"
              />
            </Box>
          ))
        ) : (
          <Alert severity="warning" className="alert-warning">
            No se encontraron campos para mostrar.
          </Alert>
        )}
      </Box>
      {errors && (
        <Box mb={2} className="error-message">
          <Typography color="error">
            Por favor, complete todos los campos obligatorios.
          </Typography>
        </Box>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="submit-button"
      >
        Enviar
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Formulario enviado exitosamente!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </form>
  );
};

FormMock.propTypes = {
  mockyData: PropTypes.array.isRequired,
};

export default FormMock;
