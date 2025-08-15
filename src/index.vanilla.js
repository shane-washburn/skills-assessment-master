import './index.scss';
// import {vanillaIcon} from './icon';

import employees from './assets/employees';

const employeeNameSelect = document.getElementById('js-employee-name-select');
const fragment = document.createDocumentFragment();
employees.forEach((user) => {
	fragment.appendChild(new Option(`${ user.firstName } ${ user.lastName }`, user.id))
});

employeeNameSelect.appendChild(fragment);
