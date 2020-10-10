/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useRef, useEffect } from 'react';
import s from './SnowEffect.module.scss';
import { getRandomInteger } from '../../utils/utils';
import { SnowBalls, WIDTH, HEIGHT } from '../../utils/const';

const SnowEffect = ({ radius = 1, width = WIDTH, height = HEIGHT }) => {
  const canvasRef = useRef(null);

  const coords = new Array(SnowBalls.MAX_COUNT)
    .fill('')
    .map((elem) => (elem = getRandomInteger(0, width)));

  const snowBall = (ctx, coordX, coordY) => {
    ctx.beginPath();
    ctx.arc(coordX, coordY, radius, 0, 2 * Math.PI);
    ctx.fill();
  };

  const draw = (ctx, coordX, coordY, count) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#ffffff';

    for (let index = 0; index < count; index++) {
      snowBall(
        ctx,
        coordX + coords[index],
        coordY - index * SnowBalls.PADDING_Y
      );
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    let coordX = 0;
    let coordY = 0;
    let animationFrameId;

    const render = () => {
      draw(context, coordX, coordY, SnowBalls.MAX_COUNT);

      if (coordY >= height + SnowBalls.MAX_COUNT * SnowBalls.PADDING_Y) {
        coordY = 0;
      }

      if (coordY < height + SnowBalls.MAX_COUNT * SnowBalls.PADDING_Y) {
        coordY++;
        coordX =
          getRandomInteger(0, 1) === 0
            ? (coordX += getRandomInteger(0, 1))
            : (coordX -= getRandomInteger(0, 1));
      }

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas className={s.body} ref={canvasRef} />;
};

export default SnowEffect;
