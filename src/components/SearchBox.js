import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/globals.scss'
import styles from './SearchBox.scss'

export default class SearchBox extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    searchString: PropTypes.string
  }

  render () {
    return (
      <div className={styles.container}>
        <input placeholder='Search' className={styles.search} type="text" value={this.props.searchString} onChange={this.props.handleChange}/>
        <span>
          <i className={`fa fa-search ${styles.icon}`}></i>
        </span>
      </div>
    )
  }
}
