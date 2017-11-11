import React, {Component} from 'react';

export default class Post extends Component {
  render() {

    if (this.props.isLoading) {
      return (
        <h1>Loading</h1>
      );
    }

    return (
      <div className="content-wrapper">
        <h1>{this.props.post.title}</h1>
        <h4>{this.props.post.published}</h4>
        <div className="content" dangerouslySetInnerHTML={{__html: this.props.post.body}}>
        </div>
      </div>
    )
  }
}
