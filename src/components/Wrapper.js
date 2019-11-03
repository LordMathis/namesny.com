import PropTypes from 'prop-types'
import React, { Component } from 'react'
import '../stylesheets/globals.scss'
import styles from './Wrapper.scss'

export default class Wrapper extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
    flex: PropTypes.bool
  }

  static defaultProps = {
    flex: false
  }

  render () {
    return (
      <div className={` ${styles.centerContent} ${this.props.flex ? styles.flexWrap : ''}` } role='main'>
        {this.props.children}
      </div>
    )
  }
}
