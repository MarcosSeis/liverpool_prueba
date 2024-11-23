import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemones = createAsyncThunk(
  "pokemon/fetchPokemones",
  async (offset, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`
      );
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchPokemonByName = createAsyncThunk(
  "pokemon/searchPokemonByName",
  async (pokemonName, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      return [
        {
          name: data.name,
          id: data.id,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
        },
      ];
    } catch (error) {
      return rejectWithValue("Pokémon no encontrado");
    }
  }
);

export const fetchMockyData = createAsyncThunk(
  "pokemon/fetchMockyData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://run.mocky.io/v3/0a300625-de5d-48ff-a89d-d3eaba3b66b1"
      );
      return data.fields;
    } catch (error) {
      return rejectWithValue("Error al obtener los datos de Mocky");
    }
  }
);

const initialState = {
  pokemonData: [],
  offset: 0,
  hasMore: true,
  loading: false,
  error: null,
  filter: "",
  mockyData: [],
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    resetPokemonState: (state) => {
      state.pokemonData = [];
      state.offset = 0;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
      state.mockyData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemones.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemones.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonData = [...state.pokemonData, ...action.payload];
        if (action.payload.length === 0) {
          state.hasMore = false;
        }
      })
      .addCase(fetchPokemones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchPokemonByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPokemonByName.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.pokemonData = action.payload;
        state.hasMore = false;
      })
      .addCase(searchPokemonByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMockyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMockyData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.mockyData = action.payload;
      })
      .addCase(fetchMockyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPokemonState } = pokemonSlice.actions;
export default pokemonSlice.reducer;
