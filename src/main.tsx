import { Home } from 'app/components';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { store } from './app/store/index';

const AppLink = () => <div>Home Link</div>

ReactDOM.render(
  <Provider store={store}>
    <HashRouter >
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={AppLink} />  
      </React.Fragment>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
