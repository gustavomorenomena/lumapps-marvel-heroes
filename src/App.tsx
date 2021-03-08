import React, { RefObject, KeyboardEvent } from 'react';
import './App.scss';
import { Character } from './models';
import { CharactersService } from './services';
import { CharacterView } from './characters';

class App extends React.Component<{}, {
  searchTerm: string,
  characters: Character[],
  showFetchMoreResults: boolean,
  searchOffset?: number,
  loading: boolean,
  noResults: boolean,
}> {
  searchInputRef: RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      searchTerm: '',
      characters: [],
      showFetchMoreResults: false,
      loading: false,
      noResults: false,
    }

    this.searchInputRef = React.createRef();
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleKeyPressOnSearchInput = this.handleKeyPressOnSearchInput.bind(this);
    this.handleClickFetchMoreResults = this.handleClickFetchMoreResults.bind(this);
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

    this.setState({
      loading: true,
      noResults: false,
    });

    CharactersService.find(this.state.searchTerm).then(result => {
      if (result.results.length === 0) {
        return this.setState({
          noResults: true
        });
      }
      this.setState({
        characters: result.results,
        showFetchMoreResults: result.offset + result.results.length < result.total,
        searchOffset: result.results.length,
        loading: false
      });
    });
  }

  handleClickFetchMoreResults(): void {
    this.setState({
      loading: true,
    });
    CharactersService.find(this.state.searchTerm, this.state.searchOffset).then(result => {
      this.setState({
        characters: [...this.state.characters, ...result.results],
        showFetchMoreResults: result.offset + result.results.length < result.total,
        searchOffset: this.state.characters.length + result.results.length,
        loading: false
      });
    });
  }

  render() {
    return (
      <div className="container mt-3">
        <input type="text" className="d-block mx-auto"
          ref={this.searchInputRef}
          onChange={this.handleSearchInputChange}
          onKeyPress={this.handleKeyPressOnSearchInput}/>

        {!this.state.noResults? <div className="results mx-auto my-3">
          <div className="row">
            {this.state.characters.map(character => {
              return (
                <div className="col-sm-6 mb-1">
                  <CharacterView key={character.id} character={character}></CharacterView>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-2">
            {this.state.loading?
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div> : this.state.showFetchMoreResults &&
            <button className="btn btn-primary" onClick={this.handleClickFetchMoreResults}>
                More results
            </button>}
          </div>
        </div> : <div className="alert alert-primary mt-2" role="alert">
          No results were found
        </div>}
      </div>
    );
  }
}

export default App;
