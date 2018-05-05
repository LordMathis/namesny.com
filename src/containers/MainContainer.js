import React, {Component} from 'react';
import axios from 'axios';
import {About, Blog, Home} from '../components';

export default class BlogContainer extends Component {

  constructor() {
    super();

    this.state = {
      isLoadingBlog: true,
      isLoadingAbout: true,
    }
  }

  componentDidMount() {
    axios.get('/api/about').then((res) => {
      this.setState({
        isLoadingAbout: false,
        about: res.data,
      });
    })

    axios.get('/api/blog').then((res) => {
      this.setState({
        isLoadingBlog: false,
        posts: res.data,
      });
    })
  }

  render() {
    return (
      <div>
        <Home/>
        <About isLoading={this.state.isLoadingAbout}
          about={this.state.about}/>
        <Blog isLoading={this.state.isLoadingBlog}
          posts={this.state.posts}/>
      </div>
    )
  }
}
