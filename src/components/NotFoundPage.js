import React from 'react';
import '../static/stylesheets/globals.scss';
import contentStyle from '../static/stylesheets/content.scss';

export const NotFoundPage = (props) => {
  if (props.location.pathname === '/') {
    return null;
  }
  return (
    <div>
      <div className={contentStyle.contentWrapper}>
        <h1>Uhm... WHAT?</h1>
        <h2>Looks like you&apos;re lost</h2>
        <p>404 Page not found</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
