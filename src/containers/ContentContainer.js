import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Post, Resume } from '../components'

export default class ContentContainer extends Component {
  static propTypes = {
    staticContext: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    let data
    if (typeof window === 'undefined') {
      data = props.staticContext.context
    } else {
      data = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    }

    this.state = {
      isLoading: !data,
      type: data[0].type,
      content: data[0].data,
      config: data[1]
    }
  }

  render () {
    if (this.state.type === 'resume') {
      return (
        <Resume
          isLoading={this.state.isLoading}
          resume={this.state.content}
          config={this.state.config} />
      )
    } else {
      return (
        <Post
          isLoading={this.state.isLoading}
          post={this.state.content}
          config={this.state.config} />
      )
    }
  }
}
