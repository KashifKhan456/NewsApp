import React, { Component } from 'react';
import Loading from '../spinner.gif';

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-3'>
        <img src={Loading} alt="Spinner" />
      </div>
    )
  }
}
