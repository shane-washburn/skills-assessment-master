// Password validation rules
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    minLength: password.length >= minLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
    isValid: password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar
  };
};

// Form validation
export const validateForm = (values, isPasswordRequired = false) => {
  const errors = {};
  
  // Required fields
  if (!values.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }
  
  if (!values.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }
  
  // Only validate password if it's being changed (either field has value)
  if (values.password || values.confirmPassword) {
    // Check if passwords match
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    // Only require password to be at least 8 characters for updates
    if (!values.password || values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
  }
  
  return errors;
};

// Get password requirements status
export const getPasswordRequirements = (password) => {
  const validation = validatePassword(password || '');
  
  return [
    { text: 'At least 8 characters', isValid: validation.minLength },
    { text: 'At least 1 uppercase letter', isValid: validation.hasUppercase },
    { text: 'At least 1 lowercase letter', isValid: validation.hasLowercase },
    { text: 'At least 1 number', isValid: validation.hasNumber },
    { text: 'At least 1 special character', isValid: validation.hasSpecialChar }
  ];
};
