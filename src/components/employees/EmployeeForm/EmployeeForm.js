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
  const handlePasswordValidation = React.useCallback((validation) => {
    const isValid = validation.minLength && 
                   validation.hasNumber && 
                   validation.hasUpperCase && 
                   validation.hasLowerCase;
    
    setIsPasswordValid(isValid);
    
    setPasswordValidation(prev => {
      const passwordsMatch = !formData.confirmPassword || formData.password === formData.confirmPassword;
      // Only update if something actually changed
      if (prev.minLength === validation.minLength &&
          prev.hasNumber === validation.hasNumber &&
          prev.hasUpperCase === validation.hasUpperCase &&
          prev.hasLowerCase === validation.hasLowerCase &&
          prev.passwordsMatch === passwordsMatch) {
        return prev;
      }
      
      return {
        ...prev,
        ...validation,
        passwordsMatch: passwordsMatch
      };
    });
  }, [formData.password, formData.confirmPassword]);
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
    lastName: false,
    password: false,
    confirmPassword: false
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
    if (name === 'firstName' || name === 'lastName') {
      const isEmpty = !value || !value.trim();
      
      if (isEmpty) {
        return `${name === 'firstName' ? 'First name' : 'Last name'} is required`;
      }
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Only validate during first submission phase
    if (isSubmitting) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, id, value } = e.target;
    const fieldName = name || id; // Fall back to id if name is empty
    
    if (!fieldName) {
      return;
    }
    
    // Mark field as touched
    setIsTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));

    // Always validate on blur
    const error = validateField(fieldName, value);
    
    // Only update errors if we're in submission mode or if there's an error to show
    setErrors(prev => {
      const shouldShowError = isSubmitting || error;
      const newError = shouldShowError ? error : '';
      
      // Only update if the error state would change
      if (prev[fieldName] === newError) {
        return prev;
      }
      
      return {
        ...prev,
        [fieldName]: newError
      };
    });
  };

  const validatePasswordsMatch = React.useCallback((password, confirmPassword) => {
    const match = !password || !confirmPassword || password === confirmPassword;
    
    setPasswordValidation(prev => {
      if (prev.passwordsMatch === match) return prev;
      
      return {
        ...prev,
        passwordsMatch: match
      };
    });
    
    setPasswordsMatch(match);
    return match;
  }, []);

  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;

    // Validate first name
    const firstNameError = validateField('firstName', formData.firstName);
    if (firstNameError) {
      newErrors.firstName = firstNameError;
      isValid = false;
    }

    // Validate last name
    const lastNameError = validateField('lastName', formData.lastName);
    if (lastNameError) {
      newErrors.lastName = lastNameError;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validatePasswordFields = () => {
    // If no password is provided, it's valid (passwords are optional)
    if (!formData.password && !formData.confirmPassword) {
      return true;
    }
    
    // If password is provided but confirm password is empty, it's invalid
    if (formData.password && !formData.confirmPassword) {
      return false;
    }
    
    // If confirm password is provided but password is empty, it's invalid
    if (!formData.password && formData.confirmPassword) {
      return false;
    }
    
    // If both fields are filled, validate the password
    const passwordValidation = validatePassword(formData.password);
    const isPasswordValid = Object.values(passwordValidation).every(Boolean);
    const doPasswordsMatch = formData.password === formData.confirmPassword;
    
    return isPasswordValid && doPasswordsMatch;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setIsTouched({
      firstName: true,
      lastName: true,
      password: true,
      confirmPassword: true
    });
    
    // Validate all fields
    const isNameValid = validateAllFields();
    const isPasswordValid = validatePasswordFields();
    const isValid = isNameValid && isPasswordValid;
    
    // Always prepare the submission data
    const submissionData = { ...formData };
    
    // If password is empty, don't include it in the submission
    if (!submissionData.password) {
      delete submissionData.password;
    }
    delete submissionData.confirmPassword; // Don't send confirmPassword to the server
    
    // Update submission state
    setIsSubmitting(true);
    
    // Always call onSubmit with the validation status and data
    // The parent component can decide how to handle invalid submissions
    onSubmit({
      ...submissionData,
      isValid
    });
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
                // Only update the form data, no validation on change
                setFormData(prev => ({
                  ...prev,
                  firstName: e.target.value
                }));
              }}
              onBlur={handleBlur}
              error={!!((isTouched.firstName || isSubmitting) && errors.firstName)}
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
                // Only update the form data, no validation on change
                setFormData(prev => ({
                  ...prev,
                  lastName: e.target.value
                }));
              }}
              onBlur={handleBlur}
              error={!!((isTouched.lastName || isSubmitting) && errors.lastName)}
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
                    confirmPassword: newPassword ? prev.confirmPassword : ''
                  }));
                  
                  // Clear password error when user starts typing
                  if (errors.password) {
                    setErrors(prev => ({
                      ...prev,
                      password: ''
                    }));
                  }
                }}
                onBlur={() => {
                  setIsTouched(prev => ({
                    ...prev,
                    password: true
                  }));
                  
                  if (isSubmitting) {
                    validatePasswordFields();
                  }
                }}
                showValidation={isSubmitting || isTouched.password}
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
                  
                  // Clear any existing errors when user types
                  if (errors.confirmPassword) {
                    setErrors(prev => ({
                      ...prev,
                      confirmPassword: ''
                    }));
                  }
                }}
                onBlur={() => {
                  setIsTouched(prev => ({
                    ...prev,
                    confirmPassword: true
                  }));
                  
                  if (isSubmitting) {
                    validatePasswordFields();
                  }
                }}
                error={Boolean(
                  (isTouched.confirmPassword || isSubmitting) && 
                  formData.password && 
                  formData.confirmPassword && 
                  formData.password !== formData.confirmPassword
                )}
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
