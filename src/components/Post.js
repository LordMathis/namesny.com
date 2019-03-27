import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Spinner, Header, Navbar } from '.'
import '../static/stylesheets/globals.scss'
import contentStyle from '../static/stylesheets/content.scss'
import styles from './Post.scss'
import MarkdownIt from 'markdown-it'
import fm from 'front-matter'
import moment from 'moment'

export default class Post extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired
  }

  render () {
    const md = MarkdownIt()
    const content = fm(this.props.post)
    const title = content.attributes.title
    const date = moment(content.attributes.date, 'YYYY-MM-DD')
    const body = md.render(content.body)

    if (this.props.isLoading) {
      return (
        <div className={contentStyle.contentWrapper}>
          <Spinner/>
        </div>
      )
    }

    return (
      <div>
        <Navbar />
        <div className={contentStyle.contentWrapper}>
          <Header header={title} />
          <div className={contentStyle.content}>
            <div className={styles.postDate}>
              <h3>{date.format('MMMM D, YYYY')}</h3>
            </div>
            <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: body }}>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
