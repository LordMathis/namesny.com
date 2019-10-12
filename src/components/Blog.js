import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Spinner, Header } from '.'
import '../stylesheets/globals.scss'
import MarkdownIt from 'markdown-it'
import styles from './Blog.scss'
import contentStyle from '../stylesheets/content.scss'

export default class Blog extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render () {
    const md = MarkdownIt()

    if (this.props.isLoading) {
      return (
        <div className={contentStyle.contentWrapper} id="blog">
          <Spinner/>
        </div>
      )
    }

    let posts = this.props.posts.sort((a, b) => {
      return new Date(b.published) - new Date(a.published)
    })
    let postsHTML = posts.map((post) => 
      <div className={styles.postListItem}>
        <div className={styles.postHeader}>
          <a href={post.link} className={styles.postTitle}>{post.title}</a>
          <span className={styles.postDate}>{post.published}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: md.render(post.summary) }}>
        </div>
      </div>
    )

    const classes = `${contentStyle.contentWrapper} ${styles.blog}`

    return (
      <div className={classes} id="blog">
        <Header header={'Blog'} />

        <div className={`${contentStyle.content} ${styles.postsList}`}>
          {postsHTML}
        </div>

      </div>
    )
  }
};
