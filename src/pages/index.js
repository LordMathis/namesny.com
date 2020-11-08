import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"

import "../styles/global.scss"
import Index from "../components"

const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query SiteDataQuery {
      site {
        siteMetadata {
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
    <Layout title="Home" vertical={true} >
      <Index author={data.site.siteMetadata.author} social={data.site.siteMetadata.social} email={data.site.siteMetadata.email}/>
    </Layout>
  )
}

export default IndexPage
