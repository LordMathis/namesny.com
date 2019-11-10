import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Spinner, Header } from '.'
import '../stylesheets/globals.scss'
import contentStyle from '../stylesheets/content.scss'
import style from './Resume.scss'
import MarkdownIt from 'markdown-it'

export default class About extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    resume: PropTypes.string.isRequired
  }

  render () {
    const md = MarkdownIt()
    const result = md.render(this.props.about)

    if (this.props.isLoading) {
      return (
        <div className={contentStyle.content}>
          <Spinner/>
        </div>
      )
    }

    return (
      <div>
        <Navbar config={this.props.config} />
        <Wrapper>
          <div className={`${contentStyle.content} ${style.column}`}>
            <Header header={title} role="heading" aria-level="2" />
            <div className={style.content} dangerouslySetInnerHTML={{ __html: result }} role="article">
            </div>
          </div>
        </Wrapper>
      </div>
    )
  }
}
