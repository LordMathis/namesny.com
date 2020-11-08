import React from "react"
import PostLink from "./post-link"
import styles from "../styles/blog.module.scss"

const Blog = ({ edges }) => {
  const Posts = edges
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <div>
      <div className={styles.header}>
        <h1>Blog</h1>
      </div>
      <div>
        {Posts}
      </div>
    </div>
  )
}

export default Blog
