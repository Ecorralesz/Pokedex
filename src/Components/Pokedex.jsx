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
    <div 
    className="pokedex-main-container"
    >
      <div 
      className="pokedex-header"
      >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2000px-International_Pok%C3%A9mon_logo.svg.png"
        alt="Pokemon"
        className="tracking-in-expand"
        onClick={() => navigate('/')}
      ></img>
        <p className="tracking-in-expand">
          {" "}
          Welcome: <b>{name}</b>
        </p>
      </div>

      <div className="pokedex-btn-cont-2">
        <div className="input-userLogin">
          <input
            type="text"
            placeholder="Look for a Pokemon by Name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="shadow-pop-tr"
          />
          <button onClick={searchName} className="shadow-pop-tr">Search</button>
        </div>
        <br />
        <div >
          <select onChange={(e) => searchPokemon(e.target.value)} className="shadow-pop-tr">
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

      <div className="pokedex-btn-cont">
        <div style={{marginBottom: "20px"}}>
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
        <br />
      </div>

      <div className="pokedex-btn-pages">
        {pageNumbers.map((number) => (
          <button onClick={() => setPage(number)} key={number} className="rotate-center shadow-pop-tr">
            {number}
          </button>
        ))}
      </div>

{/* 
      <div className="lines-cont">
          <div className="first-line"></div>
          <div className="second-line"></div>
        </div> */}
    </div>
  );
};

export default Pokedex;
