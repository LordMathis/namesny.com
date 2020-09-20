import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Blog from "../components/blog"

import "../styles/global.scss"

const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: {frontmatter: {draft: {ne: true}}}) {
        edges {
          node {
            id
            excerpt
            frontmatter {
              date
              title
              slug
            }
          }
        }
      }
    }
  `)

  console.log(data.allMarkdownRemark.edges)

  return (
    <Layout title="Home">
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Blog edges={data.allMarkdownRemark.edges}/>
    </Layout>
  )
}

export default IndexPage
