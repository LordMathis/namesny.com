import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { About, Blog, Home, Wrapper, Column, Footer } from '../components'

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
      data = props.staticContext.context
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
            <Blog isLoading={this.state.isLoadingBlog}
              posts={this.state.posts}/>
          </Column>
        </Wrapper>
        <Footer config={this.state.config} />
      </div>
    )
  }
}
