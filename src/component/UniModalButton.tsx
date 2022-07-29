import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

type UniModalButtonProps = {
  children: ReactNode,
  type?: 'default' | 'primary',
  onClick: () => void,
};

const UniModalButton: React.FC<UniModalButtonProps> = ({
  children,
  type = 'default',
  onClick,
}): JSX.Element => (
  <button
    className={`uni-modal-button uni-modal-button--${type}`}
    onClick={onClick}
  >
    {children}
  </button>
);

UniModalButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  type: PropTypes.oneOf(['default', 'primary']),
  onClick: PropTypes.func.isRequired,
};

export default UniModalButton;
