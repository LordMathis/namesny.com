import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/globals.scss'
import styles from './SocialLinks.scss'

export default class SocialLinks extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    home: PropTypes.bool
  }

  static defaultProps = {
    home: true
  }

  render () {
    let key = 0
    const objKeys = Object.keys(this.props.config.social)

    const socialLinks = objKeys.map((val) => {
      const link = (
        <li key={key}>
          <a href={this.props.config.social[val]} role="link">
            <i className={`fa fa-${val} ${this.props.home ? 'fa-3x': ''}`} aria-hidden="true" />
            <span className="sr-only">{val}</span>
          </a>
        </li>
      )
      key += 1
      return link
    })

    socialLinks.push(
      <li key={key}>
        <a href={`mailto:${this.props.config.email}`} role="link">
          <i className={`fa fa-envelope-o ${this.props.home ? 'fa-3x': ''}`} aria-hidden="true" />
          <span className="sr-only">e-mail</span>
        </a>
      </li>
    )

    const className = this.props.home ? styles['social-home'] : styles['social-navbar']

    return (
        <div className={className} role="list">
            <ul>
            {socialLinks}
            </ul>
        </div>
    )
  }
}