import React, { useState, useEffect } from 'react';
import InputField from '../../common/InputField/InputField';
import PasswordRequirements from './PasswordRequirements';

const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  
  return {
    isValid: minLength && hasNumber && hasSpecialChar && hasUpperCase,
    minLength,
    hasNumber,
    hasSpecialChar,
    hasUpperCase
  };
};

const PasswordField = ({
  value,
  onChange,
  showValidation = false,
  onValidationChange
}) => {
  const [touched, setTouched] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const validation = validatePassword(value);

  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(validation.isValid);
    }
  }, [validation.isValid, onValidationChange]);

  const handleFocus = () => {
    setShowRequirements(true);
  };

  const handleBlur = () => {
    setTouched(true);
    setShowRequirements(false);
  };

  const shouldShowError = showValidation && touched && value && !validation.isValid;

  return (
    <div className="password-field">
      <InputField
        type="password"
        id="password"
        label="Update Password (optional)"
        placeholder="Enter new password"
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={shouldShowError ? 'Please enter a valid password' : ''}
      />
      
      {showRequirements && (
        <div className="password-field__requirements">
          <PasswordRequirements validation={validation} />
        </div>
      )}
    </div>
  );
};

export default PasswordField;
