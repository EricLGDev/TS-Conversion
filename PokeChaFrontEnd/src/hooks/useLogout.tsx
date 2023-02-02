import { useAuthContext } from "./useAuthContext";
import { useCardsContext } from "./useCardsContext";

export let useLogout = () => {
    let { dispatch } = useAuthContext()
    let { dispatch: dispatchCards } = useCardsContext()
    

    let logout = () => {
        // REMOVE USER FROM STORAGE
        localStorage.removeItem('user')

        // DISPATCH LOGOUT
        dispatch({type: 'LOGOUT'})
        dispatchCards({ type: 'SET_CARDS', payload: null})
    }

    return { logout }
}