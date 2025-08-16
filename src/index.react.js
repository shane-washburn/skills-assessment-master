import { useState, Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { Modal } from './components/common';
import { EmployeeForm } from './components/employees';
import employees from './assets/employees';
import './index.scss';

function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleSelectEmployee = (e) => {
    const employeeId = parseInt(e.target.value, 10);
    const employee = employees.find(emp => emp.id === employeeId);
    setSelectedEmployee(employee || null);
    setFormData(employee ? { ...employee } : null);
  };

  const handleOpenModal = () => {
    if (selectedEmployee) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data) => {
    if (data.isValid) {
      try {
        // In a real app, you would make an API call here
        // const response = await fetch('/api/employees/update', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // });
        // if (!response.ok) throw new Error('Failed to update employee');
        
        alert('Employee information updated successfully!');
        setIsModalOpen(false);
      } catch (error) {
        alert(`Error: ${error.message || 'Failed to update employee information. Please try again.'}`);
      }
    } else {
      alert('Please fix the validation errors before submitting.');
    }
  };

  return (
    <Fragment>
      <div className="Page__bounds Page__bounds--thin">
        <div className="UpdateEmployee">
          <h2 className="Header">Update Employee Info</h2>
          <p className="UpdateEmployee__instruct">Choose an employee to update their information.</p>
          <select 
            className="UpdateEmployee__select" 
            value={selectedEmployee?.id || ''}
            onChange={handleSelectEmployee}
          >
            <option value="">--Select--</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {`${employee.firstName} ${employee.lastName}`}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="Page__footer">
        <div className="Page__bounds Page__bounds--thin">
          <button 
            onClick={handleOpenModal}
            disabled={!selectedEmployee}
          >
            Update Employee
          </button>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title="Update Employee"
        userName={selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}` : ''}
      >
        {formData && (
          <EmployeeForm 
            employee={formData}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>
    </Fragment>
  );
}

const root = createRoot(document.getElementById('app-root'));
root.render(<App />);
