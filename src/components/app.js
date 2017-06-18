import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Redirect } from 'react-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Menu goes here.
        {this.props.children}
      </div>
    );
  }
}
