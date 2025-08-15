import React from 'react';
import './InputField.scss';

const InputField = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder = '',
  error = '',
  className = '',
  autoComplete = 'on',
  hideLabel = false,
  children,
  ...props
}) => {
  const inputClasses = `input-field__input ${error ? 'input-field__input--error' : ''} ${className}`;
  const labelClasses = `input-field__label ${error ? 'input-field__label--error' : ''}`;

  const isPasswordField = type === 'password';
  const inputWithIcon = isPasswordField && React.Children.toArray(children).some(
    child => child && child.type && (
      child.type.name === 'Icon' || 
      child.type.displayName === 'KeyIcon' || 
      child.type.displayName === 'KeyCheckIcon' ||
      (child.props && child.props.className && child.props.className.includes('input-field__icon'))
    )
  );

  const inputClassName = `
    ${inputClasses} 
    ${inputWithIcon ? 'input-field__input--with-icon' : ''} 
    ${isPasswordField ? 'input-field__input--password' : ''}
  `.replace(/\s+/g, ' ').trim();

  return (
    <div className={`input-field ${className} ${error ? 'input-field--error' : ''}`}>
      {label && !hideLabel && (
        <div className="input-field__label-container">
          <svg 
            className={`input-field__error-icon ${error ? 'input-field__error-icon--visible' : ''}`} 
            width="16" 
            height="16" 
            viewBox="0 0 14 14" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden={!error}
          >
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M7 0C3.13382 0 0 3.13413 0 7C0 10.8662 3.13382 14 7 14C10.8659 14 14 10.8662 14 7C14 3.13413 10.8659 0 7 0ZM6.11644 3.60547C6.11644 3.11842 6.5128 2.72222 7 2.72222C7.4872 2.72222 7.88356 3.11842 7.88356 3.60547V7.54242C7.88356 8.02947 7.4872 8.42567 7 8.42567C6.5128 8.42567 6.11644 8.02947 6.11644 7.54242V3.60547ZM5.992 10.2699C5.992 10.8256 6.44436 11.2778 7 11.2778C7.55596 11.2778 8.008 10.8256 8.008 10.2699C8.008 9.71367 7.55596 9.26147 7 9.26147C6.44436 9.26147 5.992 9.71367 5.992 10.2699Z" 
              fill="currentColor"
            />
          </svg>
          <label 
            htmlFor={id || name} 
            className={`${labelClasses} ${error ? 'input-field__label--error' : ''}`}
          >
            {label}
          </label>
        </div>
      )}
      <div className="input-field__wrapper">
        {isPasswordField && (
          <div className="input-field__icon-wrapper">
            {children}
          </div>
        )}
        <input
          id={id}
          type={type}
          className={inputClassName}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          data-has-icon={isPasswordField ? 'true' : 'false'}
          {...props}
        />
      </div>
      {error && error.trim() !== '' && (
        <div className="input-field__error">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;
