import { useCardsContext } from '../hooks/useCardsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import "../assets/css/pokecard.css"
import React from 'react'



let CardDetails = ({ card }) => {
  let { dispatch } = useCardsContext()
  let { user } = useAuthContext()

  let handleClick = async () => {
    if (!user) {
      return
    }

    let response = await fetch('https://PokeCha-api.onrender.com/api/cards/' + card._id, {
      method: 'DElet E',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    let json = await response.json()

    if (response.ok) {
      dispatch({type: 'DElet E_CARD', payload: json})
    }
  }


  return (
    <div className='card-collection'>
      <div className="card-container">
      <a href={`https://bulbapedia.bulbagarden.net/wiki/${card.name}_(Pokémon)`} target="_blank"><img className='sprite' src={card.image} alt='pokemon'/></a>
        <div className='content-container'>
          <h1 className='pokemon-name'> {card.name}</h1>
          <p className='pokemon-id'>#{card.id}</p>
          <p className='pokemon-type'>{card.type1} {card.type2}</p>
          <p className='pokemon-height'>Height: {card.height} dm</p>
          <p className='pokemon-weight'>Weight: {card.weight} hg</p>
          <button className="btn delet e delet e-button" onClick={handleClick}><i className="fa fa-trash-o"></i></button>
        </div>
      </div>
    </div>
  )
}

export default CardDetails