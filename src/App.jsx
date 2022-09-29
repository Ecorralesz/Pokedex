import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserInput from "./Components/UserInput";
import Pokedex from "./Components/Pokedex";
import PokemonDetail from "./Components/PokemonDetail";
import ProtectedRoutes from "./Components/ProtectedRoutes";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserInput />} />

          <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:id" element={<PokemonDetail />} />
          </Route>

        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
