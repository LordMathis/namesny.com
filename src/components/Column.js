import PropTypes from 'prop-types'
import React, { Component } from 'react'
import '../stylesheets/globals.scss'
import styles from './Column.scss'

export default class Column extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
    left: PropTypes.bool
  }

  static defaultProps = {
    left: true
  }

  render () {
    return (
      <div className={`${styles.column} ${this.props.left ? styles.left : styles.right}`}>
        {this.props.children}
      </div>
    )
  }
}
