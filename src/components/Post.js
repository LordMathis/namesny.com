import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Spinner, Header, Navbar } from '.'
import '../static/stylesheets/globals.scss'
import contentStyle from '../static/stylesheets/content.scss'
import styles from './Post.scss'

export default class Post extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired
  }

  render () {
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
          <Header header={this.props.post.title} />
          <div className={contentStyle.content}>
            <div className={styles.postDate}>
              <h3>{this.props.post.published}</h3>
            </div>
            <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: this.props.post.body }}>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
