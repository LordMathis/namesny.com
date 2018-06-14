import React, {Component} from 'react';
import {Spinner, Header} from '.';
import '../static/stylesheets/globals.scss';
import styles from './Blog.scss';
import contentStyle from '../static/stylesheets/content.scss';

export default class Blog extends Component {

  render() {
    if (this.props.isLoading) {
      return (
        <div className={contentStyle.contentWrapper}>
          <Spinner/>
        </div>
      );
    }

    let posts = this.props.posts.map((post) =>
      <div className={styles.postListItem} key={post.title}>
        <div className={styles.postHeader}>
          <div className={styles.post}>
            <span>{post.published}</span>
            <a href={post.link}>{post.title}</a>
          </div>
        </div>
      </div>
    )

    return (
      <div className={contentStyle.contentWrapper}>
        <Header header={"Blog"} />

        <div className={contentStyle.content}>
          <div className={styles.postsWrapper}>
            {posts}
          </div>
        </div>

      </div>
    );
  }
};
