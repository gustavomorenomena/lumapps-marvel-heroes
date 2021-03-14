import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { State, StoreSelectors } from '../../redux';

const mapStateToProps = (state: State) => ({
  total: StoreSelectors.selectTotal(state),
});
const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>;

class CharacterViewClass extends React.Component<Props> {
  render() {
    return (
      <div>
        {
          this.props.total &&
          <Link to="/" className="btn btn-link">Back to results</Link>
        }
        <p>Character view</p>
      </div>
    )
  }
}

export const CharacterView = connector(CharacterViewClass);
