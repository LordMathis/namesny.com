import React, {Component} from 'react';
import {Spinner, Header} from '.';
import '../static/stylesheets/globals.scss';
import styles from './About.scss';
import contentStyle from '../static/stylesheets/content.scss';

export default class About extends Component {

  render () {
    if (this.props.isLoading) {
      return (
        <div className={contentStyle.contentWrapper} id="about">
          <Spinner/>
        </div>
      );
    }

    return (
      <div className={contentStyle.contentWrapper} id="about">
        <Header header={"About"} />
        <div className={contentStyle.content} dangerouslySetInnerHTML={{__html: this.props.about.body}}>
        </div>
      </div>
    )
  }
}
