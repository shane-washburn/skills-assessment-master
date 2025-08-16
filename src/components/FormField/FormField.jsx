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
    <div 
      className={`form-field ${showError ? 'form-field--error' : ''}`}
      data-type={type}
      data-name={name}
    >
      {label && (
        <label htmlFor={name} className="form-field__label">
          {label}
          {required && <span className="form-field__required">*</span>}
        </label>
      )}
      <div className="form-field__input-wrapper">
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
        {type === 'password' && (
          <div className="form-field__icon">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <use xlinkHref={`/assets/sprite.svg#${name === 'password' ? 'key-16x16' : 'key-check-16x16'}`} />
            </svg>
          </div>
        )}
      </div>
      {showError && (
        <div id={`${name}-error`} className="form-field__error">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;
