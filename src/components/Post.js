import React, {Component} from 'react';
import '../static/stylesheets/globals.scss';
import contentStyle from '../static/stylesheets/content.scss';
import styles from './Post.scss';

export default class Post extends Component {
  render() {

    if (this.props.isLoading) {
      return (
        <h1>Loading</h1>
      );
    }

    return (
      <div className={contentStyle.contentWrapper}>
        <a href={this.props.post.link}>
          <h1>{this.props.post.title}</h1>
        </a>
        <div className={contentStyle.content}>
          <div className={styles.postDate}>
            <h3>{this.props.post.published}</h3>
          </div>
          <div className={styles.postContent} dangerouslySetInnerHTML={{__html: this.props.post.body}}>
          </div>
        </div>
      </div>
    )
  }
}
