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

  componentDidMount() {
    const url = '/api/post/' + this.props.match.params.postname;

    axios.get(url).then((res) => {
      console.log(res.data);
      this.setState({
        isLoading: false,
        post: res.data,
      });
    })
  }

  render() {
    return (
      <Post isLoading={this.state.isLoading}
            post={this.state.post} />
    );
  }
}
