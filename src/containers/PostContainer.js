import React, {Component} from 'react';
import axios from 'axios';
import {Post, Wrapper} from '../components';

export default class PostContainer extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const url = '/api/post/' + this.props.match.params.postname;

    axios.get(url).then((res) => {
      this.setState({
        isLoading: false,
        post: res.data,
      });
    })
  }

  render() {
    return (
      <Wrapper>
        <Post isLoading={this.state.isLoading}
              post={this.state.post} />
      </Wrapper>
    );
  }
}
