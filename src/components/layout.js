import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import { Helmet } from "react-helmet"
import styles from "../styles/layout.module.scss"

const Layout = ({ children, title, vertical}) => {

  const data = useStaticQuery(graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        author
        user
        hostname
      }
    }
  }`)

  const classes = vertical ? `${styles.content} ${styles.vertical}` : styles.content

  return (
    <div className={styles.flexWrapper}>
      <Helmet
        titleTemplate={`%s | ${data.site.siteMetadata.author}`}>
        <html lang="en" amp />
        <title>{title}</title>
      </Helmet>
      <Header
        user={data.site.siteMetadata.user}
        hostname={data.site.siteMetadata.hostname} />
      <div className={classes}>
        <main className={styles.main}>{children}</main>
      </div>
      <Footer authorName={data.site.siteMetadata.author}/>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  vertical: PropTypes.bool
}

export default Layout
