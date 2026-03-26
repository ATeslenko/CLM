import React from 'react';
import { RefreshCw, TrendingUp, CheckCircle, Calendar } from 'lucide-react';

const RoutineCard = ({ icon: Icon, title, description, schedule, color, isSet = true, onClick }) => {
  const colorMap = {
    blue: { bg: '#E5F1FB', icon: '#2167C6' },
    pink: { bg: '#FDE8F4', icon: '#E83FC7' },
    cyan: { bg: '#D9F5F5', icon: '#19C2B9' },
    purple: { bg: '#F3F1FB', icon: '#6453CF' }
  };

  const colors = colorMap[color] || colorMap.blue;

  return (
    <div 
      onClick={onClick}
      style={{
        background: 'var(--color-basic-white)',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 0 1px rgba(47,47,47,0.04), 0 1px 4px rgba(47,47,47,0.12)',
        border: '1px solid #e5e5e5',
        cursor: 'pointer',
        transition: 'all 150ms ease',
        flex: '1 1 0',
        minWidth: '250px',
        maxWidth: '320px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 2px rgba(47,47,47,0.04), 0 2px 8px rgba(47,47,47,0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 1px rgba(47,47,47,0.04), 0 1px 4px rgba(47,47,47,0.12)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div 
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          background: colors.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px'
        }}
      >
        <Icon size={20} style={{ color: colors.icon }} />
      </div>

      <div 
        style={{
          fontSize: '14px',
          lineHeight: '17px',
          fontWeight: '600',
          color: 'var(--color-secondary-dark)',
          fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          marginBottom: '6px'
        }}
      >
        {title}
      </div>

      <div 
        style={{
          fontSize: '13px',
          lineHeight: '16px',
          fontWeight: '400',
          color: 'var(--color-secondary-lighter)',
          fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          marginBottom: '8px'
        }}
      >
        {description}
      </div>

      {isSet ? (
        <div 
          style={{
            fontSize: '12px',
            lineHeight: '15px',
            fontWeight: '400',
            color: 'var(--color-secondary-lighter)',
            fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontStyle: 'italic'
          }}
        >
          {schedule}
        </div>
      ) : (
        <div 
          style={{
            fontSize: '12px',
            lineHeight: '15px',
            fontWeight: '600',
            color: 'var(--color-secondary-main)',
            fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}
        >
          Not set
        </div>
      )}
    </div>
  );
};

const RoutinesSection = () => {
  const routines = [
    {
      icon: RefreshCw,
      title: 'Approaching renewals',
      description: 'Close deals faster with recipient insights and quick actions',
      schedule: 'Daily at 9am',
      color: 'blue',
      isSet: true
    },
    {
      icon: TrendingUp,
      title: 'Upcoming expirations',
      description: 'Understand team performance and revenue opportunities at a glance',
      schedule: 'Weekly on Monday',
      color: 'pink',
      isSet: true
    },
    {
      icon: CheckCircle,
      title: 'Templates insights',
      description: 'Unblock deals with a prioritised approval summary',
      schedule: null,
      color: 'cyan',
      isSet: false
    },
    {
      icon: Calendar,
      title: 'Weekly pipeline review',
      description: 'Get a comprehensive overview of your active pipeline and next steps',
      schedule: 'Weekly on Friday',
      color: 'purple',
      isSet: true
    }
  ];

  return (
    <div style={{ marginTop: '32px' }}>
      <h2 
        style={{
          fontSize: '18px',
          lineHeight: '24px',
          fontWeight: '600',
          color: 'var(--color-secondary-dark)',
          fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          marginBottom: '16px'
        }}
      >
        Your routines
      </h2>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '16px'
        }}
      >
        {routines.map((routine, index) => (
          <RoutineCard
            key={index}
            icon={routine.icon}
            title={routine.title}
            description={routine.description}
            schedule={routine.schedule}
            color={routine.color}
            isSet={routine.isSet}
            onClick={() => console.log(`Clicked: ${routine.title}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default RoutinesSection;
