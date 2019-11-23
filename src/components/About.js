import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Spinner, Header } from '.'
import '../stylesheets/globals.scss'
import contentStyle from '../stylesheets/content.scss'
import MarkdownIt from 'markdown-it'

export default class About extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    about: PropTypes.string.isRequired
  }

  render () {
    const md = MarkdownIt()
    const result = md.render(this.props.about)

    if (this.props.isLoading) {
      return (
        <div className={contentStyle.contentWrapper} id="about">
          <Spinner/>
        </div>
      )
    }

    return (
      <div className={contentStyle.content} role="region" aria-label="About me">
        <Header header={'About Me'} role="heading" aria-level="2"/>
        <div dangerouslySetInnerHTML={{ __html: result }} role="article">
        </div>
      </div>
    )
  }
}
