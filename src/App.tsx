import React, { RefObject, KeyboardEvent } from 'react';
import './App.scss';
import { Character } from './models';
import { CharactersService } from './services';
import { CharacterView } from './characters';

class App extends React.Component<{}, {
  searchTerm: string,
  characters: Character[]
}> {
  searchInputRef: RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      searchTerm: '',
      characters: [],
    }

    this.searchInputRef = React.createRef();
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleKeyPressOnSearchInput = this.handleKeyPressOnSearchInput.bind(this);
  }

  componentDidMount(): void {
    this.searchInputRef?.current?.focus();
  }

  handleSearchInputChange(event: any): void {
    if ( ! event.target ) {
      return;
    }
    this.setState({searchTerm: event.target.value})
  }

  handleKeyPressOnSearchInput(event: KeyboardEvent): void {
    if ( ! event || ! event.key || event.key !== 'Enter' ) {
      return;
    }

    CharactersService.find(this.state.searchTerm).then(result => {
      this.setState({
        characters: [...this.state.characters,...result.results]
      })
    });
  }

  render() {
    return (
      <div className="container mt-3">
        <input type="text" className="d-block mx-auto"
          ref={this.searchInputRef}
          onChange={this.handleSearchInputChange}
          onKeyPress={this.handleKeyPressOnSearchInput}/>

        <div className="results mx-auto my-3">
          <div className="row">
            {this.state.characters.map(character => {
              return (
                <div className="col-6">
                  <CharacterView key={character.id} character={character}></CharacterView>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
