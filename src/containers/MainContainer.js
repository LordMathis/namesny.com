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
    // eslint-disable-next-line no-undef
    if (__isBrowser__) {
      data = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      data = props.staticContext.data
    }

    this.state = {
      isLoadingBlog: !data.posts,
      isLoadingAbout: !data.other.about,
      about: data.other.about,
      posts: data.posts
    }
  }

  render () {
    return (
      <div>
        <Home/>
        <Wrapper flex={true}>
          <About isLoading={this.state.isLoadingAbout}
            about={this.state.about}/>
          <Blog isLoading={this.state.isLoadingBlog}
            posts={this.state.posts}/>
        </Wrapper>
      </div>
    )
  }
}
