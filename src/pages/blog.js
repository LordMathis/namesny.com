import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Blog from "../components/blog"

import "../styles/global.scss"

const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {frontmatter: {draft: {ne: true}}, fields: {collection: {eq: "posts"}}}
        ) {
        edges {
          node {
            id
            excerpt
            frontmatter {
              date
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  console.log(data.allMarkdownRemark.edges)

  return (
    <Layout title="Blog">
      <Blog edges={data.allMarkdownRemark.edges}/>
    </Layout>
  )
}

export default IndexPage
