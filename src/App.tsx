import React, { RefObject, KeyboardEvent } from 'react';
import './App.scss';
import { CharactersService } from './services';

class App extends React.Component {
  searchInputRef: RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.searchInputRef = React.createRef();

    this.handleKeyPressOnSearchInput = this.handleKeyPressOnSearchInput.bind(this);
  }

  componentDidMount(): void {
    this.searchInputRef?.current?.focus();
  }

  handleKeyPressOnSearchInput(event: KeyboardEvent): void {
    if ( ! event || ! event.key || event.key != 'Enter' ) {
      return;
    }

    CharactersService.find().then(result => {
      console.log(result);
    });
  }

  render() {
    return (
      <div className="container mt-3">
        <input type="text"
          ref={this.searchInputRef}
          onKeyPress={this.handleKeyPressOnSearchInput}/>
      </div>
    );
  }
}

export default App;
