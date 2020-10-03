import React from "react"
import { Link } from "gatsby"
import styles from '../styles/post-link.module.scss'

const PostLink = ({ post }) => {

  const postDate = new Date(post.frontmatter.date)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const postDateString = postDate.toLocaleDateString('en', options);
  const postUrl = "/posts/" + post.fileAbsolutePath.split('/').pop().split(".")[0]

  return (
    <Link to={postUrl}>
      <div className={styles.postListItem} role="listitem">
        <div className={styles.postHeader} >
          <a href={post.frontmatter.link} className={styles.postTitle}>{post.frontmatter.title}</a>
          <span className={styles.postDate}>{postDateString}</span>
        </div>
        <div className={styles.postExcerpt}>
          <p>{post.excerpt}</p>
        </div>
      </div>
    </Link>

  )
}

export default PostLink