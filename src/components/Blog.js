import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Spinner, Header, SearchBox } from '.'
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

    const posts = this.props.posts.sort((a, b) => {
      return new Date(b.published) - new Date(a.published)
    })
    const postsHTML = posts.map((post) =>
      <div key={post.title} className={styles.postListItem} role="listitem">
        <div className={styles.postHeader} >
          <a href={post.link} className={styles.postTitle}>{post.title}</a>
          <span className={styles.postDate}>{post.published}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: md.render(post.summary) }}>
        </div>
      </div>
    )

    return (
      <div className={`${contentStyle.content}`} id="blog" role="region" aria-label="Blog posts">
        <div className={styles.headerContainer}>
          <Header header={'Blog'} role="heading" aria-level="2"/>
          <SearchBox />
        </div>
        <div className={`${styles.postsList}`} role="list">
          {postsHTML}
        </div>

      </div>
    )
  }
};
