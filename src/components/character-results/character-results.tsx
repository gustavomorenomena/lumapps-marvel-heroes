import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../redux';

const mapStateToProps = (state: State) => ({});

const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {};

class CharacterResultsClass extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <p>Character results !</p>
    )
  }
}

export const CharacterResults = connector(CharacterResultsClass);
