import React, { useState, useEffect } from 'react';
import InputField from '../../common/InputField/InputField';
import PasswordRequirements from './PasswordRequirements';

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
  const validation = validatePassword(value);

  useEffect(() => {
    if (onValidationChange) {
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
      />
      
    </div>
  );
};

export default PasswordField;
