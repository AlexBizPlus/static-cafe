import React, { Component } from 'react';
// import SpinCube from '../SpinCube';
import Neon from '../Neon';
import AnimatedCursor from '../AnimatedCursor';
import SnowEffect from '../SnowEffect';
import s from './App.module.scss';

class App extends Component {
  render() {
    return (
      <div className={s.background}>
        {/* <SpinCube /> */}
        <Neon word={'cafe'} />
        <SnowEffect />
        <AnimatedCursor />
      </div>
    );
  }
}

export default App;
