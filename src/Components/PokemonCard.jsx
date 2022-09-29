import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ url }) => {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios.get(url).then((res) => setPokemon(res.data));
  }, []);

  const navigate = useNavigate();

  return (
    <div
    onClick={() => navigate(`/pokedex/${pokemon.id}`)}
    className="container-card"
    >
    <img src={pokemon.sprites?.front_default} />
      <h3>Name: {pokemon.name}</h3>
      <h5>Type: {pokemon.types?.[0].type.name}</h5>

      <div className="pokemon-card-stats">
      <p>Hp: {pokemon.stats?.[0].base_stat}</p>
      <p>Attack: {pokemon.stats?.[1].base_stat}</p>
      <p>Defense: {pokemon.stats?.[2].base_stat}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
