import React from 'react';
import './PasswordRequirements.scss';

const CircleIcon = ({ isValid }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    className="password-requirements__icon"
    style={{
      flexShrink: 0,
    }}
  >
    <circle 
      cx="8" 
      cy="8" 
      r="7" 
      fill="none" 
      stroke={isValid ? '#0E840D' : '#ADADAD'}
      strokeWidth="1.5"
    />
    {isValid && (
      <path 
        fill="none"
        stroke="#0E840D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 8.5l2.5 2.5 5.5-5.5"
      />
    )}
  </svg>
);

const requirements = [
  { key: 'minLength', text: '8 or more characters' },
  { key: 'hasNumber', text: 'At least 1 number' },
  { key: 'hasUpperCase', text: 'An uppercase character' },
  { key: 'hasLowerCase', text: 'A lowercase character' },
  { key: 'passwordsMatch', text: 'Passwords match' },
];

const PasswordRequirements = ({ validation }) => {
  return (
    <div className="password-requirements">
      <ul className="password-requirements__list">
        {requirements.map((req) => {
          const isValid = validation[req.key];
          return (
            <li 
              key={req.key} 
              className={`password-requirements__item ${
                isValid ? 'password-requirements__item--valid' : ''
              }`}
            >
              <CircleIcon isValid={isValid} />
              <span className="password-requirements__text">
                {req.text}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordRequirements;
