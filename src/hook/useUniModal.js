import React, {
  useEffect, useReducer, useCallback, useMemo,
} from 'react';
import UniModal from '../component/UniModal';

const defaultSymbol = Symbol('__default__');
const listeners = {};

const parseParams = (...params) => {
  let id = defaultSymbol;
  let config = {};
  if (params.length === 1) {
    if (typeof params[0] === 'string') {
      [id] = params;
    } else if (typeof params[0] === 'object') {
      [config] = params;
    }
  } else if (params.length > 1) {
    [id, config] = params;
  }
  return { id, config };
};

export const showModal = (id = defaultSymbol) => {
  listeners[id]?.displayCallback(true);
};

export const hideModal = (id = defaultSymbol) => {
  listeners[id]?.displayCallback(false);
};

export const updateModal = (...params) => {
  const { id, config } = parseParams(params);
  listeners[id]?.updateCallback(config);
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'display_modal': {
      return {
        ...state,
        open: action.payload.open,
      };
    }
    case 'update_modal': {
      return {
        ...state,
        header: typeof action.payload.header === 'undefined' ? state.header : action.payload.header,
        body: typeof action.payload.body === 'undefined' ? state.body : action.payload.body,
        footer: typeof action.payload.footer === 'undefined' ? state.footer : action.payload.footer,
      };
    }
    default:
      return state;
  }
};

export const useUniModal = (...params) => {
  const { id, config } = parseParams(params);

  const [state, dispatch] = useReducer(reducer, { id, open: false, ...config });
  useEffect(() => {
    listeners[id] = {
      id,
      updateCallback: ({ header, body, footer }) => {
        dispatch({
          type: 'update_modal',
          payload: {
            header,
            body,
            footer,
          },
        });
      },
      displayCallback: (open) => {
        dispatch({
          type: 'display_modal',
          payload: {
            open,
          },
        });
      },
    };
    return () => {
      delete listeners[id];
    };
  }, [id]);

  const open = useMemo(() => state.open, [state.open]);
  const body = useMemo(() => (typeof state.body === 'function' ? <state.body /> : state.body), [state.body]);
  const header = useMemo(() => (typeof state.header === 'function' ? <state.header /> : state.header), [state.header]);
  const footer = useMemo(() => (typeof state.footer === 'function' ? <state.footer /> : state.footer), [state.footer]);

  return useCallback(
    () => <UniModal open={open} hideFn={() => hideModal(id)} header={header} body={body} footer={footer} />,
    [id, open, header, body, footer],
  );
};
