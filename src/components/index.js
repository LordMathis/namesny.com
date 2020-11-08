import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "../styles/index.module.scss"
import Social from "./social"

const Index = ({ author, social, email }) => (
  <div className={styles.indexWrapper}>
      <div>
        <h1 className={styles.header}>{ author }</h1>
      </div>
      <Social social={social} email={email}/>
  </div>
)

Index.propTypes = {
}

export default Index
