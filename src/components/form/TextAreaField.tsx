import React, { TextareaHTMLAttributes } from 'react';

interface TextAreaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label: string;
  error?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  error,
  id,
  rows = 3,
  ...props
}) => {
  return (
    <div>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <textarea
          id={id}
          rows={rows}
          className={`input-field ${
            error ? 'border-red-500 dark:border-red-500' : ''
          }`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default TextAreaField; 