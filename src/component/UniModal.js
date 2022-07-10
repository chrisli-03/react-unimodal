import React from 'react';

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

export default UniModal;
