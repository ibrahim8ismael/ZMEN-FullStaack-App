import React, { forwardRef } from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const baseStyles = 'block px-4 py-3 border focus:outline-none focus:border-black transition duration-200';
    const errorStyles = error ? 'border-red-500' : 'border-gray-300';
    const widthStyles = fullWidth ? 'w-full' : '';
    const combinedStyles = `${baseStyles} ${errorStyles} ${widthStyles} ${className}`;
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input ref={ref} className={combinedStyles} {...props} />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

export default TextField;