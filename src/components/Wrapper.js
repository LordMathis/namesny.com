import React, {Component} from 'react';
import {Spinner, Header} from '.';
import '../static/stylesheets/globals.scss';
import styles from './Wrapper.scss';

export default class Wrapper extends Component {

  render () {
    return (
      <div className={styles.centerContent}>
        {this.props.children}
      </div>
    )
  }
}
