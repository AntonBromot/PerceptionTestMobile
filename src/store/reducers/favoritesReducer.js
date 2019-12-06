import { FETCH_FAVORITES, FETCH_FAVORITES_ERROR, FETCH_FAVORITES_SUCCESS,
         SET_FAVORITE, SET_FAVORITE_SUCCESS, REMOVE_FAVORITE, REMOVE_FAVORITE_SUCCESS } from "../actions/favoritesActions"

const initialState = {
    favorites: [],
    favoritesIds: [],
    fetching: false
}


export default function favoritesReducer(state = initialState, { type, payload } ) {
    switch ( type ) {
        case FETCH_FAVORITES:
            return { ...state, fetching: true };
        case FETCH_FAVORITES_SUCCESS: {
            const { favorites, favoritesIds } = payload
            return { ...state, favorites, favoritesIds, fetching: false };
        }
        case FETCH_FAVORITES_ERROR:
            return { ...state, fetching: false };
        case SET_FAVORITE:
            return { ...state };
        case SET_FAVORITE_SUCCESS: {
            const { favoritesIds } = payload
            return { ...state, favoritesIds };
        }
        case REMOVE_FAVORITE:
            return { ...state }
        case REMOVE_FAVORITE_SUCCESS: {
            const { favoritesIds, favorites } = payload
            // toDO get and push favorites
            return { ...state, favoritesIds, favorites };
        }
        default:
            return state;
    }
}
