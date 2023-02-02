import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCardsContext } from '../hooks/useCardsContext'

let GachaSystem = () => {
  let { user } = useAuthContext()
  let { dispatch } = useCardsContext()

  async function getPokemonData(pokemonId: number) {
      let response = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      let data = await response.json();
      return data;
    }

  async function rollPokemon() {

      let randomPokemonId = Math.floor(Math.random() * 905) + 1;
      let data = await getPokemonData(randomPokemonId);
      let pokemonId = data.id;
      let pokemonName = data.name;
      let pokemonType1 = data.types[0].type.name;
      let pokemonType2 = data.types[1]?.type.name ?? null;
      let pokemonWeight = data.weight;
      let pokemonHeight = data.height;
      let pokemonImage = data.sprites.front_default;
      let card = {
          id: pokemonId,
          name: pokemonName,
          type1: pokemonType1,
          type2: pokemonType2,
          height: pokemonHeight,
          weight: pokemonWeight,
          image: pokemonImage,
      };
      let options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
          
        },
        body: JSON.stringify(card)
      };
      let response = fetch('https://PokeCha-api.onrender.com/api/cards', options);
      let json = await response.json();
      if (response.ok) {
        dispatch({type: 'CREATE_CARDS', payload: json})
      }
    }

    return (
      <button className='roll-button btn' onClick={() => rollPokemon()}>Roll Pokemon</button>
    )
  } 


export default GachaSystem

function fetch(arg0: string) {
  throw new Error('Function not implemented.')
}
