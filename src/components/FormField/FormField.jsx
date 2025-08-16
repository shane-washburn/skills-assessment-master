import React from 'react';
import '../FormField/FormField.scss';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder = '',
  autoComplete = 'off',
  required = false
}) => {
  const showError = error && touched;
  
  return (
    <div className={`form-field ${showError ? 'form-field--error' : ''}`}>
      {label && (
        <label htmlFor={name} className="form-field__label">
          {label}
          {required && <span className="form-field__required">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="form-field__input"
        aria-invalid={showError}
        aria-describedby={showError ? `${name}-error` : undefined}
      />
      {showError && (
        <div id={`${name}-error`} className="form-field__error">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;
