import { Component, KeyboardEvent, RefObject, createRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { State, StoreSelectors, StoreActions } from '../../redux';
import { CharactersService } from '../../services';
import { History } from 'history';
import { withRouter } from 'react-router';

const mapStateToProps = (state: State) => ({
  loading: StoreSelectors.selectLoading(state)
})

const connector = connect(mapStateToProps, {
  setLoading: StoreActions.setLoading,
  setResults: StoreActions.setResults,
  setError: StoreActions.setError,
});

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  history: History
};

class SearchBoxClass extends Component <Props, {
  searchTerm: string,
}> {
  searchInputRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: ''
    }

    this.searchInputRef = createRef();

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

    this.props.setLoading(true);

    CharactersService.find(this.state.searchTerm).then(result => {
      if ( ! result.results || typeof result.total != 'number' ) {
        return;
      }
      this.props.setResults({
        characters: result.results,
        total: result.total,
      });

      this.props.history.push('/');
    }, err => {
      this.props.setError(err);
    }).finally(() => {
      this.props.setLoading(false);
    });
  }

  render() {
    return (
      <input type="text" className="d-block mx-auto"
        ref={this.searchInputRef}
        onChange={this.handleSearchInputChange}
        onKeyPress={this.handleKeyPressOnSearchInput}
        disabled={this.props.loading}
        placeholder="Search your character"/>
    )
  }
}

export const SearchBox = withRouter(connector(SearchBoxClass));
