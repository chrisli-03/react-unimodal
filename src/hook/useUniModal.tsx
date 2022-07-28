import React, {
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  ReactNode,
  Reducer,
} from 'react';
import * as ReactDOM from 'react-dom';
import UniModal from '../component/UniModal';

const defaultSymbol = Symbol('__default__');
const listeners = {};

export const showModal = (id: string | symbol = defaultSymbol) => {
  listeners[id]?.displayCallback(true);
};

export const hideModal = (id: string | symbol = defaultSymbol) => {
  listeners[id]?.displayCallback(false);
};

type UpdateState = {
  id?: string | symbol,
  header?: ReactNode,
  body?: ReactNode,
  footer?: ReactNode
};

export const updateModal = ({
  id = defaultSymbol,
  header,
  body,
  footer,
}: UpdateState) => {
  listeners[id]?.updateCallback({ header, body, footer });
};

type State = {
  id?: string | symbol,
  open: boolean,
  header?: ReactNode,
  body?: ReactNode,
  footer?: ReactNode
};

type Action =
  | { type: 'display_modal', payload: { open: boolean } }
  | { type: 'update_modal', payload: { header?: ReactNode, body?: ReactNode, footer?: ReactNode } };

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

export const useUniModal = ({ id = defaultSymbol, ...config }: UpdateState, portal?: HTMLElement) => {
  const [state, dispatch] = useReducer(reducer, { id, open: false, ...config });
  useEffect(() => {
    listeners[id] = {
      id,
      updateCallback: ({ header, body, footer } : { header?: ReactNode, body?: ReactNode, footer?: ReactNode }) => {
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
    (props: JSX.IntrinsicAttributes & { open: boolean; hideFn: () => void; header: ReactNode; body: ReactNode; footer: ReactNode; closeOnOutsideClick: boolean | void; }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line react/jsx-props-no-spreading
      const modal = <UniModal open={open} hideFn={hideFn} header={header} body={body} footer={footer} {...props} />;
      if (!portal) {
        return modal;
      }
      return ReactDOM.createPortal(modal, portal);
    },
    [id, open, header, body, footer],
  );
};
