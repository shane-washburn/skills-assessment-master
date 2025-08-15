import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const Modal = ({ isOpen, onClose, title, children, userName }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <button 
            className="modal__close" 
            onClick={onClose}
            aria-label="Close modal"
          />
        </div>
        <div className="modal__content">
          {userName && (
            <div className="modal__content-header">
              <div className="modal__user-icon" />
              <h4 className="modal__user-name">{userName}</h4>
            </div>
          )}
          <div className="modal__content-body">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
