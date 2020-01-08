import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { About, Home, Wrapper, Column, Footer } from '../components'
import { BlogContainer } from '.'

export default class MainContainer extends Component {
  static propTypes = {
    staticContext: PropTypes.object
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
      isLoadingBlog: !data[0].posts,
      isLoadingAbout: !data[0].other.about,
      about: data[0].other.about,
      posts: data[0].posts,
      config: data[1]
    }
  }

  render () {
    return (
      <div>
        <Home config={this.state.config} />
        <Wrapper flex={true}>
          <Column>
            <About isLoading={this.state.isLoadingAbout}
              about={this.state.about}/>
          </Column>
          <Column left={false}>
            <BlogContainer posts={this.state.posts}/>
          </Column>
        </Wrapper>
        <Footer config={this.state.config} />
      </div>
    )
  }
}
