import React, {Component} from 'react';

export default class About extends Component {

  render () {
    if (this.props.isLoading) {
      return (
        <div className="content-wrapper">
          <h1>Loading</h1>
        </div>
      );
    }

    return (
      <div className="content-wrapper">
        <div className="content" dangerouslySetInnerHTML={{__html: this.props.about.body}}>
        </div>
      </div>
    )
  }
}
