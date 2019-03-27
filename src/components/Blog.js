import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Spinner, Header } from '.'
import '../static/stylesheets/globals.scss'
import styles from './Blog.scss'
import contentStyle from '../static/stylesheets/content.scss'

export default class Blog extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render () {
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
      <tr className={styles.postListItem} key={post.title}>
        <td>
          <span className={styles.postDate}>{post.published}</span>
        </td>
        <td>
          <a href={post.link} className={styles.postTitle}>{post.title}</a>
        </td>
      </tr>
    )

    return (
      <div className={contentStyle.contentWrapper} id="blog">
        <Header header={'Blog'} />

        <div className={contentStyle.content}>
          <table>
            <tbody className={styles.postsWrapper}>
              {postsHTML}
            </tbody>
          </table>
        </div>

      </div>
    )
  }
};
