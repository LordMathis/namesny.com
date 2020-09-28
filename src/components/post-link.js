import React from "react"
import { Link } from "gatsby"
import styles from '../styles/post-link.module.scss'

const PostLink = ({ post }) => {

  const postDate = new Date(post.frontmatter.date)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const postDateString = postDate.toLocaleDateString('en', options);

  return (
    <div className={styles.postListItem} role="listitem">
      <div className={styles.postHeader} >
        <a href={post.frontmatter.link} className={styles.postTitle}>{post.frontmatter.title}</a>
        <span className={styles.postDate}>{postDateString}</span>
      </div>
      <div>
        <p>{post.excerpt}</p>
      </div>
    </div>
  )
}

export default PostLink