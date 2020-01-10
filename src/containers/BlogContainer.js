import React, { Component } from 'react'
import { Blog } from '../components'
import PropTypes from 'prop-types'
import '../stylesheets/globals.scss'

export default class BlogContainer extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      posts: props.posts,
      searchString: ''
    }
  }

  handleChange (event) {
    this.setState({ searchString: event.target.value })
  }

  render () {
    return (
      <Blog isLoading={ this.state.isLoading } posts={ this.state.posts } searchString={this.state.searchString} handleChange={this.handleChange.bind(this)} />
    )
  }
}
