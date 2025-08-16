import { Fragment, useState } from 'react';
import { createRoot } from 'react-dom/client';
import EmployeeModal from './components/EmployeeModal';

import './index.scss';
import employees from './assets/employees';

function App() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmployeeSelect = (e) => {
    setSelectedEmployeeId(e.target.value);
  };

  const handleOpenModal = () => {
    console.log('Open modal button clicked');
    console.log('Selected employee ID:', selectedEmployeeId);
    if (selectedEmployeeId) {
      console.log('Setting modal open to true');
      setIsModalOpen(true);
    } else {
      console.log('No employee selected');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveEmployee = async (formData) => {
    // In a real app, you would make an API call here
    console.log('Saving employee data:', formData);
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Employee data saved successfully');
        resolve();
      }, 1000);
    });
  };

  const selectedEmployee = employees.find(emp => emp.id === Number(selectedEmployeeId));

  return (
    <Fragment>
      <div className="Page__bounds Page__bounds--thin">
        <div className="UpdateEmployee">
          <h2 className="Header">Update Employee Info</h2>
          <p className="UpdateEmployee__instruct">Choose an employee to update their information.</p>
          <select 
            id="js-employee-name-select" 
            className="UpdateEmployee__select"
            value={selectedEmployeeId}
            onChange={handleEmployeeSelect}
          >
            <option value="">&ndash;Select&ndash;</option>
            {employees.map((employee) => (
              <option
                key={employee.id}
                value={employee.id}
              >
                {`${employee.firstName} ${employee.lastName}`}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="Page__footer">
        <div className="Page__bounds Page__bounds--thin">
          <button 
            id="update-employee-btn"
            onClick={handleOpenModal}
            disabled={!selectedEmployeeId}
          >
            Update Employee
          </button>
        </div>
      </div>

      {isModalOpen && selectedEmployee && (
        <EmployeeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          employee={selectedEmployee}
          onSubmit={handleSaveEmployee}
        />
      )}
    </Fragment>
  )
}

const root = createRoot(document.getElementById('app-root'))
root.render(<App/>);
