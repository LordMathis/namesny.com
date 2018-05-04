import React, {Component} from 'react';
import '../static/stylesheets/globals.scss';
import './About.scss';

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
        <h1>About</h1>
        <div className="content" dangerouslySetInnerHTML={{__html: this.props.about.body}}>
        </div>
      </div>
    )
  }
}
