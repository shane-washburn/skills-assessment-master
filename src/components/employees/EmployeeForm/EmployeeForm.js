import React, { useState, useEffect } from 'react';
import InputField from '../../common/InputField/InputField';
import PasswordField from './PasswordField';
import Button from '../../common/Button/Button';
import './EmployeeForm.scss';

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: employee?.firstName || '',
    lastName: employee?.lastName || '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isPasswordValid, setIsPasswordValid] = useState(true);
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
      return `${name === 'firstName' ? 'First name' : 'Last name'} is required`;
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
    setIsTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Only validate on blur if we've already tried to submit
    if (isSubmitting) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate all fields
    const newErrors = {
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName)
    };

    setErrors(newErrors);

    // Check if form is valid
    const isFormValid = !Object.values(newErrors).some(error => error) && 
                       (formData.password === '' || isPasswordValid);

    if (isFormValid) {
      // If password is empty, don't include it in the submission
      const submissionData = { ...formData };
      if (!submissionData.password) {
        delete submissionData.password;
      }
      onSubmit(submissionData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="employee-form__row">
        <InputField
          id="firstName"
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isSubmitting || isTouched.firstName ? errors.firstName : ''}
          className="employee-form__input"
          autoComplete="given-name"
        />
        <InputField
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isSubmitting || isTouched.lastName ? errors.lastName : ''}
          className="employee-form__input"
          autoComplete="family-name"
        />
      </div>
      
      <PasswordField
        value={formData.password}
        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
        showValidation={isSubmitting}
        onValidationChange={setIsPasswordValid}
      />
      
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
