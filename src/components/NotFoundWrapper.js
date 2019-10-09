import React, { Component } from 'react'
import { Wrapper, NotFoundPage } from '.'
import '../stylesheets/globals.scss'

export default class NotFoundWrapper extends Component {
  render () {
    return (
      <Wrapper>
        <NotFoundPage />
      </Wrapper>
    )
  }
}
