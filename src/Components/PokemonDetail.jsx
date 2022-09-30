import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate();
  const [ pokemonMoves, setPokemonMoves ] = useState([])


  console.log(pokemonMoves)


  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setPokemon(res.data));

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        setPokemonMoves(res.data.moves.map((move) => move.move.name))
      });
  }, []);


  return (
    <div className="pokemon-detail-cont">
      <div className="pokemon-detail-card">
        <div className="pokemon-detail-card-img">
          <img src={pokemon.sprites?.other.dream_world.front_default} />
        </div>
        <div className="pokemon-detail-card-details">
        <div className="pokemon-detail-card-name">
          <h2># {pokemon.id}</h2>
          <h3>{pokemon.name}</h3>
          <h5> Type: {pokemon.types?.[0].type.name}</h5>
        </div>
        <div className="pokemon-card-stats">
        <p>Hp: {pokemon.stats?.[0].base_stat}</p>
        <p>Attack: {pokemon.stats?.[1].base_stat}</p>
        <p>Defense: {pokemon.stats?.[2].base_stat}</p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <button onClick={() => navigate(-1)}>Return</button>
        </div>
        <hr/>
        <h3 className="title">Abilities</h3>
        <div className="moves-container">
        <p>{pokemon.abilities?.[0].ability.name}</p>
        <p>{pokemon.abilities?.[1].ability.name}</p>
        </div>
        <hr />
        <h3 className="title">Moves</h3>
        <div className="pokemon-moves">
        {pokemonMoves.map((move) => (
          <button>
            {move}
          </button>
        ))}
      </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
