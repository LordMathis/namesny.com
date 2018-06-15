import React, {Component} from 'react';
import {Wrapper, NotFoundPage} from '.';
import '../static/stylesheets/globals.scss';
import styles from './Wrapper.scss';

export default class NotFoundWrapper extends Component {

  render () {
    return (
      <Wrapper>
        <NotFoundPage />
      </Wrapper>
    )
  }
}
