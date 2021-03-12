import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { State, StoreSelectors } from '../../redux';
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

const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {};

class CharacterResultsClass extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
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
              <CharacterCard character={character}></CharacterCard>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-2">
          {
            showFetchMoreResults &&
            <button className="btn btn-primary">
              More results
            </button>
          }
        </div>
      </div>
    )
  }
}

export const CharacterResults = connector(CharacterResultsClass);
