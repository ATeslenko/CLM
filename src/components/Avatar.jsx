import React from 'react';

const Avatar = ({ text = 'A', src = null, alt = 'Avatar', size = 'sm' }) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  if (src) {
    return (
      <img 
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover border border-gray-200`}
      />
    );
  }

  return (
    <div 
      className={`${sizeClasses[size]} bg-gray-200 rounded-full flex items-center justify-center font-graphik-semibold text-gray-700`}
    >
      {text}
    </div>
  );
};

export default Avatar;
