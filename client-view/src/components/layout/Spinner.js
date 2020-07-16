import React, { Fragment } from 'react';
import spinner from '../../../src/spinner.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{
          width: '200px',
          margin: 'auto',
          display: 'block',
          backgroundColor: 'none'
        }}
        alt='Loading..'
      />
    </Fragment>
  );
};
export default Spinner;
