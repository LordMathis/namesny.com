import { Link } from "gatsby"
import Social from "./social"
import PropTypes from "prop-types"
import React from "react"
import styles from "../styles/header.module.scss"

const Header = ({ siteTitle, socialNames, socialLinks, email }) => (
  <header className={styles.header}>
    <nav className={styles.links}>
      <ul>
        <li key="home">
          <Link to="/" className={styles.nameLink}>{siteTitle} |</Link>
        </li>
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
    <Social links={ socialLinks } names={ socialNames } email={ email }/>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  socialNames: PropTypes.arrayOf(PropTypes.string),
  socialLinks: PropTypes.arrayOf(PropTypes.string),
}

Header.defaultProps = {
  siteTitle: ``,
  socialNames: [],
  socialLinks: [],
  email: ``,
}

export default Header
