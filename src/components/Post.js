import React, {Component} from 'react';
import '../static/stylesheets/globals.scss';
import './Post.scss';

export default class Post extends Component {
  render() {

    if (this.props.isLoading) {
      return (
        <h1>Loading</h1>
      );
    }

    return (
      <div className="content-wrapper">
        <a href={this.props.post.link}>
          <h1>{this.props.post.title}</h1>
        </a>
        <div className="content">
          <div className="post-date">
            <h3>{this.props.post.published}</h3>
          </div>
          <div className="post-content" dangerouslySetInnerHTML={{__html: this.props.post.body}}>
          </div>
        </div>
      </div>
    )
  }
}
