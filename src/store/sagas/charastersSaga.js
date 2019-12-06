import { put, select, call } from 'redux-saga/effects';

import { getAllCharastersSelector, getAllCharasterByIdSelector } from "../selectors/charastersSelector"
import { FETCH_CHARASTERS_SUCCESS, FETCH_CHARASTERS_ERROR, UPDATE_CHARASTER_SUCCESS, FIRST_ENTRY } from '../actions/charastersActions';
import { setAllCharasters, getCharaster, updateCharaster, getCharastersLimit, getAllCharasters } from '../databases/controllers/CharastersController';


export function* getCharasters( api, { offset=0, limit=15, callback=f=>f } ) {
    try {
        const isLazyLoad = offset > 0

        let collections = isLazyLoad ? [] : yield select( getAllCharastersSelector )

        if ( !collections.length ) collections = yield call( getCharastersLimit, { offset, limit }  )

        if ( !collections.length && !isLazyLoad ) {
            yield put({ type: FIRST_ENTRY });
            collections = yield call( api.getCharasters )
            yield call( setAllCharasters, collections )
            collections = yield call( getCharastersLimit, { offset, limit }  )
        }

        yield put({ type: FETCH_CHARASTERS_SUCCESS, payload: { collections, shouldMerge: isLazyLoad } });
        callback( collections );

    } catch (err) {
        //errorHandler({ err, selectedLanguage, withoutAlert: true });
        yield put({ type: FETCH_CHARASTERS_ERROR, err });
        callback( false );
    }
}

export function* getCharasterById( api, { id, callback=f=>f } ) {
    try {
        let charaster = yield select( getAllCharasterByIdSelector, id )

        if ( !charaster ) charaster = yield call( getCharaster, id )

        callback( charaster );

    } catch (err) {
        //errorHandler({ err, selectedLanguage, withoutAlert: true });
        yield put({ type: FETCH_CHARASTERS_ERROR, err });
        callback( false );
    }
}

export function* updateCharasterById( api, { id, data, callback=f=>f } ) {
    try {
        const charaster = yield call( updateCharaster, id, data )

        yield put({ type: UPDATE_CHARASTER_SUCCESS, payload: { charaster } });
        callback( charaster );

    } catch (err) {
        //errorHandler({ err, selectedLanguage, withoutAlert: true });
        yield put({ type: FETCH_CHARASTERS_ERROR, err });
        callback( false );
    }
}
