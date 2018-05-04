import React, {Component} from 'react';
import '../static/stylesheets/globals.scss';
import styles from './Blog.scss';

export default class Blog extends Component {

  render() {
    if (this.props.isLoading) {
      return (
        <div className="content-wrapper">
          <h1>Loading</h1>
        </div>
      );
    }

    let posts = this.props.posts.map((post) =>
      <div className={styles.postListItem} key={post.title}>
        <div className={styles.postHeader}>
          <div className={styles.postTitle}>
            <h3><a href={post.link}>{post.title}</a></h3>
          </div>
          <div className={styles.postDate}>
            <h3>{post.published}
            </h3>
          </div>
        </div>
        <div className={styles.postSummary}>
          <p>{post.summary}</p>
        </div>
        <div className={styles.postListFooter}>
          <a href={post.link}>Read More</a>
        </div>

      </div>
    )

    return (
      <div className="content-wrapper">
        <h1>Blog</h1>

        <div className="content">
          {posts}
        </div>

      </div>
    );
  }
};
