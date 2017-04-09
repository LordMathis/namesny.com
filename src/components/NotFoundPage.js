import React from 'react';
import { Link } from 'react-router-dom';

export class NotFoundPage extends React.Component {
  componentWillMount() {
    const { staticContext } = this.props;
    if (staticContext) {
      staticContext.is404 = true;
    }
  }

  render() {
    return (
      <div className="content">
        <h1>Uhm... WHAT?</h1>
        <h2>Looks like you're lost</h2>
        <p>404 Page not found</p>
      </div>
    );
  }
}

export default NotFoundPage;
