import React, {Component} from 'react';

export default class Blog extends Component {

  render() {
    if (this.props.data.isLoading) {
      return (
        <h1>Loading</h1>
      );
    }

    return (
      <div>
        <div className="content">
          <h1>Blog</h1>

          <div>{this.props.data.posts[0].published}</div>
          <div>{this.props.data.posts[0].filename}</div>

        </div>
      </div>
    );
  }
};
