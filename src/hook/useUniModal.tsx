import React, {
  useEffect, useReducer, useCallback, useMemo, ReactElement, Reducer,
} from 'react';
import UniModal from '../component/UniModal';

const defaultSymbol = Symbol('__default__');
const listeners = {};

export const showModal = (id = defaultSymbol) => {
  listeners[id]?.displayCallback(true);
};

export const hideModal = (id = defaultSymbol) => {
  listeners[id]?.displayCallback(false);
};

export const updateModal = ({ id = defaultSymbol, ...config }) => {
  listeners[id]?.updateCallback(config);
};

type State = {
  id?: string | symbol,
  open: boolean,
  header?: string | ReactElement,
  body?: string | ReactElement,
  footer?: string | ReactElement
};

type Action =
  | { type: 'display_modal', payload: { open: boolean } }
  | { type: 'update_modal', payload: { header?: string | ReactElement, body?: string | ReactElement, footer?: string | ReactElement } };

const reducer: Reducer<State, Action> = (state: State, action: Action) => {
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

export const useUniModal = ({ id = defaultSymbol, ...config }) => {
  const [state, dispatch] = useReducer(reducer, { id, open: false, ...config });
  useEffect(() => {
    listeners[id] = {
      id,
      updateCallback: ({ header, body, footer } : { header: ReactElement | string, body: ReactElement | string, footer: ReactElement | string }) => {
        dispatch({
          type: 'update_modal',
          payload: {
            header,
            body,
            footer,
          },
        });
      },
      displayCallback: (open: boolean) => {
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
  const header = useMemo(() => state.header || null, [state.header]);
  const body = useMemo(() => state.body || null, [state.body]);
  const footer = useMemo(() => state.footer || null, [state.footer]);
  const hideFn = () => hideModal(id);

  return useCallback(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line react/jsx-props-no-spreading
    (props) => <UniModal open={open} hideFn={hideFn} header={header} body={body} footer={footer} {...props} />,
    [id, open, header, body, footer],
  );
};
