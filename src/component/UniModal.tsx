import React, { useEffect, ReactNode } from 'react';
import PropTypes from 'prop-types';
import CrossIcon from './CrossIcon';

type UniModalProps = {
  open: boolean,
  hideFn: () => void,
  header: ReactNode,
  body: ReactNode,
  footer: ReactNode,
  width: void | number,
  height: void | number,
  closeOnOutsideClick: void | boolean,
  noMask: void | boolean,
  noCloseButton: void | boolean,
};

const UniModal: React.FC<UniModalProps> = ({
  open = false,
  hideFn,
  header = null,
  body = null,
  footer = null,
  width = 520,
  height = null,
  closeOnOutsideClick = false,
  noMask = false,
  noCloseButton = false,
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
    <div className="uni-modal__wrap" data-mask={!noMask}>
      <div className="uni-modal" style={{ width: `${width}px`, height: height ? `${height}px` : 'auto' }}>
        {
          !noCloseButton && (
            <button className="uni-modal__close-button" type="button" onClick={hideFn} aria-label="close">
              <CrossIcon />
            </button>
          )
        }
        {header && <div className="uni-modal__header">{header}</div>}
        {body && <div className="uni-modal__body">{body}</div>}
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
