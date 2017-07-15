import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../static/config/config.json';

export default class Home extends Component {

  render() {
    let key = 0;
    const objKeys = Object.keys(config.social);

    const socialLinks = objKeys.map((val) => {
      const link = (
        <a key={key} href={config.social[val]}>
          <i className={`fa fa-${val} fa-3x`} aria-hidden="true" />
          <span className="sr-only">{val}</span>
        </a>
      );
      key += 1;
      return link;
    });

    socialLinks.push(
      <a key={key} href={`mailto:${config.email}`}>
        <i className="fa fa-envelope-o fa-3x" aria-hidden="true" />
        <span className="sr-only">e-mail</span>
      </a>,
    );

    return (
      <div id="cover-page" className={this.props.location.pathname === '/' ? 'cover-page-full' : 'cover-page-collapsed'}>
        <div id="cover-page-content">
          <div>
            <h1 id="cover-page-name"><Link to="/">{ config.name }</Link></h1>
          </div>
          <div className="social">
            {socialLinks}
          </div>
          <div className="menu-links">
            <ul>
              <li>
                <Link to="/about">
                  <i className="fa fa-question" aria-hidden="true" /> About
                </Link>
              </li>
              <li>
                <Link to="/blog">
                  <i className="fa fa-rss" aria-hidden="true" /> Blog
                </Link>
              </li>
              <li>
                <Link to="/portfolio">
                  <i className="fa fa-briefcase" aria-hidden="true" /> Portfolio
                </Link>
              </li>
              <li>
                <Link to="/resume">
                  <i className="fa fa-file-text-o" aria-hidden="true" /> Resume
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
