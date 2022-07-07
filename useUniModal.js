import { useState } from 'react';

const listeners = [];

export const updateModal = (newText) => {
  listeners.forEach(listener => listener(newText));
}

const useUniModal = () => {
  const [modal, setModal] = useState(() => () => null);
  listeners.push((newModal) => {
    if (typeof newModal === 'function') {
      setModal(() => newModal);
    } else {
      throw new Error('not valid react component')
    }
  });
  return modal;
}

export default useUniModal;
