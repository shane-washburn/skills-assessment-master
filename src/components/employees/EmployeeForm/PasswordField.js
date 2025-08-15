import React, { useState, useEffect } from 'react';
import InputField from '../../common/InputField/InputField';

export const KeyIcon = ({ className, ...props }) => (
  <svg 
    className={className}
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{
      display: 'block',
      fill: 'currentColor'
    }}
    {...props}
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M10.6667 0C7.72133 0 5.33333 2.388 5.33333 5.33333C5.33333 5.74467 5.384 6.14333 5.472 6.528L0 12V16H4V14H6V12H8L9.47267 10.528C9.85733 10.616 10.256 10.6667 10.6667 10.6667C13.612 10.6667 16 8.27867 16 5.33333C16 2.388 13.612 0 10.6667 0ZM11.6667 5.33333C11.1147 5.33333 10.6667 4.88533 10.6667 4.33333C10.6667 3.78067 11.1147 3.33333 11.6667 3.33333C12.2187 3.33333 12.6667 3.78067 12.6667 4.33333C12.6667 4.88533 12.2187 5.33333 11.6667 5.33333Z" 
      fill="currentColor"
    />
  </svg>
);

KeyIcon.displayName = 'KeyIcon';

export const KeyCheckIcon = ({ className, ...props }) => (
  <svg 
    className={className}
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{
      display: 'block',
      fill: 'currentColor'
    }}
    {...props}
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M5.33333 5.33333C5.33333 2.388 7.72133 0 10.6667 0C13.612 0 16 2.388 16 5.33333C16 6.09951 15.8384 6.82797 15.5474 7.4865C14.5146 6.44501 13.0826 5.8 11.5 5.8C8.35198 5.8 5.8 8.35198 5.8 11.5C5.8 12.0199 5.8696 12.5235 6 13.0021V14H4V16H0V12L5.472 6.528C5.384 6.14333 5.33333 5.74467 5.33333 5.33333ZM10.6667 4.33333C10.6667 4.88533 11.1147 5.33333 11.6667 5.33333C12.2187 5.33333 12.6667 4.88533 12.6667 4.33333C12.6667 3.78067 12.2187 3.33333 11.6667 3.33333C11.1147 3.33333 10.6667 3.78067 10.6667 4.33333ZM11.5 16C9.01472 16 7 13.9853 7 11.5C7 9.01472 9.01472 7 11.5 7C13.9853 7 16 9.01472 16 11.5C16 13.9853 13.9853 16 11.5 16ZM14.0652 9.82616C14.2539 9.52275 14.1777 9.11314 13.895 8.91131C13.611 8.70815 13.2305 8.79126 13.0425 9.09401L10.925 12.5028L9.59248 11.5497C9.30852 11.3465 8.92744 11.4296 8.73997 11.7324C8.55128 12.0358 8.6275 12.4454 8.91023 12.6472L11.2655 14.3325L14.0652 9.82616Z" 
      fill="currentColor"
    />
  </svg>
);

KeyCheckIcon.displayName = 'KeyCheckIcon';

const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  
  return {
    isValid: minLength && hasNumber && hasUpperCase && hasLowerCase,
    minLength,
    hasNumber,
    hasUpperCase,
    hasLowerCase
  };
};

const PasswordField = ({
  value,
  onChange,
  showValidation = false,
  onValidationChange
}) => {
  const [touched, setTouched] = useState(false);
  const validation = React.useMemo(() => validatePassword(value), [value]);
  const prevIsValidRef = React.useRef();

  useEffect(() => {
    if (onValidationChange && prevIsValidRef.current !== validation.isValid) {
      prevIsValidRef.current = validation.isValid;
      onValidationChange(validation.isValid);
    }
  }, [validation.isValid, onValidationChange]);

  const handleBlur = () => {
    setTouched(true);
  };

  const shouldShowError = showValidation && touched && value && !validation.isValid;

  return (
    <div className="password-field">
      <InputField
        type="password"
        id="password"
        label="Password"
        placeholder=""
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        error={shouldShowError ? 'Please enter a valid password' : ''}
        className="password-field__input"
      >
        <KeyIcon className="input-field__icon" />
      </InputField>
    </div>
  );
};

// Export all components for better organization and reusability
export default PasswordField;
