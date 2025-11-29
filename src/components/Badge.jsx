import React from 'react';

const Badge = ({ 
  number, 
  size = 'sm', 
  color = 'danger', 
  className = '' 
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4 text-xs',
    sm: 'w-5 h-5 text-xs',
    md: 'w-6 h-6 text-sm',
    lg: 'w-7 h-7 text-base'
  };

  const colorClasses = {
    danger: 'bg-[#E44E48] text-white',
    gray: 'bg-brand-primary text-white',
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white'
  };

  if (!number && number !== 0) return null;

  return (
    <span 
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full flex items-center justify-center font-graphik-semibold ${className}`}
    >
      {number}
    </span>
  );
};

export default Badge;
