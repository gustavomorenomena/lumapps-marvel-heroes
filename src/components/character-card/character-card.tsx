import { Component } from "react";
import { Link } from "react-router-dom";
import { Character } from "../../models";

export class CharacterCard extends Component<{
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
      <div className="character-card mb-2">
        <img src={this.getCharacterThumbnail()}></img>
        <div className="character-info m-2">
          <h5>{this.props.character.name}</h5>
          {
            this.props.character.description &&
            <p className="card-text">{this.props.character.description}</p>
          }
          <Link to={`/${this.props.character.id}`}
            className="btn btn-primary">
            Details
          </Link>
        </div>
      </div>
    )
  }
}
