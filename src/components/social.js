
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/social.module.scss'

export default class Social extends Component {
  static propTypes = {
    social: PropTypes.arrayOf(PropTypes.object),
    email: PropTypes.string
  }

  render () {
    let key = 0

    const socialLinks = this.props.social.map((val) => {
      const link = (
        <li key={key}>
          <a href={val.link} role="link">
            {val.name}
          </a>
        </li>
      )
      key += 1
      return link
    })

    socialLinks.push(
      <li key={key}>
        <a href={`mailto:${this.props.email}`} role="link">
          e-mail
        </a>
      </li>
    )

    return (
      <div className={styles.socialNavbar} role="list">
        <ul>
          {socialLinks}
        </ul>
      </div>
    )
  }
}