import React from 'react';
import './EmployeeSelector.scss';

const EmployeeSelector = ({ employees, onSelect, value }) => {
  const handleChange = (e) => {
    const selectedEmployee = employees.find(emp => emp.id === parseInt(e.target.value, 10));
    onSelect(selectedEmployee || null);
  };

  return (
    <div className="employee-selector">
      <h2 className="employee-selector__title">Update Employee Info</h2>
      <p className="employee-selector__instruction">Choose an employee to update their information.</p>
      <select 
        className="employee-selector__select"
        value={value?.id || ''}
        onChange={handleChange}
        aria-label="Select an employee"
      >
        <option value="">--Select--</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {`${employee.firstName} ${employee.lastName}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EmployeeSelector;
