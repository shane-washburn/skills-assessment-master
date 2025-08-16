import React from 'react';
import '../FormActions/FormActions.scss';

const FormActions = ({ onCancel, onSubmit, isSubmitting = false, submitText = 'Save' }) => {
  return (
    <div className="form-actions">
      <button
        type="submit"
        className="form-actions__button form-actions__button--submit"
        onClick={onSubmit}
      >
        {isSubmitting ? 'Saving...' : submitText}
      </button>
      <button
        type="button"
        className="form-actions__button form-actions__button--cancel"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default FormActions;
