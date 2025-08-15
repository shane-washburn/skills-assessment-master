import React, { useState, useEffect } from 'react';
import InputField from '../../common/InputField/InputField';
import PasswordField, {KeyIcon, KeyCheckIcon} from './PasswordField';
import PasswordRequirements from './PasswordRequirements';
import Button from '../../common/Button/Button';
import './EmployeeForm.scss';

const validatePassword = (password) => {
  return {
    minLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password)
  };
};

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: employee?.firstName || '',
    lastName: employee?.lastName || '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const handlePasswordValidation = (validation) => {
    const isValid = validation.minLength && 
                   validation.hasNumber && 
                   validation.hasUpperCase && 
                   validation.hasLowerCase;
    
    setIsPasswordValid(isValid);
    setPasswordValidation(prev => ({
      ...prev,
      ...validation,
      // Don't override passwordsMatch
      passwordsMatch: prev.passwordsMatch
    }));
  };
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasNumber: false,
    hasUpperCase: false,
    hasLowerCase: false,
    passwordsMatch: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTouched, setIsTouched] = useState({
    firstName: false,
    lastName: false
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        password: ''
      });
      setErrors({});
      setIsTouched({ firstName: false, lastName: false });
    }
  }, [employee]);

  const validateField = (name, value) => {
    if (!value.trim()) {
      // Return a space to maintain error state without showing a message
      return ' ';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Only validate if the field has been touched
    if (isTouched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Only validate on blur if we've already tried to submit
    if (isSubmitting) {
      setIsTouched(prev => ({
        ...prev,
        [name]: true
      }));
      
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const validatePasswordsMatch = (password, confirmPassword) => {
    const match = !password || !confirmPassword || password === confirmPassword;
    setPasswordValidation(prev => ({
      ...prev,
      passwordsMatch: match
    }));
    return match;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFirstSubmit = !isSubmitting;
    setIsSubmitting(true);
    
    // Mark all fields as touched on first submission
    if (isFirstSubmit) {
      setIsTouched({
        firstName: true,
        lastName: true
      });
    }
    
    // Validate all fields
    const newErrors = {
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName)
    };

    // Check if passwords match
    const doPasswordsMatch = validatePasswordsMatch(formData.password, formData.confirmPassword);
    setPasswordsMatch(doPasswordsMatch);

    setErrors(newErrors);

    // Check if form is valid
    const currentPasswordValidation = formData.password ? validatePassword(formData.password) : 
      { minLength: true, hasNumber: true, hasUpperCase: true, hasLowerCase: true };
    
    const passwordValid = formData.password === '' || 
                         (currentPasswordValidation.minLength &&
                          currentPasswordValidation.hasNumber &&
                          currentPasswordValidation.hasUpperCase &&
                          currentPasswordValidation.hasLowerCase &&
                          doPasswordsMatch);
    
    const isFormValid = !Object.values(newErrors).some(error => error) && passwordValid;

    if (isFormValid) {
      // If password is empty, don't include it in the submission
      const submissionData = { ...formData };
      if (!submissionData.password) {
        delete submissionData.password;
      }
      delete submissionData.confirmPassword; // Don't send confirmPassword to the server
      onSubmit(submissionData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="employee-form__section">
        <h4 className="employee-form__subtitle">Employee Info</h4>
        <div className="employee-form__fields">
          <div className="employee-form__field">
            <InputField
              id="firstName"
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  firstName: e.target.value
                }));
              }}
              onBlur={handleBlur}
              error={isSubmitting ? errors.firstName : ''}
              autoComplete="given-name"
            />
          </div>
          <div className="employee-form__field">
            <InputField
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  lastName: e.target.value
                }));
              }}
              onBlur={handleBlur}
              error={isSubmitting ? errors.lastName : ''}
              autoComplete="family-name"
            />
          </div>
        </div>
      </div>
      
      <div className="employee-form__section">
        <h4 className="employee-form__subtitle">Update Password</h4>
        <div className="employee-form__password-wrapper">
          <div className="employee-form__password-col">
            <div className="employee-form__password-field">
              <PasswordField
                value={formData.password}
                onChange={(e) => {
                  const newPassword = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    password: newPassword,
                    confirmPassword: ''
                  }));
                  // Re-validate confirm password when password changes
                  if (formData.confirmPassword) {
                    validatePasswordsMatch(newPassword, formData.confirmPassword);
                  }
                }}
                showValidation={isSubmitting}
                onValidationChange={handlePasswordValidation}
              />
            </div>
            <div className="employee-form__password-field">
              <InputField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => {
                  const newConfirmPassword = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    confirmPassword: newConfirmPassword
                  }));
                  validatePasswordsMatch(formData.password, newConfirmPassword);
                }}
                error={isSubmitting && ((!passwordsMatch && formData.confirmPassword) || (formData.password && !isPasswordValid)) ? ' ' : ''}
                autoComplete="new-password"
              >
                <KeyCheckIcon className="input-field__icon" />
              </InputField>
            </div>
          </div>
          <div className="employee-form__requirements-col">
            <div className="employee-form__requirements-box">
              <PasswordRequirements validation={{
                ...validatePassword(formData.password),
                passwordsMatch: formData.password === formData.confirmPassword || (!formData.password && !formData.confirmPassword)
              }} />
            </div>
          </div>
        </div>
      </div>
      <div className="employee-form__divider"></div>
      <div className="employee-form__actions">
        <Button 
          type="submit" 
          variant="primary"
          className="employee-form__button"
        >
          Save Employee Info
        </Button>
        <Button 
          type="button" 
          variant="secondary"
          onClick={onCancel}
          className="employee-form__button"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
