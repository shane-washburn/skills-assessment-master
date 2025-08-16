import React from 'react';
import '../FormSection/FormSection.scss';

const FormSection = ({ title, children, className = '' }) => {
  return (
    <div className={`form-section ${className}`}>
      {title && <h3 className="form-section__title">{title}</h3>}
      <div className="form-section__content">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
