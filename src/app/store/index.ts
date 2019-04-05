import { logger } from 'app/middleware';
import { rootReducer } from 'app/reducers';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { IArgosStore } from '../../../interfaces';

export function configureStore(initialState?): Store<IArgosStore> {
  let middleware = applyMiddleware(logger);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer as any, initialState as any,
    composeEnhancers(
      applyMiddleware(...getMiddlewares())
    )) as Store<IArgosStore>;

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store as any;
}

export const store = configureStore()

function getMiddlewares() {
  let middlewares = [
    thunk,
    promise
  ];
  return middlewares;
}
