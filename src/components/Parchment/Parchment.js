import React from 'react';

import './Parchment.css';

function Parchment({ className, children, props }) {
  let fullClassName = 'Parchment';
  if (className) {
    fullClassName += ' ' + className;
  }

  return (
    <div className={fullClassName} {...props}>
        {children}
    </div>
  );
}

export default Parchment;
