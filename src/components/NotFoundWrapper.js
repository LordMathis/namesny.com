import React, { Component } from 'react'
import { Wrapper, NotFoundPage } from '.'
import PropTypes from 'prop-types'
import '../stylesheets/globals.scss'

export default class NotFoundWrapper extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    let data

    if (__isBrowser__) {
      data = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      data = props.staticContext.context
    }

    this.state = {
      config: data[1]
    }    
  }

  render () {
    return (
      <Wrapper>
        <NotFoundPage config={this.state.config}/>
      </Wrapper>
    )
  }
}
