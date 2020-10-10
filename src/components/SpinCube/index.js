import React from 'react';
import cl from 'classnames';
import s from './SpinCube.module.scss';

function SpinCube() {
  return (
    <div className={s.box}>
      <span className={cl(s.side, s.top)}></span>
      <span className={cl(s.side, s.bottom)}></span>
      <span className={cl(s.side, s.left)}></span>
      <span className={cl(s.side, s.right)}></span>
      <span className={cl(s.side, s.front)}></span>
      <span className={cl(s.side, s.back)}></span>
    </div>
  );
}

export default SpinCube;
