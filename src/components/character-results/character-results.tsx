import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { State, StoreActions, StoreSelectors } from '../../redux';
import { CharactersService } from '../../services';
import { CharacterCard } from '../character-card/character-card';
import { Spinner } from '../spinner/spinner';

const mapStateToProps = (state: State) => ({
  characters: StoreSelectors.selectCharacters(state),
  total: StoreSelectors.selectTotal(state),
});

const connector = connect(mapStateToProps, {
  addCharacters: StoreActions.addCharacters,
  setError: StoreActions.setError,
});

type Props = ConnectedProps<typeof connector>;

class CharacterResultsClass extends Component<Props, {
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
    if ( ! this.props.characters ) {
      return;
    }

    this.setState({
      loading: true,
    });

    CharactersService.fetchMoreResults(this.props.characters.length).then(characters => {
      this.props.addCharacters(characters);
    }, (err: string) => {
      this.props.setError(err);
    }).finally(() => {
      this.setState({
        loading: false
      })
    });
  }

  render() {
    const showFetchMoreResults = this.props.characters && this.props.total
      && this.props.characters.length < this.props.total;

    if ( ! this.props.characters ) {
      return null;
    }

    if ( ! this.props.characters.length ) {
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
            (!this.state.loading ?
            <button className="btn btn-primary" onClick={this.handleClickFetchMoreResults}>
              More results
            </button>
            :
            <Spinner />)
          }
        </div>
      </div>
    )
  }
}

export const CharacterResults = connector(CharacterResultsClass);
