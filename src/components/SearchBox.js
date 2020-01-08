import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/globals.scss'
import styles from './SearchBox.scss'

export default class SearchBox extends Component {
  static propTypes = {
    query: PropTypes.string
  }

  render () {
    return (
      <div className={styles.container}>
        <input placeholder='Search' className={styles.search} type="text" />
        <i className="fa fa-search"></i>
      </div>
    )
  }
}
