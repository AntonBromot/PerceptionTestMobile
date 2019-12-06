export const FETCH_FAVORITES = "FETCH_FAVORITES"
export const FETCH_FAVORITES_SUCCESS = "FETCH_FAVORITES_SUCCESS"
export const FETCH_FAVORITES_ERROR = "FETCH_FAVORITES_ERROR"
export const SET_FAVORITE = "SET_FAVORITE"
export const SET_FAVORITE_SUCCESS = "SET_FAVORITE_SUCCESS"
export const REMOVE_FAVORITE = "REMOVE_FAVORITE"
export const REMOVE_FAVORITE_SUCCESS = "REMOVE_FAVORITE_SUCCESS"

export const getFavorites = ( fromFavoritePage=false, callback=f=>f ) => ({ type: FETCH_FAVORITES, fromFavoritePage, callback })

export const setFavorite = ( id, callback=f=>f ) => ({ type: SET_FAVORITE, id, callback })

export const removeFavorite = ( id, callback=f=>f ) => ({ type: REMOVE_FAVORITE, id, callback })

