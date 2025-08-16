import { useState } from 'react';

const useFormValidation = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    
    // Only validate if the form has been submitted or the field has been touched
    if (isSubmitting || touched[name]) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  };

  const handleSubmit = (callback) => async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    
    const isValid = Object.keys(validationErrors).length === 0;
    if (isValid) {
      try {
        setIsSubmitting(true);
        await callback({ ...values, __isValid: true });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Call with validation status but don't prevent further actions
      await callback({ ...values, __isValid: false });
    }
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setErrors,
    setIsSubmitting
  };
};

export default useFormValidation;
