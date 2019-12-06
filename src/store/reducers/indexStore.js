import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';

import reducers from './indexReducer';
import reduxPersist from '../../config/reduxPersist';
import indexSaga from '../sagas';

const persistConfig = reduxPersist.storeConfig,
      persistedReducer = persistReducer(persistConfig, reducers),
      sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    const store = createStore(persistedReducer,  applyMiddleware(sagaMiddleware) ),
          persistor = persistStore(store);

    sagaMiddleware.run(indexSaga);
    return { store, persistor };
}
