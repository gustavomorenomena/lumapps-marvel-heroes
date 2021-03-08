import React from "react";
import { Character } from "../models";

export class CharacterView extends React.Component<{
  character: Character
}, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <p>{this.props.character.name}</p>
  }
}
