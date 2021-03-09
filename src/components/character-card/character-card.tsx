import React from "react";
import { Character } from "../../models";

export class CharacterCard extends React.Component<{
  character: Character
}, {}> {
  constructor(props: any) {
    super(props);

    this.getCharacterThumbnail = this.getCharacterThumbnail.bind(this);
  }

  getCharacterThumbnail(): string {
    const character = this.props.character;
    if ( ! character || ! character.thumbnail ) {
      return '';
    }

    return character.thumbnail.path + '.' + character.thumbnail.extension;
  }

  render() {
    return (
      <div className="card">
        <img className="card-img-top" src={this.getCharacterThumbnail()}></img>
        <div className="card-body">
          <h5 className="card-title">{this.props.character.name}</h5>
          {
            this.props.character.description ?
            <p className="card-text">{this.props.character.description}</p> : ''
          }
        </div>
      </div>
    )
  }
}
