import React from 'react';
import './App.scss';
import { SearchBox, CharacterResults, Spinner, Error, CharacterView } from './components';

import { connect, ConnectedProps, Provider } from 'react-redux';
import store from './redux/store';
import { State, StoreSelectors } from './redux';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

const mapStateToProps = (state: State) => ({
  loading: StoreSelectors.selectLoading(state),
});

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>;

class AppClass extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="container mt-3">
          <SearchBox/>
          {
            ! this.props.loading ?
            <Switch>
              <Route path="/" exact>
                <CharacterResults/>
              </Route>
              <Route path="/:characterId">
                <CharacterView></CharacterView>
              </Route>
              <Redirect to="/" />
            </Switch>
            :
            <div className="text-center mt-3">
              <Spinner/>
            </div>
          }
          <Error/>
        </div>
      </Router>
    );
  }
}

const App = connector(AppClass);

export const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
