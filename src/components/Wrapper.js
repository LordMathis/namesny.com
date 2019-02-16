import PropTypes from 'prop-types'
import React, { Component } from 'react'
import '../static/stylesheets/globals.scss'
import styles from './Wrapper.scss'

export default class Wrapper extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  }

  render () {
    return (
      <div className={styles.centerContent}>
        {this.props.children}
      </div>
    )
  }
}
