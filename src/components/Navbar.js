import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SocialLinks } from '.'
import '../stylesheets/globals.scss'
import styles from './Navbar.scss'

export default class Navbar extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }

  render () {
    return (
      <div className={styles.navbar} role="navigation">
        <div className={styles.links}>
          <ul>
            <li key="index">
              <a href='/'>
                <span className={styles.nameLink}>{this.props.config.name} |</span>
              </a>
            </li>
            <li key="about">
              <a href='/#about'>
                <span>About</span>
              </a>
            </li>
            <li key="blog">
              <a href='/#blog'>
                <span>Blog</span>
              </a>
            </li>
          </ul>
        </div>
        <SocialLinks config={ this.props.config } home={ false }/>
      </div>
    )
  }
}
