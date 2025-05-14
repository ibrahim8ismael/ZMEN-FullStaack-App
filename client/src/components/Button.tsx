import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex justify-center items-center px-6 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none';
  
  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-100 text-black hover:bg-gray-200',
    outline: 'border border-black text-black hover:bg-gray-100'
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${widthStyles} ${disabledStyles} ${className}`;
  
  return (
    <button 
      className={combinedStyles}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;