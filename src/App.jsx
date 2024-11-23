import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Principal from "./pages/Principal";
import Pokemon from "./pages/Pokemon";
import Form from "./pages/Form";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Principal />} />
          <Route exact path="/:pokemonId" element={<Pokemon />} />
          <Route exact path="/formulario" element={<Form />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
