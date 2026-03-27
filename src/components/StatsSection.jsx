import React from 'react';
import { DollarSign, RefreshCw, Clock, FileText, CreditCard } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, sublabel, isHighlighted = false, onClick }) => {
  return (
    <div 
      className={`stat-card ${isHighlighted ? 'stat-card-highlighted' : ''}`}
      onClick={onClick}
      style={{
        background: 'var(--color-basic-white)',
        borderRadius: '8px',
        padding: '16px 20px',
        boxShadow: '0 0 1px rgba(47,47,47,0.04), 0 1px 4px rgba(47,47,47,0.12)',
        border: isHighlighted ? '2px solid var(--color-primary-main)' : '1px solid #e5e5e5',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        minWidth: '160px',
        flex: '1 1 0',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 150ms ease'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = '0 0 2px rgba(47,47,47,0.04), 0 2px 8px rgba(47,47,47,0.12)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = '0 0 1px rgba(47,47,47,0.04), 0 1px 4px rgba(47,47,47,0.12)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div 
          style={{
            fontSize: '24px',
            lineHeight: '29px',
            fontWeight: '600',
            color: 'var(--color-secondary-dark)',
            fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}
        >
          {value}
        </div>
        {Icon && (
          <div 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              background: isHighlighted ? 'var(--color-primary-lighter)' : 'var(--color-tertiary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon size={16} style={{ color: isHighlighted ? 'var(--color-primary-main)' : 'var(--color-secondary-lighter)' }} />
          </div>
        )}
      </div>
      <div 
        style={{
          fontSize: '13px',
          lineHeight: '16px',
          fontWeight: '400',
          color: 'var(--color-secondary-main)',
          fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
      >
        {label}
      </div>
      {sublabel && (
        <div 
          style={{
            fontSize: '12px',
            lineHeight: '15px',
            fontWeight: '400',
            color: 'var(--color-secondary-lighter)',
            fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}
        >
          {sublabel}
        </div>
      )}
    </div>
  );
};

const StatsSection = ({ onStatClick }) => {
  const stats = [
    { icon: DollarSign, value: '$91,692.94', label: 'Active pipeline', sublabel: 'Total: 16', isHighlighted: true, filterType: null },
    { icon: RefreshCw, value: '8', label: 'Documents to renew', sublabel: 'This month', filterType: 'renewals' },
    { icon: Clock, value: '3', label: 'Docs to expire', sublabel: 'Next 30 days', filterType: 'expirations' },
    { icon: FileText, value: '5', label: 'Awaiting signature', sublabel: 'Pending', filterType: 'signature' },
    { icon: CreditCard, value: '$3,115.75', label: 'Pending payments', sublabel: 'Overdue: 2', filterType: 'payment' }
  ];

  return (
    <div 
      style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '32px',
        flexWrap: 'nowrap'
      }}
    >
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          sublabel={stat.sublabel}
          isHighlighted={stat.isHighlighted}
          onClick={stat.filterType ? () => onStatClick(stat.filterType) : undefined}
        />
      ))}
    </div>
  );
};

export default StatsSection;
