import React, { useState, useRef, useEffect, useCallback } from 'react';
import './AnimatedCursor.scss';
import cl from 'classnames';

// Hook
function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}

function AnimatedCursor() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [cursorShadow, setCursorShadow] = useState(false);

  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const MouseMoveHandler = useCallback(
    ({ clientX, clientY }) => {
      // Update coordinates
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );

  const MouseDownHandler = useCallback(() => {
    setCursorShadow(true);
  }, []);

  const MouseUpHandler = useCallback(() => {
    setCursorShadow(false);
  }, []);

  // Add event listener using our hook
  useEventListener('mousemove', MouseMoveHandler);
  useEventListener('mousedown', MouseDownHandler);
  useEventListener('mouseup', MouseUpHandler);

  return (
    <>
      <div
        className={cl('AnimatedCursor-cursor', {
          'AnimatedCursor-cursor-shadow': cursorShadow,
        })}
        style={{ top: coords.y, left: coords.x }}
      />
    </>
  );
}

export default AnimatedCursor;
