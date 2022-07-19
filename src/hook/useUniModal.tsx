import { __assign, __rest } from 'tslib';
import React, {
  useEffect, useReducer, useCallback, useMemo,
} from 'react';
import UniModal from '../component/UniModal';

const defaultSymbol = Symbol('__default__');
const listeners = {};
export var showModal = function (id) {
  let _a;
  if (id === void 0) {
    id = defaultSymbol;
  }
  (_a = listeners[id]) === null || _a === void 0 ? void 0 : _a.displayCallback(true);
};
export var hideModal = function (id) {
  let _a;
  if (id === void 0) {
    id = defaultSymbol;
  }
  (_a = listeners[id]) === null || _a === void 0 ? void 0 : _a.displayCallback(false);
};
export var updateModal = function (_a) {
  let _b;
  const _c = _a.id;
  const id = _c === void 0 ? defaultSymbol : _c;
  const config = __rest(_a, ['id']);
  (_b = listeners[id]) === null || _b === void 0 ? void 0 : _b.updateCallback(config);
};
const reducer = function (state, action) {
  switch (action.type) {
    case 'display_modal': {
      return __assign(__assign({}, state), { open: action.payload.open });
    }
    case 'update_modal': {
      return __assign(__assign({}, state), { header: typeof action.payload.header === 'undefined' ? state.header : action.payload.header, body: typeof action.payload.body === 'undefined' ? state.body : action.payload.body, footer: typeof action.payload.footer === 'undefined' ? state.footer : action.payload.footer });
    }
    default:
      return state;
  }
};
export var useUniModal = function (_a) {
  const _b = _a.id;
  const id = _b === void 0 ? defaultSymbol : _b;
  const config = __rest(_a, ['id']);
  const _c = useReducer(reducer, __assign({ id, open: false }, config));
  const state = _c[0];
  const dispatch = _c[1];
  useEffect(() => {
    listeners[id] = {
      id,
      updateCallback(_a) {
        const { header } = _a;
        const { body } = _a;
        const { footer } = _a;
        dispatch({
          type: 'update_modal',
          payload: {
            header,
            body,
            footer,
          },
        });
      },
      displayCallback(open) {
        dispatch({
          type: 'display_modal',
          payload: {
            open,
          },
        });
      },
    };
    return function () {
      delete listeners[id];
    };
  }, [id]);
  const open = useMemo(() => state.open, [state.open]);
  const header = useMemo(() => state.header || null, [state.header]);
  const body = useMemo(() => state.body || null, [state.body]);
  const footer = useMemo(() => state.footer || null, [state.footer]);
  const hideFn = function () { return hideModal(id); };
  return useCallback(() => React.createElement(UniModal, {
    open,
    hideFn,
    header,
    body,
    footer,
  }), [id, open, header, body, footer]);
};
// # sourceMappingURL=useUniModal.js.map
// # sourceMappingURL=useUniModal.js.map
// # sourceMappingURL=useUniModal.js.map
// # sourceMappingURL=useUniModal.js.map
