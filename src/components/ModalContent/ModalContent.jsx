import React from 'react';
import '../ModalContent/ModalContent.scss';

const ModalContent = ({ children, className = '' }) => {
  return (
    <div className={`modal-content ${className}`}>
      {children}
    </div>
  );
};

export default ModalContent;
