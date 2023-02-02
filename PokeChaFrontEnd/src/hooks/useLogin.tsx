import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export let useLogin = () => {
  let [error, setError] = useState(null)
  let [isLoading, setIsLoading] = useState(null)
  let { dispatch } = useAuthContext()

  let login = async (email: any, password: any) => {
    setIsLoading(true)
    setError(null)

    let response = await fetch('https://PokeCha-api.onrender.com/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    let json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}