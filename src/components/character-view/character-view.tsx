import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Character } from '../../models';
import { State, StoreSelectors } from '../../redux';
import { CharacterCard } from '../character-card/character-card';

const mapStateToProps = (state: State) => ({
  total: StoreSelectors.selectTotal(state),
  characters: StoreSelectors.selectCharacters(state),
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  match: {
    params: {
      characterId: string
    }
  }
};

class CharacterViewClass extends React.Component<Props, {
  character?: Character
}> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if ( ! this.props.characters || ! this.props.characters.length ) {
      return;
    }
    const characterId = Number(this.props.match.params.characterId);
    const character = this.props.characters.find(c => c.id == characterId);
    this.setState({character});
  }

  render() {
    return (
      <div>
        {
          !!this.props.total &&
          <Link to="/" className="btn btn-link">Back to results</Link>
        }
        {
          !this.state.character ?
          <p>Character not found</p>
          :
          <CharacterCard character={this.state.character}/>
        }
      </div>
    )
  }
}

export const CharacterView = withRouter(connector(CharacterViewClass));
