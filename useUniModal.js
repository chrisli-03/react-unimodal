import { useReducer, useCallback } from 'react';

const defaultSimbol = Symbol('__default__');
const listeners = [];

export const updateModal = (config, id = defaultSimbol) => {
  listeners.forEach(({ id: listenersId, callback }) => {
    if (listenersId === id) {
      callback(config);
    }
  });
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'update_modal': {
      return {
        ...state,
        body: action.payload.body
      }
    }
    default:
      return state;
  }
}

const UniModal = ({
  body
}) => {
  return (
    <div className="uni-modal">
      {body}
    </div>
  )
}

const useUniModal = (id = defaultSimbol) => {
  const [state, dispatch] = useReducer(reducer, { id, body: () => null });
  listeners.push({
    id,
    callback: ({ body }) => {
      dispatch({
        type: 'update_modal',
        payload: {
          body
        }
      });
    }
  });

  const body = typeof state.body === 'function' ? <state.body /> : state.body;

  const memoizedCallback = useCallback(
    () => <UniModal body={body} />,
    [body],
  );
  return memoizedCallback;
}

export default useUniModal;
