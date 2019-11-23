import React, { Component } from 'react'
import { Wrapper, NotFoundPage } from '../components'
import PropTypes from 'prop-types'
import '../stylesheets/globals.scss'

export default class NotFoundContainer extends Component {
  static propTypes = {
    staticContext: PropTypes.object.isRequired
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
