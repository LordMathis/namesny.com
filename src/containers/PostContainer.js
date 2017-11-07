import React, {Component} from 'react';
import axios from 'axios';
import {Post} from '../components';

export default class PostContainer extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
    };
  }

  render() {
    return (
      <Post isLoading={this.state.isLoading}
            post={this.state.post} />
    )
  }
}
