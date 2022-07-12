import React from 'react';
import PropTypes from 'prop-types';

function UniModal({
  open = false,
  hideFn = () => {},
  header = null,
  body = null,
  footer = null,
}) {
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
  );
}

UniModal.propTypes = {
  open: PropTypes.bool,
  hideFn: PropTypes.func,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default UniModal;
