import { Link } from "gatsby"
import Social from "./social"
import PropTypes from "prop-types"
import React from "react"
import styles from "../styles/header.module.scss"

const Header = ({ siteTitle, social, email }) => (
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
    <Social social={ social } email={ email }/>
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
