import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "../styles/header.module.scss"

const Header = ({ user, hostname }) => (
  <header className={styles.headerWrapper}>
    <div className={styles.header}>
      <div>
        <Link to="/" className={styles.terminal}>{user}@{hostname} ~ $</Link>
      </div>
      <nav className={styles.links}>
        <ul>
          <li key="about">
            <a href='/about'>
              <span>~/about</span>
            </a>
          </li>
          <li key="blog">
            <a href='/blog'>
              <span>~/blog</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  user: PropTypes.string.isRequired,
  hostname: PropTypes.string.isRequired,
}

export default Header
