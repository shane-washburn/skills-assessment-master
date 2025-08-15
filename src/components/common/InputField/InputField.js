import React from 'react';
import './InputField.scss';

const InputField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder = '',
  className = '',
  ...props
}) => {
  const inputClasses = `input-field__input ${error ? 'input-field__input--error' : ''} ${className}`;
  const labelClasses = `input-field__label ${error ? 'input-field__label--error' : ''}`;

  return (
    <div className="input-field">
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={inputClasses}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        {...props}
      />
      {error && <div className="input-field__error">{error}</div>}
    </div>
  );
};

export default InputField;
