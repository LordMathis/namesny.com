import React from "react"
import styles from '../styles/footer.module.scss'

const Footer = ({authorName}) => (
  <footer className={styles.footer}>
    © {new Date().getFullYear()} {authorName}, Built with
    {` `}
    <a href="https://www.gatsbyjs.org" className={styles.link}>Gatsby</a>
  </footer>
)

export default Footer