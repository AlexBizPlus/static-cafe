import React from 'react';
import cl from 'classnames';
import './Neon.scss';
import { getRandomInteger } from '../../utils/utils';

function Neon({ word = 'Bar' }) {
  return (
    <div className={cl(`Neon-container`)}>
      <p className={cl(`Neon-word`)}>
        {word.split('').map((letter, index) => (
          <span
            className={cl(`Neon-letter`, `Neon-delay${getRandomInteger(1, 4)}`)}
            key={index}
          >
            {letter}
          </span>
        ))}
      </p>
    </div>
  );
}

export default Neon;
