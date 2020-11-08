import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "../styles/blog-post.module.scss"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <div className={styles.blogPostWrapper}>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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