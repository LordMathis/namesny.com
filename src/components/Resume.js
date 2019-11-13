import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Spinner, Navbar, Wrapper, Header, Footer } from '.'
import '../stylesheets/globals.scss'
import contentStyle from '../stylesheets/content.scss'
import style from './Resume.scss'
import MarkdownIt from 'markdown-it'
import fm from 'front-matter'

export default class About extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    resume: PropTypes.string.isRequired
  }

  render () {
    const md = MarkdownIt()
    const content = fm(this.props.resume)
    const title = content.attributes.title
    const body = md.render(content.body)

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
            <div className={style.content} dangerouslySetInnerHTML={{ __html: body }} role="article">
            </div>
          </div>
        </Wrapper>
        <Footer config={this.props.config} />
      </div>
    )
  }
}
