import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const Snackbar = ({ message, isVisible, onClose, duration = 4000, type = 'success' }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'var(--color-primary-main)',
          icon: 'var(--color-basic-white)',
          text: 'var(--color-basic-white)'
        };
      case 'error':
        return {
          bg: 'var(--color-danger-main)',
          icon: 'var(--color-basic-white)',
          text: 'var(--color-basic-white)'
        };
      case 'warning':
        return {
          bg: 'var(--color-warning-main)',
          icon: 'var(--color-secondary-dark)',
          text: 'var(--color-secondary-dark)'
        };
      default:
        return {
          bg: 'var(--color-primary-main)',
          icon: 'var(--color-basic-white)',
          text: 'var(--color-basic-white)'
        };
    }
  };

  const colors = getColors();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        animation: 'slideUp 300ms ease-out'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: colors.bg,
          borderRadius: '8px',
          padding: '16px 20px',
          boxShadow: 'var(--elevation-down-m)',
          minWidth: '400px',
          maxWidth: '600px'
        }}
      >
        <CheckCircle 
          size={20} 
          style={{ 
            color: colors.icon,
            flexShrink: 0
          }} 
        />
        
        <div 
          className="text-14 font-graphik-semibold"
          style={{
            color: colors.text,
            flex: 1
          }}
        >
          {message}
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.icon,
            opacity: 0.8,
            transition: 'opacity 150ms ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.8'}
        >
          <X size={18} />
        </button>
      </div>
      
      <style>
        {`
          @keyframes slideUp {
            from {
              transform: translateX(-50%) translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Snackbar;
