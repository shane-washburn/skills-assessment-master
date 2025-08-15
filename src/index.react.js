import {Fragment} from 'react';
import { createRoot } from 'react-dom/client';
// import {Icon} from './icon';

import './index.scss';
import employees from './assets/employees';

function App() {
	return (
		<Fragment>
			<div className="Page__bounds Page__bounds--thin">
				<div className="UpdateEmployee">
					<h2 className="Header">Update Employee Info</h2>
					<p className="UpdateEmployee__instruct">Choose an employee to update their information.</p>
					<select id="js-employee-name-select" className="UpdateEmployee__select">
						<option>&ndash;Select&ndash;</option>
						{employees.map((employee) => (
							<option
								key={employee.id}
								value={employee.id}>{`${employee.firstName} ${employee.lastName}`}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="Page__footer">
				<div className="Page__bounds Page__bounds--thin">
					<button>Update Employee</button>
				</div>
			</div>
		</Fragment>
	)
}

const root = createRoot(document.getElementById('app-root'))
root.render(<App/>);
