import React, {Component} from 'react';
import {About, Blog, Home, Wrapper} from '../components';

export default class MainContainer extends Component {

  constructor() {
    super();

    this.state = {
      isLoadingBlog: true,
      isLoadingAbout: true,
    }
  }

  render() {
    return (
      <div>
        <Home/>
        <Wrapper>
          <About isLoading={this.state.isLoadingAbout}
            about={this.state.about}/>
          <Blog isLoading={this.state.isLoadingBlog}
            posts={this.state.posts}/>
        </Wrapper>
      </div>
    )
  }
}
