import React, {Component} from 'react';

export default class Blog extends Component {

  render() {
    if (this.props.isLoading) {
      return (
        <h1>Loading</h1>
      );
    }

    let posts = this.props.posts.map((post) => {
      return (
        <div>
          <div>{post.published}</div>
          <div>{post.filename}</div>
        </div>
      )
    })

    return (
      <div>
        <div className="content">
          <h1>Blog</h1>

          {posts}

        </div>
      </div>
    );
  }
};
