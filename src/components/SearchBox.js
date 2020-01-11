import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/globals.scss'
import styles from './SearchBox.scss'

export default class SearchBox extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleEnter: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    searchString: PropTypes.string,
    expanded: PropTypes.bool.isRequired
  }

  render () {
    return (
      <div className={styles.container}>
        <input placeholder='Search'
          className={`${styles.search} ${this.props.expanded ? styles.expanded : ''}`}
          type="text"
          value={this.props.searchString}
          onChange={this.props.handleChange}
          onFocus={this.props.handleFocus}
          onBlur={this.props.handleBlur}
          onKeyDown={this.props.handleEnter} />
        <span onClick={this.props.handleSearch} >
          <i className={`fa fa-search ${styles.icon}`}></i>
        </span>
      </div>
    )
  }
}
