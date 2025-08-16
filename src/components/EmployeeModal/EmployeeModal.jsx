import React, { useEffect, useRef } from 'react';
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
    handleChange,
    handleBlur,
    handleSubmit: handleFormSubmit,
    setValues,
    setErrors,
    setIsSubmitting
  } = useFormValidation(initialState, (values) => validateForm(values, !!values.password));

  // Get password requirements status
  const passwordRequirements = getPasswordRequirements(values.password);

  // Handle form submission
  const handleSave = async (formValues) => {
    try {
      await onSubmit({
        ...formValues,
        id: employee?.id
      });
      onClose();
    } catch (error) {
      console.error('Error saving employee:', error);
      // Handle error state if needed
    } finally {
      setIsSubmitting(false);
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

  console.log('Modal rendering with employee:', employee);

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
          <div className="divider"></div>
          <form onSubmit={handleFormSubmit(handleSave)}>
            <FormSection title="Employee Info">
              <FormField
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.firstName}
                touched={touched.firstName}
                required
              />
              
              <FormField
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.lastName}
                touched={touched.lastName}
                required
              />
            </FormSection>
            
            <FormSection title="Update Password (Optional)" className="password-section">
              <FormField
                label="New Password"
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
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                autoComplete="new-password"
              />
              
              <PasswordRequirements requirements={passwordRequirements} />
            </FormSection>
            
            <FormActions 
              onCancel={onClose}
              onSubmit={handleFormSubmit(handleSave)}
              isSubmitting={isSubmitting}
              submitText="Save Employee Info"
            />
          </form>
        </ModalContent>
      </div>
    </div>
  );
};

export default EmployeeModal;
