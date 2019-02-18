import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Post, Wrapper, NotFoundPage } from '../components'

export default class PostContainer extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  constructor () {
    super()

    this.state = {
      isLoading: true,
      error: false
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
