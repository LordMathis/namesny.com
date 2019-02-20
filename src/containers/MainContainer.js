import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { About, Blog, Home, Wrapper } from '../components'

export default class MainContainer extends Component {
  static propTypes = {
    staticContext: PropTypes.object
  }

  constructor (props) {
    super(props)

    let data
    if (__isBrowser__) {
      data = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      data = props.staticContext.data
    }

    console.log(data)

    this.state = {
      isLoadingBlog: !data.posts,
      isLoadingAbout: !data.about,
      about: data.about,
      posts: data.posts
    }
  }

  render () {
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
