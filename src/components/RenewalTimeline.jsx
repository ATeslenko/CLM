import React from 'react';

const TimelineItem = ({ company, daysFromNow, position, color, date }) => {
  return (
    <div 
      style={{
        position: 'absolute',
        left: `${position}%`,
        top: '-6px',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px'
      }}
    >
      {/* Dot */}
      <div 
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: color,
          border: '2px solid var(--color-basic-white)',
          boxShadow: 'var(--elevation-down-s)',
          zIndex: 2
        }}
      />
      
      {/* Company Name */}
      <div 
        className="text-13 font-graphik-semibold"
        onClick={(e) => {
          e.stopPropagation();
          console.log('Clicked company:', company);
        }}
        style={{
          color: color,
          whiteSpace: 'nowrap',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'opacity 150ms ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = '0.7';
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = '1';
        }}
      >
        {company}
      </div>
      
      {/* Days/Date Label */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
        <div 
          className="text-13 font-graphik-regular"
          style={{
            color: 'var(--color-secondary-lighter)',
            whiteSpace: 'nowrap',
            textAlign: 'center'
          }}
        >
          {daysFromNow}
        </div>
        {date && (
          <div 
            className="text-13 font-graphik-regular"
            style={{
              color: 'var(--color-secondary-lighter)',
              whiteSpace: 'nowrap',
              textAlign: 'center'
            }}
          >
            {date}
          </div>
        )}
      </div>
    </div>
  );
};

const RenewalTimeline = () => {
  const timelineItems = [
    {
      company: 'Tech Solutions',
      daysFromNow: 'Today',
      date: 'March 27',
      position: 0,
      color: 'var(--color-danger-main)'
    },
    {
      company: 'OrionNova Agency',
      daysFromNow: '+1 week',
      date: 'April 2',
      position: 23,
      color: '#E83FC7'
    },
    {
      company: 'Global Ind.',
      daysFromNow: '+2 weeks',
      date: 'April 9',
      position: 46,
      color: 'var(--color-accent-main)'
    },
    {
      company: 'Acme Corp',
      daysFromNow: '+3 weeks',
      date: 'April 16',
      position: 69,
      color: 'var(--color-accent-main)'
    }
  ];

  return (
    <div style={{ marginBottom: 'var(--spacing-s8)' }}>
      {/* Section Header */}
      <h2 
        style={{
          fontSize: '18px',
          lineHeight: '24px',
          fontWeight: '600',
          color: 'var(--color-secondary-dark)',
          fontFamily: 'Inter, sans-serif',
          marginBottom: '20px'
        }}
      >
        Next 30 days — Renewal timeline
      </h2>

      {/* Timeline Container */}
      <div 
        style={{
          background: 'var(--color-basic-white)',
          borderRadius: '8px',
          border: '1px solid var(--color-tertiary-dark)',
          boxShadow: 'var(--elevation-down-s)',
          padding: '48px 60px',
          position: 'relative',
          minHeight: '120px'
        }}
      >
        {/* Timeline Line */}
        <div 
          style={{
            position: 'absolute',
            top: '48px',
            left: '60px',
            right: '60px',
            height: '2px',
            background: 'linear-gradient(to right, var(--color-danger-main) 0%, #E83FC7 30%, var(--color-accent-main) 60%, var(--color-tertiary-darker) 100%)',
            zIndex: 1
          }}
        />

        {/* Timeline Items */}
        <div 
          style={{
            position: 'relative',
            height: '90px',
            width: '100%'
          }}
        >
          {timelineItems.map((item, index) => (
            <TimelineItem
              key={index}
              company={item.company}
              daysFromNow={item.daysFromNow}
              date={item.date}
              position={item.position}
              color={item.color}
            />
          ))}
          
          {/* +30 days marker */}
          <div 
            style={{
              position: 'absolute',
              left: '100%',
              top: '-4px',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-s2)'
            }}
          >
            <div 
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--color-tertiary-darker)',
                border: '2px solid var(--color-basic-white)',
                boxShadow: 'var(--elevation-down-s)',
                zIndex: 2
              }}
            />
            <div 
              className="text-13 font-graphik-regular"
              style={{
                color: 'var(--color-secondary-lighter)',
                whiteSpace: 'nowrap'
              }}
            >
              +30 days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewalTimeline;
