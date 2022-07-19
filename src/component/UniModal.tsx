import React from 'react';
import PropTypes from 'prop-types';

const UniModal = (_a) => {
  const _b = _a.open;
  const open = _b === void 0 ? false : _b;
  const { hideFn } = _a;
  const _c = _a.header;
  const header = _c === void 0 ? null : _c;
  const _d = _a.body;
  const body = _d === void 0 ? null : _d;
  const _e = _a.footer;
  const footer = _e === void 0 ? null : _e;
  if (!open) {
    return null;
  }
  return (React.createElement('div', { className: 'uni-modal' }, React.createElement('button', { type: 'button', onClick: hideFn }, 'close'), header && React.createElement('div', { className: 'uni-modal__header' }, header), body && React.createElement('div', { className: 'uni-modal__body' }, body), footer && React.createElement('div', { className: 'uni-modal__footer' }, footer)));
};
UniModal.propTypes = {
  open: PropTypes.bool.isRequired,
  hideFn: PropTypes.func.isRequired,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
export default UniModal;
// # sourceMappingURL=UniModal.js.map
// # sourceMappingURL=UniModal.js.map
// # sourceMappingURL=UniModal.js.map
// # sourceMappingURL=UniModal.js.map
