import { Link } from "gatsby"
import Social from "./social"
import PropTypes from "prop-types"
import React from "react"
import styles from "../styles/header.module.scss"

const Header = ({ path, social, email }) => (
  <header className={styles.headerWrapper}>
    <div className={styles.header}>
      <div>
        <span className={styles.terminal}>~{path} $</span>
      </div>
      <nav className={styles.links}>
        <ul>
          <li key="about">
            <a href='/#about'>
              <span>About</span>
            </a>
          </li>
          <li key="blog">
            <a href='/#blog'>
              <span>Blog</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
}

Header.defaultProps = {
  siteTitle: ``,
  social: [],
  email: ``,
}

export default Header
