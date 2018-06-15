import React, {Component} from 'react';
import axios from 'axios';
import {Post, Wrapper, NotFoundPage} from '../components';

export default class PostContainer extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      error: false,
    };
  }

  componentDidMount() {
    const url = '/api/post/' + this.props.match.params.postname;

    axios.get(url).then((res) => {
      if (res.data.error) {
        this.setState({
          error: true,
        });
      }
      else {
        this.setState({
          error: false,
          isLoading: false,
          post: res.data,
        });
      }
    })
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
