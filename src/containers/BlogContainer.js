import React, {Component} from 'react';
import axios from 'axios';
import {Blog} from '../components';

export default class BlogContainer extends Component {

  constructor() {
    super();

    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    axios.get('/api/blog').then((res) => {
      this.setState({
        isLoading: false,
      });
    })
  }

  render() {
    return (
      <Blog data={this.state}/>
    )
  }
}