import { takeEvery } from 'redux-saga/effects';
import API from '../../services/api';

import { FETCH_CHARASTERS, FETCH_CHARASTER_BY_ID, UPDATE_CHARASTER } from '../actions/charastersActions'
import { FETCH_FAVORITES, SET_FAVORITE, REMOVE_FAVORITE } from '../actions/favoritesActions'

import { getCharasters, getCharasterById, updateCharasterById } from './charastersSaga'
import { getFavorites, setFavorite, removeFavorite } from './favoritesSaga'

function* rootSaga() {
    yield takeEvery( FETCH_CHARASTERS, getCharasters, API )
    yield takeEvery( FETCH_FAVORITES, getFavorites, API )
    yield takeEvery( SET_FAVORITE, setFavorite, API )
    yield takeEvery( REMOVE_FAVORITE, removeFavorite, API )
    yield takeEvery( FETCH_CHARASTER_BY_ID, getCharasterById, API )
    yield takeEvery( UPDATE_CHARASTER, updateCharasterById, API )
}

export default rootSaga;
