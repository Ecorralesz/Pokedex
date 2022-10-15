import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ url }) => {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios.get(url).then((res) => setPokemon(res.data));
  }, []);

  const navigate = useNavigate();

  console.log(pokemon);

  const colorTypes = {
    grass: "green",
    fire: "red",
    water: "blue",
    bug: "green",
    normal: "gray",
    fighting: "gray",
    flying: "gray",
    poison: "purple",
    ground: "brown",
    rock: "brown",
    ghost: "black",
    steel: "lightgray",
    electric: "yellow",
    psychic: "purple",
    ice: "lightblue",
    dragon: "gold",
    dark: "black",
    fairy: "pink",
    shadow: "black"
  };

  return (
    <div className="container-card">
      <div
        className="top-container-card"
        style={{ background: colorTypes[pokemon.types?.[0].type.name] }}
      ></div>

      <h3 className="puff-in-br">{pokemon.name}</h3>
      <img
        src={
          pokemon.sprites?.other.dream_world.front_default !== null
            ? pokemon.sprites?.other.dream_world.front_default
            : pokemon.sprites?.front_default
        }
        className="jello-vertical"
        onClick={() => navigate(`/pokedex/${pokemon.id}`)}
      />

      <h5> Type: </h5>
      <div className="types-flex">
        {pokemon.types?.map((type) => (
          <span
            key={type.type.id}
            style={{ background: colorTypes[type.type.name] }}
            className="puff-in-br"
          >
            {type.type.name} <br />
          </span>
        ))}
      </div>
      <p className="puff-in-br">Hp: {pokemon.stats?.[0].base_stat}</p>

      <div className="pokemon-card-stats">
        <p className="puff-in-br">Attack: {pokemon.stats?.[1].base_stat}</p>
        <p className="puff-in-br">Defense: {pokemon.stats?.[2].base_stat}</p>
        <p className="puff-in-br">Height: {pokemon.height}</p>
        <p className="puff-in-br">Weight: {pokemon.weight}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
