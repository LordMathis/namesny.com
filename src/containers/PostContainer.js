import React, {Component} from 'react';
import {Post, Wrapper, NotFoundPage} from '../components';

export default class PostContainer extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      error: false,
    };
  }

  render() {

    if (this.state.error) {
      return (
        <NotFoundPage />
      )
    }

    return (
      <Wrapper>
        <Post isLoading={this.state.isLoading}
              post={this.state.post} />
      </Wrapper>
    );
  }
}
