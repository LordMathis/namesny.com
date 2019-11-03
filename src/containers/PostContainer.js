import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Post, Wrapper, NotFoundPage } from '../components'

export default class PostContainer extends Component {
  static propTypes = {
    staticContext: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    let data
    // eslint-disable-next-line no-undef
    if (__isBrowser__) {
      data = window.__INITIAL_DATA__
      console.log("window:", data)            
      delete window.__INITIAL_DATA__
    } else {
      data = props.staticContext.context
      console.log("StaticContext:", data)      
    }

    this.state = {
      isLoading: !data,
      error: false,
      post: data[0],
      config: data[1]
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
          post={this.state.post} config={this.state.config} />
      </Wrapper>
    )
  }
}
