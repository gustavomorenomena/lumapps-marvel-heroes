import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { State, StoreActions, StoreSelectors } from "../../redux";

const mapStateToProps = (state: State) => ({
  error: StoreSelectors.selectError(state)
});
const connector = connect(mapStateToProps, {
  setError: StoreActions.setError,
});
type Props = ConnectedProps<typeof connector>

class ErrorClass extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.setError(undefined);
  }

  render() {
    if ( ! this.props.error ) {
      return null;
    }

    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error !</strong> {this.props.error}
        <button type="button" className="close" onClick={this.handleClose} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }
}

export const Error = connector(ErrorClass);
