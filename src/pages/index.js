import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"

import "../styles/global.scss"

const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query SiteDataQuery {
      site {
        siteMetadata {
          title
          author
          email
          social {
            name
            link
          }
        }
      }
    }
  `)

  return (
    <Layout title="Home" author={data.site.siteMetadata.author} >
      <h1>Hello</h1>
    </Layout>
  )
}

export default IndexPage
