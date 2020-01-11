import React, { Component } from 'react'
import { Blog } from '../components'
import PropTypes from 'prop-types'
import axios from 'axios'
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
      searchString: '',
      expanded: false
    }
  }

  handleChange (event) {
    this.setState({ searchString: event.target.value })
  }

  handleFocus () {
    this.setState({ expanded: true })
  }

  handleBlur () {
    this.setState({ expanded: false })
  }

  handleEnter (event) {
    if (event.key === 'Enter') {
      this.handleSearch()
    }
  }

  handleSearch () {
    if (this.state.expanded && this.state.searchString) {
      this.search()
    } else {
      this.setState({ expanded: true })
    }
  }

  search () {
    this.setState({
      isLoading: true
    }, () => {
      axios.get(`/api/v1/posts?search=${this.state.searchString}`)
        .then((data) => {
          this.setState({
            isLoading: false,
            posts: data.data
          })
        })
    })
  }

  render () {
    return (
      <Blog isLoading={ this.state.isLoading }
        posts={ this.state.posts }
        searchString={this.state.searchString}
        expanded={this.state.expanded}
        handleChange={this.handleChange.bind(this)}
        handleFocus={this.handleFocus.bind(this)}
        handleBlur={this.handleBlur.bind(this)}
        handleEnter={this.handleEnter.bind(this)}
        handleSearch={this.handleSearch.bind(this)} />
    )
  }
}
