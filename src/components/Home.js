import React, {Component, PropTypes} from 'react';
import config from '../config/config.json';
import {Link} from 'react-router-dom';

export default class Home extends Component {

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
              <li><Link to='/about'><i className="fa fa-question" aria-hidden="true"></i> About</Link></li>
              <li><Link to='/blog'><i className="fa fa-rss" aria-hidden="true"></i> Blog</Link></li>
              <li><Link to='/portfolio'><i className="fa fa-briefcase" aria-hidden="true"></i> Portfolio</Link></li>
              <li><Link to='/resume'><i className="fa fa-file-text-o" aria-hidden="true"></i> Resume</Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
