import React, {Component} from 'react';
import '../stylesheets/globals.scss';
import styles from './Header.scss';

export default class Header extends Component {

  render () {
    return (
      <div className={styles.mainHeader}>
        <h1>{this.props.header}</h1>
      </div>
    )
  }
}
