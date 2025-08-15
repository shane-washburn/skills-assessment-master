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
        <label htmlFor={id || name} className={labelClasses}>
          {label}
        </label>
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
      {error && <div className="input-field__error">{error}</div>}
    </div>
  );
};

export default InputField;
