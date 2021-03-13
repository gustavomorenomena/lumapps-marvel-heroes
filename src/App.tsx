import React from 'react';
import './App.scss';
import { SearchBox, CharacterResults } from './components';

import { Provider } from 'react-redux';
import store from './redux/store';

class App extends React.Component<{}, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <div className="container mt-3">
          <SearchBox/>
          <CharacterResults/>
        </div>
      </Provider>
    );
  }
}

export default App;
