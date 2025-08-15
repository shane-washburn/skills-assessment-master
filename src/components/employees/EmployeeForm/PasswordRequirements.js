import React from 'react';
import './PasswordRequirements.scss';

const requirements = [
  { key: 'minLength', text: '8 or more characters' },
  { key: 'hasNumber', text: 'At least 1 number' },
  { key: 'hasUpperCase', text: 'Uppercase' },
  { key: 'hasLowerCase', text: 'Lowercase' },
  { key: 'passwordsMatch', text: 'Passwords match' },
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
