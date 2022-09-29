import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import { useNavigate } from "react-router-dom";


//''

const Pokedex = () => {
  const name = useSelector((state) => state.userName);
  const [typesList, setTypesList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1155")
      .then((res) => setPokemonList(res.data.results));

    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((res) => setTypesList(res.data.results));
  }, []);

  const navigate = useNavigate();
  const [nameInput, setNameInput] = useState("");

  const searchName = () => {
    navigate(`/pokedex/${nameInput}`);
  };

  const searchPokemon = (pokemonUrl) => {
    axios
      .get(pokemonUrl)
      .then((res) =>
        setPokemonList(res.data.pokemon.map((pokemon) => pokemon.pokemon))
      );
  };

  const [page, setPage] = useState(1);
  const pokemonsPerPage = 10;
  const lastCharacterIndex = page * pokemonsPerPage;
  const firstCharacterIndex = lastCharacterIndex - pokemonsPerPage;
  const pokemonsPaginated = pokemonList.slice(
    firstCharacterIndex,
    lastCharacterIndex
  );
  const totalPages = Math.ceil(pokemonList.length / pokemonsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pokedex-main-container"> 
      <div className="pokedex-header">
      <h1>Pokedex</h1>
      <p>
        {" "}
        Welcome: <b>{name}</b>
      </p>
      </div>

      <div className="pokedex-btn-cont">
        <div>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Prev Page
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next Page
          </button>
        </div>
      </div>

      <div className="pokedex-btn-pages">
        {pageNumbers.map((number) => (
          <button onClick={() => setPage(number)} key={number}>
            {number}
          </button>
        ))}
      </div>

      <div className="pokedex-btn-cont-2">
        <div>
        <input
          type="text"
          placeholder="Look for a Pokemon"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <button onClick={searchName}>Search</button>
        </div>
        <div>
        <select onChange={(e) => searchPokemon(e.target.value)}>
          <option value="">Select a pokemon type</option>
          {typesList.map((type) => (
            <option value={type.url} key={type.url}>
              {type.name}
            </option>
          ))}
        </select>
        </div>
      </div>
      
      <div className="pokedex-grid-container">
      {pokemonsPaginated.map((pokemon) => (
        <PokemonCard url={pokemon.url} key={pokemon.url} />
      ))}
      </div>
    </div>
  );
};

export default Pokedex;
