import React from 'react';
import { Icon } from '../../icon';
import '../PasswordRequirements/PasswordRequirements.scss';

const PasswordRequirements = ({ requirements }) => {
  return (
    <div className="password-requirements">
      <p className="password-requirements__title">Password must contain:</p>
      <ul className="password-requirements__list">
        {requirements.map((requirement, index) => (
          <li 
            key={index} 
            className={`password-requirements__item ${requirement.isValid ? 'password-requirements__item--valid' : ''}`}
          >
            <Icon name={requirement.isValid ? 'circle-check-16x16' : 'circle-16x16'} />
            <span>{requirement.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordRequirements;
