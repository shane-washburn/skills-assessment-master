import React, { useEffect, useRef, useState } from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import { validateForm, getPasswordRequirements } from '../../utils/validation';
import ModalHeader from '../ModalHeader/ModalHeader.jsx';
import ModalContent from '../ModalContent/ModalContent.jsx';
import FormSection from '../FormSection/FormSection.jsx';
import FormField from '../FormField/FormField.jsx';
import PasswordRequirements from '../PasswordRequirements/PasswordRequirements.jsx';
import FormActions from '../FormActions/FormActions.jsx';
import { Icon } from '../../icon';
import '../EmployeeModal/EmployeeModal.scss';

const EmployeeModal = ({ isOpen, onClose, employee, onSubmit }) => {
  const [submitError, setSubmitError] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const modalRef = useRef(null);
  
  // Initialize form with employee data or empty values
  const initialState = {
    firstName: employee?.firstName || '',
    lastName: employee?.lastName || '',
    password: '',
    confirmPassword: ''
  };

  // Initialize form validation
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange: originalHandleChange,
    handleBlur,
    handleSubmit: handleFormSubmit,
    setValues,
    setErrors,
    setIsSubmitting
  } = useFormValidation(initialState, (values) => validateForm(values, !!values.password));

  // Handle changes for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // First update the form values using the original handler
    originalHandleChange(e);
    
    // If it's a password field and we've submitted at least once, validate on change
    if ((name === 'password' || name === 'confirmPassword') && hasSubmitted) {
      // Create updated values object with the new value
      const updatedValues = {
        ...values,
        [name]: value
      };
      
      // Validate the updated values
      const validationErrors = validateForm(updatedValues, true);
      
      // Only update errors for password fields
      setErrors(prev => ({
        ...prev,
        password: validationErrors.password,
        confirmPassword: validationErrors.confirmPassword
      }));
    }
  };

  // Get password requirements status
  const passwordRequirements = getPasswordRequirements(values.password);

  // Handle form submission
  const handleSave = async (formValues) => {
    setHasSubmitted(true);
    if (!formValues.__isValid) {
      // Show error for invalid form
      alert('Employee information errored successfully!')
      return;
    }
    
    try {
      const { __isValid, ...cleanValues } = formValues;
      await onSubmit({
        ...cleanValues,
        id: employee?.id
      });
      alert('Employee information saved successfully!');
    } catch (error) {
      alert(error.message || 'Failed to save employee information. Please try again.');
    }
  };

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus the first focusable element when modal opens
      if (modalRef.current) {
        const focusable = modalRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable) focusable.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Update form when employee prop changes
  useEffect(() => {
    if (employee) {
      setValues({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
    }
  }, [employee, setValues, setErrors]);

  // Removed click-outside handler to prevent closing when clicking outside the modal

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      role="dialog" 
      aria-modal="true"
    >
      <div className="modal" ref={modalRef}>
        <ModalHeader 
          title="Update Employee" 
          onClose={onClose} 
        />
        
        <ModalContent>
          <div className="employee-subtitle">
            <svg width="18" height="15" viewBox="0 0 18 15">
              <use xlinkHref="/assets/sprite.svg#people-18x15" fill="#527A00" />
            </svg>
            <span>{employee?.firstName} {employee?.lastName}</span>
          </div>
          <form onSubmit={handleFormSubmit(handleSave)}>
            <div className="form-content">
              <FormSection title="Employee Info">
                <div className="name-fields">
                  <FormField
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.firstName}
                    touched={touched.firstName}
                  />
                  
                  <FormField
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.lastName}
                    touched={touched.lastName}
                  />
                </div>
              </FormSection>
              
              <FormSection title="Update Password" className="password-section">
                <div className="password-layout">
                  <div className="password-fields">
                    <FormField
                      label="Password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.password}
                      touched={touched.password}
                      autoComplete="new-password"
                    />
                    
                    <FormField
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                      autoComplete="new-password"
                    />
                  </div>
                  
                  <PasswordRequirements requirements={[
                    { text: '8 characters or more', isValid: values.password && values.password.length >= 8 },
                    { text: 'At least 1 number', isValid: /\d/.test(values.password) },
                    { text: 'At least 1 uppercase letter', isValid: /[A-Z]/.test(values.password) },
                    { text: 'At least 1 lowercase letter', isValid: /[a-z]/.test(values.password) },
                    { 
                      text: 'Passwords match', 
                      isValid: values.password && values.password === values.confirmPassword 
                    }
                  ]} />
                </div>
              </FormSection>
            </div>
            
            <div className="form-actions-wrapper">
              <FormActions 
                onCancel={() => {
                  setSubmitError('');
                  onClose();
                }}
                onSubmit={handleFormSubmit(handleSave)}
                isSubmitting={isSubmitting}
                submitText="Save Employee Info"
              />
            </div>
          </form>
        </ModalContent>
      </div>
    </div>
  );
};

export default EmployeeModal;
