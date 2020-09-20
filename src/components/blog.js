import React from "react"
import PostLink from "./post-link"

const Blog = ({ edges }) => {
  const Posts = edges
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)
  return <div>{Posts}</div>
}

export default Blog
