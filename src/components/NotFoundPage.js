import React from 'react'
import { Navbar, Header } from '.'
import '../stylesheets/globals.scss'
import contentStyle from '../stylesheets/content.scss'

const NotFoundPage = (props) => {
  return (
    <div>
      <Navbar config={props.config}/>
      <div className={contentStyle.contentWrapper}>
        <Header header={'Uhm... WHAT?'} />
        <div className={contentStyle.content}>
          <p>Looks like you&apos;re lost</p>
          <p>404 Page not found</p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
