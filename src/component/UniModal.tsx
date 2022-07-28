import React, { useEffect, ReactNode } from 'react';
import PropTypes from 'prop-types';
import CrossIcon from './CrossIcon';

type UniModalProps = {
  open: boolean,
  hideFn: () => void,
  header: ReactNode,
  body: ReactNode,
  footer: ReactNode,
  closeOnOutsideClick: void | boolean
};

const UniModal: React.FC<UniModalProps> = ({
  open = false,
  hideFn,
  header = null,
  body = null,
  footer = null,
  closeOnOutsideClick = false,
}): (JSX.Element | null) => {
  useEffect(() => {
    if (closeOnOutsideClick && open && hideFn) {
      const clickHandler = (evt: Event) => {
        if (!(evt.target as HTMLElement).closest('.uni-modal')) {
          hideFn();
        }
      };
      window.addEventListener('click', clickHandler, true);
      return () => {
        window.removeEventListener('click', clickHandler, true);
      };
    }
    return () => {};
  }, [closeOnOutsideClick, open, hideFn]);

  if (!open) {
    return null;
  }

  return (
    <div className="uni-modal__wrap">
      <div className="uni-modal">
        <button className="uni-modal__close-button" type="button" onClick={hideFn} aria-label="close">
          <CrossIcon />
        </button>
        {header && <div className="uni-modal__header">{header}</div>}
        <div className="uni-modal__body">{body}</div>
        {footer && <div className="uni-modal__footer">{footer}</div>}
      </div>
    </div>
  );
};

UniModal.propTypes = {
  open: PropTypes.bool.isRequired,
  hideFn: PropTypes.func.isRequired,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  closeOnOutsideClick: PropTypes.bool,
};

export default UniModal;
