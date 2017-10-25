import React from 'react';

export const Blog = (props) => (
  <div>
    <div className="content">
      <h1>{ props.data.isLoading ? 'Loading...' : 'Blog' }</h1>
    </div>
  </div>
);

export default Blog;
