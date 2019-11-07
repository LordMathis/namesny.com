import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { SocialLinks } from '.'
import '../stylesheets/globals.scss'
import styles from './Home.scss'

export default class Home extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }

  render () {  
    return (
      <div id={styles.coverPage} className={styles.coverPageFull} role="region" aria-label="Home page">
        <div id={styles.coverPageContent}>
          <div role="heading" aria-level="1">
            <h1 id={styles.coverPageName}><Link to="/">{ this.props.config.name }</Link></h1>
          </div>
          <SocialLinks config={ this.props.config }/>
          <div className={styles.menuLinks} role="navigation">
            <ul>
              <li key="about">
                <a href="#about">
                  About
                </a>
              </li>
              <li key="blog">
                <span>/ <a href="#blog">Blog</a></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
