import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/globals.scss'
import styles from './Header.scss'

export default class Header extends Component {
  static propTypes = {
    header: PropTypes.string.isRequired
  }

  render () {
    return (
      <div className={styles.mainHeader}>
        <h1>{this.props.header}</h1>
      </div>
    )
  }
}
