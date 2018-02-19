
import React, { PureComponent, PropTypes } from 'react';
import { Router, Route, Redirect, IndexRoute } from 'react-router';
import appHistory from './app_history';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';


import * as routes from './constants';
import IndexPage from '../views/index.jsx';
import MainPage from '../views/main';
import NotFound from '../views/notFound.jsx';
import Details from '../views/main/mainPageDetails';

/* -- -- -- -- */

class Routes extends PureComponent {
  render () {
    const {store} = this.props;

    return (
      <Provider store={store}>
        <Router history={syncHistoryWithStore(appHistory, store)}>
          <Route path={routes.ROOT} component={IndexPage}>
            <IndexRoute component={MainPage}/>

            <Route path={`${routes.DETAILS}/:uuid`} component={Details} />
            <Route path={routes.NOT_FOUND} component={NotFound}/>
            <Redirect from="*" to={routes.NOT_FOUND}/>
          </Route>
        </Router>
      </Provider>
    )
  }
}

Routes.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Routes;
