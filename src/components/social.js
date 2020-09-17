
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/social.module.scss'

export default class Social extends Component {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.string),
    names: PropTypes.arrayOf(PropTypes.string),
    email: PropTypes.string
  }

  render () {
    let key = 0
    const names = this.props.names
    const links = this.props.links

    const zipped = names.map(function(e, i) {
      return [e, links[i]];
    });

    const socialLinks = zipped.map((val) => {
      const link = (
        <li key={key}>
          <a href={val[1]} role="link">
            {val[0]}
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