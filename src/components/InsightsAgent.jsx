import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const InsightsAgent = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Query:', query);
      setQuery('');
    }
  };

  const quickActions = [
    'Renewals above $100k',
    'Template conversion rates',
    'Unsigned by contact',
    'Pipeline at risk',
    'Overdue payments'
  ];

  const handleQuickAction = (action) => {
    console.log('Quick action:', action);
  };

  return (
    <div
      style={{
        background: 'var(--color-basic-white)',
        borderRadius: '12px',
        border: '1px solid var(--color-tertiary-dark)',
        boxShadow: 'var(--elevation-down-s)',
        padding: '24px',
        marginBottom: '32px'
      }}
    >
      {/* Header with Icon and Title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        {/* Icon */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            background: '#ECEBF9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <div
            style={{
              animation: 'sparkle-pulse 3s ease-in-out infinite'
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.22222 9.22222L12 2L14.7778 9.22222L22 12L14.7778 14.7778L12 22L9.22222 14.7778L2 12L9.22222 9.22222Z" fill="#6453CF"/>
            </svg>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontSize: '20px',
              lineHeight: '26px',
              fontWeight: '700',
              color: 'var(--color-secondary-dark)',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '6px'
            }}
          >
            Insights agent
          </h2>
          <p
            className="text-14 font-graphik-regular"
            style={{
              color: 'var(--color-secondary-main)',
              lineHeight: '20px'
            }}
          >
            Ask anything about your pipeline, contracts, or templates — get answers instantly.
          </p>
        </div>
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#fafafa',
            border: '1px solid var(--color-tertiary-darker)',
            borderRadius: '8px',
            padding: '12px 16px',
            transition: 'all 150ms ease'
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about your documents or pipeline..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              fontWeight: '400',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--color-secondary-dark)',
              padding: 0
            }}
          />
          <button
            type="submit"
            disabled={!query.trim()}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              background: query.trim() ? 'var(--color-primary-main)' : 'var(--color-tertiary-dark)',
              border: 'none',
              cursor: query.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 150ms ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              if (query.trim()) {
                e.target.style.background = 'var(--color-primary-dark)';
              }
            }}
            onMouseLeave={(e) => {
              if (query.trim()) {
                e.target.style.background = 'var(--color-primary-main)';
              }
            }}
          >
            <ArrowRight size={18} color="white" />
          </button>
        </div>
      </form>

      {/* Quick Action Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleQuickAction(action)}
            style={{
              padding: '8px 14px',
              background: '#fafafa',
              border: '1px solid var(--color-tertiary-darker)',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '500',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--color-secondary-dark)',
              cursor: 'pointer',
              transition: 'all 150ms ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--color-tertiary-light)';
              e.target.style.borderColor = 'var(--color-secondary-lighter)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#fafafa';
              e.target.style.borderColor = 'var(--color-tertiary-darker)';
            }}
          >
            <ArrowRight size={14} style={{ opacity: 0.6 }} />
            {action}
          </button>
        ))}
      </div>

      <style>
        {`
          @keyframes sparkle-pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.8;
            }
          }
        `}
      </style>
    </div>
  );
};

export default InsightsAgent;
