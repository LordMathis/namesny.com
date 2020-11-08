import React from "react"
import { Link } from "gatsby"
import styles from '../styles/post-link.module.scss'

const PostLink = ({ post }) => {

  const postDate = new Date(post.frontmatter.date)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const postDateString = postDate.toLocaleDateString('en', options);
  const postUrl = "/posts" + post.fields.slug

  return (
    <Link to={postUrl}>
      <div className={styles.postListItem} role="listitem">
        <div className={styles.postHeader} >
          <span className={styles.postTitle}>{post.frontmatter.title}</span>
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