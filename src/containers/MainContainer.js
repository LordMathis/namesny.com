import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { About, Blog, Home, Wrapper } from '../components'

export default class MainContainer extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  constructor () {
    super()

    this.state = {
      isLoadingBlog: true,
      isLoadingAbout: true
    }

    console.log(this.props.data)
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
