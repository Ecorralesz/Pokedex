import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserInput from "./Components/UserInput";
import Pokedex from "./Components/Pokedex";
import PokemonDetail from "./Components/PokemonDetail";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import LoadingScreen from "./Components/LoadingScreen";
import { useSelector } from "react-redux";


function App() {

  const isLoading = useSelector(state => state.isLoading)
  return (
    <HashRouter>
      <div className="App">
        {isLoading && <LoadingScreen />}
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
