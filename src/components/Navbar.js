import React, {Component} from 'react';
import config from '../utils/config.json';
import '../static/stylesheets/globals.scss';
import styles from './Navbar.scss';

export default class Navbar extends Component {

  render () {
    return (
      <div className={styles.navbar}>
        <a href='/'>
          <h3>{config.name}</h3>
        </a>
      </div>
    )
  }
}
