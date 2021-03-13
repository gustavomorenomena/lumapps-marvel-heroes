import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { State, StoreActions, StoreSelectors } from '../../redux';
import { CharactersService } from '../../services';
import { CharacterCard } from '../character-card/character-card';

let isInit = true;

const mapStateToProps = (state: State) => {
  const characters = StoreSelectors.selectCharacters(state);
  const total = StoreSelectors.selectTotal(state);
  const noResults = ! isInit && ! characters.length;

  isInit = false

  return {
    characters,
    total,
    noResults,
  }
}

const connector = connect(mapStateToProps, {
  addCharacters: StoreActions.addCharacters
});

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {};

class CharacterResultsClass extends React.Component<Props, {
  loading: boolean,
}> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: false,
    }

    this.handleClickFetchMoreResults = this.handleClickFetchMoreResults.bind(this);
  }

  handleClickFetchMoreResults(): void {
    this.setState({
      loading: true,
    });

    CharactersService.fetchMoreResults(this.props.characters.length).then(characters => {
      this.props.addCharacters(characters);
    }).finally(() => {
      this.setState({
        loading: false
      })
    });
  }

  render() {
    const showFetchMoreResults = this.props.characters && this.props.total
      && this.props.characters.length < this.props.total;

    if (this.props.noResults) {
      return (
        <div className="alert alert-primary mt-2" role="alert">
          No results were found
        </div>
      );
    }
    return (
      <div>
        <div className="results mx-auto my-3">
          {this.props.characters.map(character => {
            return (
              <div key={character.id}>
              <CharacterCard character={character}/>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-2">
          {
            showFetchMoreResults &&
            !this.state.loading ?
            <button className="btn btn-primary" onClick={this.handleClickFetchMoreResults}>
              More results
            </button>
            :
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }
        </div>
      </div>
    )
  }
}

export const CharacterResults = connector(CharacterResultsClass);
