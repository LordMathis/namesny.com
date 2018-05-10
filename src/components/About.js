import React, {Component} from 'react';
import {Spinner} from '.';
import '../static/stylesheets/globals.scss';
import styles from './About.scss';
import contentStyle from '../static/stylesheets/content.scss';

export default class About extends Component {

  render () {
    if (this.props.isLoading) {
      return (
        <div className={contentStyle.contentWrapper}>
          <Spinner/>
        </div>
      );
    }

    return (
      <div className={contentStyle.contentWrapper}>
        <h1>About</h1>
        <div className={contentStyle.content} dangerouslySetInnerHTML={{__html: this.props.about.body}}>
        </div>
      </div>
    )
  }
}
