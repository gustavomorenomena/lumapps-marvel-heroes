import React, { RefObject, KeyboardEvent, ReactElement } from 'react';
import './App.scss';
import { Character } from './models';
import { CharactersService } from './services';
import { CharacterCard, SearchBox } from './components';

import { Provider } from 'react-redux';
import store from './redux/store';

const errors = {
  timeout: 'Request couldn\'t be completed. Please try again.'
}

class App extends React.Component<{}, {
  searchTerm: string,
  characters: Character[],
  showFetchMoreResults: boolean,
  searchOffset?: number,
  loading: boolean,
  noResults: boolean,
  error?: string,
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
          noResults: true,
          characters: []
        });
      }
      this.setState({
        characters: result.results,
        showFetchMoreResults: result.offset + result.results.length < result.total,
        searchOffset: result.results.length,
        loading: false,
        error: undefined,
      });
    }, () => {
      this.setState({
        loading: false,
        error: errors.timeout
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
        loading: false,
        error: undefined
      });
    }, () => {
      this.setState({
        error: errors.timeout,
        loading: false
      });
    });
  }

  render() {
    const renderError = (): ReactElement | undefined => {
      if ( ! this.state.error ) {
        return;
      }
      return (
        <div className="alert alert-danger mt-2">
          {this.state.error}
        </div>
      )
    }

    const renderResults = (): ReactElement | undefined => {
      if ( this.state.noResults ) {
        return (
          <div className="alert alert-primary mt-2" role="alert">
            No results were found
          </div>
        );
      }

      if ( this.state.error && ! this.state.characters.length ) {
        // Search request failed
        return renderError();
      }

      return (
        <div className="results mx-auto my-3">
          {this.state.characters.map(character => {
            return (
              <div key={character.id}>
              <CharacterCard character={character}></CharacterCard>
              </div>
            );
          })}

          <div className="text-center mt-2">
            {this.state.loading?
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div> : this.state.showFetchMoreResults && [
              this.state.error && renderError(),
              <button className="btn btn-primary" onClick={this.handleClickFetchMoreResults}>
                More results
              </button>]
            }
          </div>
        </div>
      )
    }

    return (
      <Provider store={store}>
        <div className="container mt-3">
          <SearchBox></SearchBox>
          {renderResults()}
        </div>
      </Provider>
    );
  }
}

export default App;
