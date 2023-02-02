import { CardsContext } from '../context/CardsContext'
import { useContext } from 'react'

export let useCardsContext = () => {
  let context = useContext(CardsContext)

  if (!context) {
    throw Error('useCardsContext must be used inside an CardsContextProvider')
  }

  return context
}