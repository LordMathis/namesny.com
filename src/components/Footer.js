import PropTypes from 'prop-types'
import React, { Component } from 'react'
import '../stylesheets/globals.scss'
import contentStyle from '../stylesheets/content.scss'
import style from './Footer.scss'

export default class Footer extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }

  render () {
    return (
      <footer className={style.footer}>
        <p>Copyright &copy; {new Date().getFullYear()} { this.props.config.name }</p>
      </footer>
    )
  }
}
