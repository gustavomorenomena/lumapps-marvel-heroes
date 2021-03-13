import React from 'react';
import './App.scss';
import { SearchBox, CharacterResults } from './components';

import { connect, ConnectedProps, Provider } from 'react-redux';
import store from './redux/store';
import { State, StoreSelectors } from './redux';

const mapStateToProps = (state: State) => ({
  loading: StoreSelectors.selectLoading(state),
  error: StoreSelectors.selectError(state),
});

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>;

class AppClass extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="container mt-3">
        <SearchBox/>
        <CharacterResults/>
      </div>
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
