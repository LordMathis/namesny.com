import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../stylesheets/globals.scss'
import styles from './Home.scss'

export default class Home extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }

  render () {
    let key = 0
    const objKeys = Object.keys(this.props.config.social)

    const socialLinks = objKeys.map((val) => {
      const link = (
        <li>
          <a key={key} href={this.props.config.social[val]} role="link">
            <i className={`fa fa-${val} fa-3x`} aria-hidden="true" />
            <span className="sr-only">{val}</span>
          </a>
        </li>
      )
      key += 1
      return link
    })

    socialLinks.push(
      <li>
        <a key={key} href={`mailto:${this.props.config.email}`} role="link">
          <i className="fa fa-envelope-o fa-3x" aria-hidden="true" />
          <span className="sr-only">e-mail</span>
        </a>
      </li>
    )

    return (
      <div id={styles.coverPage} className={styles.coverPageFull} role="region" aria-label="Home page">
        <div id={styles.coverPageContent}>
          <div role="heading" aria-level="1">
            <h1 id={styles.coverPageName}><Link to="/">{ this.props.config.name }</Link></h1>
          </div>
          <div className={styles.social} role="list">
            <ul>
              {socialLinks}
            </ul>
          </div>
          <div className={styles.menuLinks} role="navigation">
            <ul>
              <li>
                <a href="#about">
                  About
                </a>
              </li>
              <li>
                <span>/ <a href="#blog">Blog</a></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
