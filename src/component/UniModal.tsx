import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

type UniModalProps = {
  open: boolean,
  hideFn: () => void,
  header: null | string | ReactElement,
  body: null | string | ReactElement,
  footer: null | string | ReactElement
};

const UniModal: React.FC<UniModalProps> = ({
  open = false,
  hideFn,
  header = null,
  body = null,
  footer = null,
}): (JSX.Element | null) => {
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
};

UniModal.propTypes = {
  open: PropTypes.bool.isRequired,
  hideFn: PropTypes.func.isRequired,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default UniModal;
