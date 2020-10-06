import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "../styles/page.module.scss"

export default function Page({ data }) {
  const page = data.markdownRemark
  return (
    <Layout>
      <div className={styles.blogPostWrapper}>
        <h1>{page.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`