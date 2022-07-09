import { useEffect, useReducer, useCallback, useMemo } from 'react';

const defaultSimbol = Symbol('__default__');
let listeners = [];

export const showModal = (id = defaultSimbol) => {
  listeners.forEach(({ id: listenersId, displayCallback }) => {
    if (listenersId === id) {
      displayCallback(true);
    }
  });
}

export const hideModal = (id = defaultSimbol) => {
  listeners.forEach(({ id: listenersId, displayCallback }) => {
    if (listenersId === id) {
      displayCallback(false);
    }
  });
}

export const updateModal = (config, id = defaultSimbol) => {
  listeners.forEach(({ id: listenersId, updateCallback }) => {
    if (listenersId === id) {
      updateCallback(config);
    }
  });
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'display_modal': {
      return {
        ...state,
        open: action.payload.open
      }
    }
    case 'update_modal': {
      return {
        ...state,
        header: typeof action.payload.header === 'undefined' ? state.header : action.payload.header,
        body: typeof action.payload.body === 'undefined' ? state.body : action.payload.body,
        footer: typeof action.payload.footer === 'undefined' ? state.footer : action.payload.footer
      }
    }
    default:
      return state;
  }
}

const UniModal = ({
  open,
  hideFn,
  header,
  body,
  footer
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="uni-modal">
      <button type="button" onClick={hideFn}>close</button>
      {header && <div className="uni-modal__header">{header}</div>}
      {body && <div className="uni-modal__body">{body}</div>}
      {footer && <div className="uni-modal__footer">{footer}</div>}
    </div>
  )
}

export const useUniModal = (...params) => {
  let id = defaultSimbol;
  let config = {};
  if (params.length === 1) {
    if (typeof params[0] === 'string') {
      id = params[0]
    } else if (typeof params[0] === 'object') {
      config = params[0]
    }
  } else if (params.length > 1) {
    [id, config] = params;
  }
  const [state, dispatch] = useReducer(reducer, { id, open: false, ...config });
  useEffect(() => {
    listeners.push({
      id,
      updateCallback: ({ header, body, footer }) => {
        dispatch({
          type: 'update_modal',
          payload: {
            header,
            body,
            footer
          }
        });
      },
      displayCallback: (open) => {
        dispatch({
          type: 'display_modal',
          payload: {
            open
          }
        })
      }
    });
    return () => {
      listeners = listeners.filter(({ id: listenerId }) => listenerId !== id );
    }
  }, [id]);

  const open = useMemo(() => state.open, [state.open]);
  const body = useMemo(() => typeof state.body === 'function' ? <state.body /> : state.body, [state.body]);
  const header = useMemo(() => typeof state.header === 'function' ? <state.header /> : state.header, [state.header]);
  const footer = useMemo(() => typeof state.footer === 'function' ? <state.footer /> : state.footer, [state.footer]);

  const memoizedCallback = useCallback(
    () => <UniModal open={open} hideFn={() => hideModal(id)} header={header} body={body} footer={footer} />,
    [id, open, header, body, footer],
  );
  return memoizedCallback;
}
