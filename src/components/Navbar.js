import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/globals.scss'
import styles from './Navbar.scss'

export default class Navbar extends Component {

  static propTypes = {
    config: PropTypes.object.isRequired
  }

  render () {
    let key = 0
    const objKeys = Object.keys(this.props.config.social)

    const socialLinks = objKeys.map((val) => {
      const link = (
        <a key={key} href={this.props.config.social[val]}>
          <i className={`fa fa-${val}`} aria-hidden="true" />
          <span className="sr-only">{val}</span>
        </a>
      )

      key += 1
      return link
    })

    socialLinks.push(
      <a key={key} href={`mailto:${this.props.config.email}`}>
        <i className="fa fa-envelope-o" aria-hidden="true" />
        <span className="sr-only">e-mail</span>
      </a>
    )

    return (
      <div className={styles.navbar}>
        <div className={styles.links}>
          <ul>
            <li>
              <a href='/'>
                <span className={styles.nameLink}>{this.props.config.name} |</span>
              </a>
            </li>
            <li>
              <a href='/#about'>
                <span>About</span>
              </a>
            </li>
            <li>
              <a href='/#blog'>
                <span>Blog</span>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.social}>
          {socialLinks}
        </div>
      </div>
    )
  }
}
