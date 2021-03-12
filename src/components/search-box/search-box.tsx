import React, { KeyboardEvent, RefObject } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { State, StoreSelectors, StoreActions } from '../../redux';

const mapStateToProps = (state: State) => ({
  loading: StoreSelectors.selectLoading(state)
})

const connector = connect(mapStateToProps, {
  setLoading: StoreActions.setLoading
});

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {};

class SearchBoxClass extends React.Component <Props, {
  searchTerm: string,
}> {
  searchInputRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: ''
    }

    this.searchInputRef = React.createRef();

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

    // CharactersService.find(this.state.searchTerm).then(result => {
    //   if (result.results.length === 0) {
    //     return this.setState({
    //       noResults: true,
    //       characters: []
    //     });
    //   }
    //   this.setState({
    //     characters: result.results,
    //     showFetchMoreResults: result.offset + result.results.length < result.total,
    //     searchOffset: result.results.length,
    //     loading: false,
    //     error: undefined,
    //   });
    // }, () => {
    //   this.setState({
    //     loading: false,
    //     error: errors.timeout
    //   });
    // });
  }

  render() {
    console.log(this.props.loading);
    return (
      <input type="text" className="d-block mx-auto"
        ref={this.searchInputRef}
        onChange={this.handleSearchInputChange}
        onKeyPress={this.handleKeyPressOnSearchInput}
        disabled={this.props.loading}/>
    )
    // return (
    //   <input type="text" className="d-block mx-auto"
    //     ref={this.searchInputRef}
    //     onChange={this.handleSearchInputChange}
    //     onKeyPress={this.handleKeyPressOnSearchInput}
    //     disabled={this.state.loading}/>
    // )
  }
}

export const SearchBox = connector(SearchBoxClass);
