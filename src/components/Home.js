import React, {Component, PropTypes} from 'react';
import config from '../config/config.json';
import {Link} from 'react-router-dom';

export default class Home extends Component {
  constructor() {
    super();
  }

  render() {
    var socialLinks = [];
    var key = 0;
    for (var i in config.social) {
      socialLinks.push(
          <a key={key} href={config.social[i]}>
            <i className={"fa fa-" + i + " fa-3x"}></i>
          </a>
      );
      key++;
    };
    socialLinks.push(
      <a key={key} href={"mailto:" + config.email}><i className="fa fa-envelope-o fa-3x" aria-hidden="true"></i></a>
    )

    return (
      <div id="cover-page" className={this.props.location.pathname == '/' ? "cover-page-full" : "cover-page-collapsed"}>
        <div id="cover-page-content">
          <div>
            <h1 id="cover-page-name"><Link to='/'>{ config.name }</Link></h1>
          </div>
          <div className="social">
              {socialLinks}
          </div>
          <div className="menu-links">
            <ul>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/blog'>Blog</Link></li>
              <li><Link to='/portfolio'>Portfolio</Link></li>
              <li><Link to='/resume'>Resume</Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
