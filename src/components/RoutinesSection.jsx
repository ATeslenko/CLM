import React, { useState } from 'react';
import { RefreshCw, TrendingUp, CheckCircle, Calendar } from 'lucide-react';
import RoutineSettingsModal from './RoutineSettingsModal';

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
        boxShadow: isSet ? '0 0 2px rgba(47,47,47,0.04), 0 2px 6px rgba(47,47,47,0.14)' : '0 0 1px rgba(47,47,47,0.04), 0 1px 4px rgba(47,47,47,0.12)',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 150ms ease',
        flex: '1 1 0',
        minWidth: '250px',
        maxWidth: '320px',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = isSet ? '0 0 3px rgba(47,47,47,0.04), 0 3px 10px rgba(47,47,47,0.16)' : '0 0 2px rgba(47,47,47,0.04), 0 2px 8px rgba(47,47,47,0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = isSet ? '0 0 2px rgba(47,47,47,0.04), 0 2px 6px rgba(47,47,47,0.14)' : '0 0 1px rgba(47,47,47,0.04), 0 1px 4px rgba(47,47,47,0.12)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div 
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: colors.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon size={20} style={{ color: colors.icon }} />
        </div>

        {isSet && (
          <div
            style={{
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              background: colors.bg,
              color: colors.icon,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            Active
          </div>
        )}
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
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const routines = [
    {
      icon: RefreshCw,
      title: 'Approaching renewals',
      description: 'Close deals faster with recipient insights and quick actions',
      schedule: 'Daily at 9am',
      color: 'blue',
      iconBg: '#E5F1FB',
      iconColor: '#2167C6',
      isSet: true,
      frequency: 'daily',
      time: '09:00',
      dayOfWeek: 'monday'
    },
    {
      icon: TrendingUp,
      title: 'Upcoming expirations',
      description: 'Understand team performance and revenue opportunities at a glance',
      schedule: 'Weekly on Monday',
      color: 'pink',
      iconBg: '#FDE8F4',
      iconColor: '#E83FC7',
      isSet: true,
      frequency: 'weekly',
      time: '09:00',
      dayOfWeek: 'monday'
    },
    {
      icon: CheckCircle,
      title: 'Templates insights',
      description: 'Unblock deals with a prioritised approval summary',
      schedule: null,
      color: 'cyan',
      iconBg: '#D9F5F5',
      iconColor: '#19C2B9',
      isSet: false,
      frequency: 'weekly',
      time: '09:00',
      dayOfWeek: 'monday'
    },
    {
      icon: Calendar,
      title: 'Weekly pipeline review',
      description: 'Get a comprehensive overview of your active pipeline and next steps',
      schedule: 'Weekly on Friday',
      color: 'purple',
      iconBg: '#F3F1FB',
      iconColor: '#6453CF',
      isSet: true,
      frequency: 'weekly',
      time: '09:00',
      dayOfWeek: 'friday'
    }
  ];

  const handleRoutineClick = (routine) => {
    setSelectedRoutine(routine);
    setIsModalOpen(true);
  };

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
            onClick={() => handleRoutineClick(routine)}
          />
        ))}
      </div>

      <RoutineSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        routine={selectedRoutine}
      />
    </div>
  );
};

export default RoutinesSection;
