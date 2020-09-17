import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import { Helmet } from "react-helmet"
import styles from "../styles/layout.module.scss"

const Layout = ({ children, title }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author
          email
          social {
            names
            links
          }
        }
      }
    }
  `)

  return (
    <>
      <Helmet
        titleTemplate={`%s | ${data.site.siteMetadata.author}`}>
        <html lang="en" amp />
        <title>{title}</title>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" rel="preload" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous"></link>
      </Helmet>
      <Header
        siteTitle={data.site.siteMetadata.title}
        socialNames={data.site.siteMetadata.social.names}
        socialLinks={data.site.siteMetadata.social.links}
        email={data.site.siteMetadata.email} />
      <div className={styles.content}>
        <main>{children}</main>
      </div>
      <Footer authorName={data.site.siteMetadata.author}/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
