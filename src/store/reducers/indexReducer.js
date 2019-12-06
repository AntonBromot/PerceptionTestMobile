import { combineReducers } from 'redux';
import charactersReducer from './charactersReducer';
import favoritesReducer from './favoritesReducer';

const reducers = {
    characters: charactersReducer,
    favorites: favoritesReducer,
};

const appReducer = combineReducers(reducers),
    rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
