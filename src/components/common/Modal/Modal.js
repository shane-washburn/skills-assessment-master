import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

// Inline SVG components
const CloseIcon = ({ className, ...props }) => (
  <svg 
    className={className}
    width="14" 
    height="14" 
    viewBox="0 0 14 14" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path 
      d="M9.058 7L13.4682 2.58984C14.115 1.94304 14.1812 0.950748 13.6152 0.384837C13.0493 -0.181231 12.057 -0.114964 11.4102 0.531837L7 4.942L2.58984 0.531837C1.94304 -0.114964 0.950748 -0.181231 0.384837 0.384837C-0.181231 0.950748 -0.114964 1.94304 0.531837 2.58984L4.942 7L0.531837 11.4102C-0.114964 12.057 -0.181231 13.0493 0.384837 13.6152C0.950748 14.1812 1.94304 14.115 2.58984 13.4682L7 9.058L11.4102 13.4682C12.057 14.115 13.0493 14.1812 13.6152 13.6152C14.1812 13.0493 14.115 12.057 13.4682 11.4102L9.058 7" 
      fill="currentColor"
    />
  </svg>
);

const PeopleIcon = ({ className, ...props }) => (
  <svg 
    className={className}
    width="18" 
    height="15" 
    viewBox="0 0 18 15" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path 
      d="M11.2875 9.572c.352-.048.716.478 1.088.478 3.101 0 5.625 1.208 5.625 3.373V15h-4.5v-1.577c0-1.525-.841-2.88-2.213-3.851zM5.761 10c3.308 0 5.746 1.258 5.746 3.423V15H0v-1.577C0 11.258 2.453 10 5.761 10zm.025-10C8.266 0 10.286 1.962 10.286 4.375S8.267 8.75 5.786 8.75C3.304 8.75 1.286 6.788 1.286 4.375S3.305 0 5.786 0zm7.714 2.5c1.772 0 3.214 1.402 3.214 3.125S15.272 8.75 13.5 8.75c-.793 0-1.52-.281-2.081-.745.508-.892.795-1.916.795-2.93 0-.721-.126-1.414-.358-2.059.48-.28 1.043-.441 1.644-.441z" 
      fill="currentColor"
    />
  </svg>
);

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
          <CloseIcon className="modal__close" onClick={onClose} />
        </div>
        <div className="modal__content">
          {userName && (
            <div className="modal__content-header">
                        

              <PeopleIcon className="modal__user-icon" />
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
