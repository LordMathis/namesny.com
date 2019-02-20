import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Post, Wrapper, NotFoundPage } from '../components'

export default class PostContainer extends Component {
  static propTypes = {
    staticContext: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    let post
    if (__isBrowser__) {
      post = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      post = props.staticContext.data
    }

    this.state = {
      isLoading: !post,
      error: false,
      post: post
    }
  }

  render () {
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
    )
  }
}
