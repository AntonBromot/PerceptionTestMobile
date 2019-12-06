import { FETCH_CHARASTERS, FETCH_CHARASTERS_ERROR, FETCH_CHARASTERS_SUCCESS, FIRST_ENTRY, UPDATE_CHARASTER_SUCCESS } from "../actions/charastersActions"

const initialState = {
    collections: [],
    fetching: false,
    firstEntry: false
}


export default function charastersReducer(state = initialState, { type, payload } ) {
    switch ( type ) {
        case FETCH_CHARASTERS:
            return { ...state, fetching: true };
        case FIRST_ENTRY:
            return { ...state, firstEntry: true }
        case FETCH_CHARASTERS_SUCCESS: {
            const { collections, shouldMerge } = payload,
                  newCollection = shouldMerge ? [ ...state.collections, ...collections ] : collections

            return { ...state, collections: newCollection, fetching: false, firstEntry: false };
        }
        case FETCH_CHARASTERS_ERROR:
            return { ...state, fetching: false };
        case UPDATE_CHARASTER_SUCCESS: {
            const { charaster, charaster: { id } } = payload,
                  index = state.collections.findIndex( item => item.id === id ),
                  newCollection = [ ...state.collections ];

            newCollection[index] = charaster
            return { ...state, collections: newCollection, fetching: false }
        }
        default:
            return state;
    }
}
