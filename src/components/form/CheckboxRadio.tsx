import React, { InputHTMLAttributes, ReactNode } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

interface CheckboxRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: ReactNode;
  id: string;
  type: 'checkbox' | 'radio';
  error?: string;
}

const CheckboxRadio: React.FC<CheckboxRadioProps> = ({
  label,
  id,
  type,
  error,
  ...props
}) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <div className="relative">
          <input
            id={id}
            type={type}
            className="opacity-0 absolute h-5 w-5 cursor-pointer"
            {...props}
          />
          <div className={`
            border-2 rounded flex items-center justify-center
            w-5 h-5 transition-colors
            ${props.checked 
              ? 'bg-primary border-primary' 
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
            }
            ${error ? 'border-red-500 dark:border-red-500' : ''}
            ${type === 'radio' ? 'rounded-full' : 'rounded'}
          `}>
            {type === 'checkbox' && props.checked && (
              <CheckIcon className="h-3 w-3 text-white" />
            )}
            {type === 'radio' && props.checked && (
              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            )}
          </div>
        </div>
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="text-gray-700 dark:text-gray-300 cursor-pointer">
          {label}
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
};

export default CheckboxRadio; 