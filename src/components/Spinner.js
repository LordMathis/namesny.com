import React, {Component} from 'react';
import '../static/stylesheets/globals.scss';
import styles from './Spinner.scss';

export default class Spinner extends Component {
  render() {
    return (
      <div className={styles.spinnerWrapper}>
        <div className={styles.ldsEllipsis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }
}
