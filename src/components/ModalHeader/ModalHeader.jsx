import React from 'react';
import { Icon } from '../../icon';
import '../ModalHeader/ModalHeader.scss';

const ModalHeader = ({ title, onClose }) => {
  return (
    <div className="modal-header">
      <h2 className="modal-header__title">{title}</h2>
      <button 
        type="button" 
        className="modal-header__close"
        onClick={onClose}
        aria-label="Close modal"
      >
        <Icon name="x-14x14" style={{ opacity: 0.5 }} />
      </button>
    </div>
  );
};

export default ModalHeader;
