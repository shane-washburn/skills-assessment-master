import React from 'react';
import '../FormActions/FormActions.scss';

const FormActions = ({ onCancel, onSubmit, isSubmitting = false, submitText = 'Save' }) => {
  return (
    <div className="form-actions">
      <button
        type="button"
        className="form-actions__button form-actions__button--cancel"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </button>
      <button
        type="button"
        className="form-actions__button form-actions__button--submit"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : submitText}
      </button>
    </div>
  );
};

export default FormActions;
