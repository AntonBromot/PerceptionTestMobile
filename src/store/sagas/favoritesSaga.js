import { put, select, call } from 'redux-saga/effects';

import { getFavoritesIdsSelector } from "../selectors/favoritesSelector"
import { getAllCharastersSelector } from "../selectors/charastersSelector"
import {
    FETCH_FAVORITES_SUCCESS,
    FETCH_FAVORITES_ERROR,
    SET_FAVORITE_SUCCESS,
    REMOVE_FAVORITE_SUCCESS,
} from '../actions/favoritesActions';
import { getFavoritesIds, setFavoriteId, removeFavoriteId } from '../databases/controllers/FavoritesController';
import { getAllCharasters } from '../databases/controllers/CharastersController';

export function* getFavorites( api, { fromFavoritePage, callback } ) {
    try {
        let allCharasters = yield select( getAllCharastersSelector );

        if ( !allCharasters.length && fromFavoritePage) allCharasters = yield call(getAllCharasters)

        let favoritesIds = yield select( getFavoritesIdsSelector );

        if ( !favoritesIds.length ) favoritesIds = yield call( getFavoritesIds);

        const favorites = allCharasters.filter( ({ id }) => favoritesIds.includes( id ) )

        yield put({ type: FETCH_FAVORITES_SUCCESS, payload: { favorites, favoritesIds } });
        callback( favorites );
    } catch (err) {
        //errorHandler({ err, selectedLanguage, withoutAlert: true });
        yield put({ type: FETCH_FAVORITES_ERROR, err });
        callback( false );
    }
}

export function* setFavorite( api, { id, callback } ) {
    try {
        const favoritesIds = yield call( setFavoriteId, id )
        yield put({ type: SET_FAVORITE_SUCCESS, payload: { favoritesIds } });
        callback( favoritesIds );
    } catch (err) {
        //errorHandler({ err, selectedLanguage, withoutAlert: true });
        yield put({ type: FETCH_FAVORITES_ERROR, err });
        callback( false );
    }
}

export function* removeFavorite( api, { id, callback } ) {
    try {
        const allCharasters = yield select( getAllCharastersSelector ),
              favoritesIds = yield call( removeFavoriteId, id ),
              favorites = allCharasters.filter( ({ id }) => favoritesIds.includes( id ) );

        yield put({ type: REMOVE_FAVORITE_SUCCESS, payload: { favoritesIds, favorites } });
        callback( favorites );

    } catch (err) {
        //errorHandler({ err, selectedLanguage, withoutAlert: true });
        yield put({ type: FETCH_FAVORITES_ERROR, err });
        callback( false );
    }
}
