import React from 'react';

export class SearchBox extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <input type="text" className="d-block mx-auto"/>
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
