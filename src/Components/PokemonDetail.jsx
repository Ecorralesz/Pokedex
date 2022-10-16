import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setIsLoading } from "../store/slices/loadingScreen.slice";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const navigate = useNavigate();
  const [pokemonMoves, setPokemonMoves] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setPokemon(res.data))
      .finally(() => dispatch(setIsLoading(false)));

    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => {setPokemonMoves(res.data.moves.map((move) => move.move.name))

    });
  }, []);

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
    shadow: "black",
  };

  const attack = pokemon.stats?.[1].base_stat;
  const defense = pokemon.stats?.[2].base_stat;
  const specialAttack = pokemon.stats?.[3].base_stat;
  const specialDeffense = pokemon.stats?.[4].base_stat;
  const speed = pokemon.stats?.[5].base_stat;

  return (
    <div className="pokemon-detail-cont">
      <div className="pokemon-detail-card">
        <div className="container-card">
          <div
            className="top-container-card"
            style={{ background: colorTypes[pokemon.types?.[0].type.name] }}
          ></div>
          <h3 className="puff-in-br">{pokemon.name}</h3>
          <img className="jello-vertical" src={pokemon.sprites?.other.dream_world.front_default} />
          <h5 className="puff-in-br"> Type: </h5>
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
          <div className="pokemon-card-stats puff-in-br" style={{ marginTop: "30px" }}>
            <h2># {pokemon.id}</h2>
            <p>Hp: {pokemon.stats?.[0].base_stat}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
          </div>
        </div>
      </div>
      <div className="stats__container puff-in-br">
        <h2 className="stats">Stats</h2>
      <div className="progress">
        <div className="progress__fill" style={{ width: attack }}></div>
        <span className="progress__text">
          Attack:{attack}
        </span>
      </div>
      <div className="progress">
        <div className="progress__fill" style={{ width: defense }}></div>
        <span className="progress__text">
          Defense:{defense}
        </span>
      </div>
      <div className="progress">
        <div className="progress__fill" style={{ width: specialAttack }}></div>
        <span className="progress__text">
          Special Attack:{specialAttack}
        </span>
      </div>
      <div className="progress">
        <div className="progress__fill" style={{ width: specialDeffense }}></div>
        <span className="progress__text">
          Special Deffense:{specialDeffense}
        </span>
      </div>
      <div className="progress">
        <div className="progress__fill" style={{ width: speed }}></div>
        <span className="progress__text">
          Speed:{specialDeffense}
        </span>
      </div>
      <div className="abilities-cont">
          <h3 className="title-abilities" style={{ margin: "0" }}>
            Abilities
          </h3>
          <div className="moves-container">
            <p
            style={{ background: colorTypes[pokemon.types?.[0].type.name] }}
            >{pokemon.abilities?.[0]?.ability.name}</p>
            <p
            style={{ background: colorTypes[pokemon.types?.[0].type.name] }}
            >{pokemon.abilities?.[1]?.ability.name}</p>
          </div>
        </div>
      </div>
      <div className="pokemon-detail-card-details">
        <div 
        className="pokeball-smaller"
        >
          <div className="pokeball" onClick={() => navigate(-1)}>
            <div 
            className="pokeball__button" 
            style={{fontFamily: "Arcade", fontSize: "10px", color: "black"}}
            >GO BACK</div>
          </div>
        </div>
        <h3 
        className="puff-in-br stats"
        >Moves</h3>
        <div 
        className="pokemon-moves tracking-in-expand-fwd"
        >
          {pokemonMoves.map((move) => (
            <button 
            key={move}
            style={{ background: colorTypes[pokemon.types?.[0].type.name] }}
            >{move}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
