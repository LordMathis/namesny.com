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
        <a key={key} href={this.props.config.social[val]}>
          <i className={`fa fa-${val} fa-3x`} aria-hidden="true" />
          <span className="sr-only">{val}</span>
        </a>
      )
      key += 1
      return link
    })

    socialLinks.push(
      <a key={key} href={`mailto:${this.props.config.email}`}>
        <i className="fa fa-envelope-o fa-3x" aria-hidden="true" />
        <span className="sr-only">e-mail</span>
      </a>
    )

    return (
      <div id={styles.coverPage} className={styles.coverPageFull}>
        <div id={styles.coverPageContent}>
          <div>
            <h1 id={styles.coverPageName}><Link to="/">{ this.props.config.name }</Link></h1>
          </div>
          <div className={styles.social}>
            {socialLinks}
          </div>
          <div className={styles.menuLinks}>
            <ul>
              <li>
                <a href="#about">
                  About
                </a>
              </li>
              <li>
                <span>/ <a href="#blog">Blog</a></span>
              </li>
              <li>
                <span>/ <a href="#contact">Contact</a></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
