import React from 'react';
import './PasswordRequirements.scss';

const requirements = [
  { key: 'minLength', text: 'At least 8 characters' },
  { key: 'hasNumber', text: 'Contains a number' },
  { key: 'hasSpecialChar', text: 'Contains a special character' },
  { key: 'hasUpperCase', text: 'Contains an uppercase letter' },
];

const PasswordRequirements = ({ validation }) => {
  return (
    <div className="password-requirements">
      <ul className="password-requirements__list">
        {requirements.map((req) => (
          <li 
            key={req.key} 
            className={`password-requirements__item ${
              validation[req.key] ? 'password-requirements__item--valid' : ''
            }`}
          >
            <span 
              className={`password-requirements__icon ${
                validation[req.key] ? 'password-requirements__icon--valid' : ''
              }`}
            />
            {req.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordRequirements;
