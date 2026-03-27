import React, { useState } from 'react';
import { X } from 'lucide-react';

const RoutineSettingsModal = ({ isOpen, onClose, routine }) => {
  const [isEnabled, setIsEnabled] = useState(routine?.isSet || false);
  const [frequency, setFrequency] = useState(routine?.frequency || 'daily');
  const [time, setTime] = useState(routine?.time || '09:00');
  const [dayOfWeek, setDayOfWeek] = useState(routine?.dayOfWeek || 'monday');

  if (!isOpen || !routine) return null;

  const handleSave = () => {
    console.log('Save routine settings:', { isEnabled, frequency, time, dayOfWeek });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--color-basic-white)',
          borderRadius: '8px',
          width: '500px',
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: 'var(--elevation-down-m)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 20px 16px 20px',
            borderBottom: '1px solid var(--color-tertiary-dark)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: routine.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <routine.icon size={20} style={{ color: routine.iconColor }} />
            </div>
            <h2
              style={{
                fontSize: '20px',
                lineHeight: '24px',
                fontWeight: '700',
                color: 'var(--color-secondary-dark)',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              {routine.title}
            </h2>
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
              color: 'var(--color-secondary-lighter)',
              transition: 'color 150ms ease'
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--color-secondary-dark)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--color-secondary-lighter)')}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <p
              className="text-14 font-graphik-regular"
              style={{
                color: 'var(--color-secondary-dark)',
                lineHeight: '20px'
              }}
            >
              {routine.description}
            </p>
          </div>

          {/* Status Toggle */}
          <div style={{ marginBottom: '24px' }}>
            <h3
              className="text-13 font-graphik-semibold"
              style={{
                color: 'var(--color-secondary-lighter)',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              STATUS
            </h3>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                padding: '12px',
                borderRadius: '4px',
                transition: 'background 150ms ease',
                background: '#fafafa'
              }}
            >
              <span 
                className="text-14 font-graphik-semibold" 
                style={{ color: 'var(--color-secondary-dark)' }}
              >
                Enable routine
              </span>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setIsEnabled(!isEnabled);
                }}
                style={{
                  width: '52px',
                  height: '28px',
                  borderRadius: '14px',
                  background: isEnabled ? 'var(--color-primary-main)' : '#D1D1D1',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background 200ms ease',
                  flexShrink: 0,
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: '2px',
                    left: isEnabled ? '26px' : '2px',
                    transition: 'left 200ms ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                />
              </div>
            </label>
          </div>

          {/* Frequency Settings */}
          {isEnabled && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <h3
                  className="text-13 font-graphik-semibold"
                  style={{
                    color: 'var(--color-secondary-lighter)',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    marginBottom: '12px'
                  }}
                >
                  FREQUENCY
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      padding: '6px 8px',
                      borderRadius: '4px',
                      transition: 'background 150ms ease'
                    }}
                    onMouseEnter={(e) => (e.target.style.background = '#fafafa')}
                    onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                  >
                    <input
                      type="radio"
                      name="frequency"
                      value="daily"
                      checked={frequency === 'daily'}
                      onChange={(e) => setFrequency(e.target.value)}
                      style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: 'var(--color-primary-main)',
                        flexShrink: 0
                      }}
                    />
                    <span className="text-14 font-graphik-regular" style={{ color: 'var(--color-secondary-dark)' }}>
                      Daily
                    </span>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      padding: '6px 8px',
                      borderRadius: '4px',
                      transition: 'background 150ms ease'
                    }}
                    onMouseEnter={(e) => (e.target.style.background = '#fafafa')}
                    onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                  >
                    <input
                      type="radio"
                      name="frequency"
                      value="weekly"
                      checked={frequency === 'weekly'}
                      onChange={(e) => setFrequency(e.target.value)}
                      style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: 'var(--color-primary-main)',
                        flexShrink: 0
                      }}
                    />
                    <span className="text-14 font-graphik-regular" style={{ color: 'var(--color-secondary-dark)' }}>
                      Weekly
                    </span>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      padding: '6px 8px',
                      borderRadius: '4px',
                      transition: 'background 150ms ease'
                    }}
                    onMouseEnter={(e) => (e.target.style.background = '#fafafa')}
                    onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                  >
                    <input
                      type="radio"
                      name="frequency"
                      value="monthly"
                      checked={frequency === 'monthly'}
                      onChange={(e) => setFrequency(e.target.value)}
                      style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: 'var(--color-primary-main)',
                        flexShrink: 0
                      }}
                    />
                    <span className="text-14 font-graphik-regular" style={{ color: 'var(--color-secondary-dark)' }}>
                      Monthly
                    </span>
                  </label>
                </div>
              </div>

              {/* Time Settings */}
              {frequency === 'daily' && (
                <div style={{ marginBottom: '24px' }}>
                  <h3
                    className="text-13 font-graphik-semibold"
                    style={{
                      color: 'var(--color-secondary-lighter)',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      marginBottom: '12px'
                    }}
                  >
                    TIME
                  </h3>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--color-tertiary-darker)',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--color-secondary-dark)'
                    }}
                  />
                </div>
              )}

              {/* Day of Week Settings */}
              {frequency === 'weekly' && (
                <div style={{ marginBottom: '24px' }}>
                  <h3
                    className="text-13 font-graphik-semibold"
                    style={{
                      color: 'var(--color-secondary-lighter)',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      marginBottom: '12px'
                    }}
                  >
                    DAY OF WEEK
                  </h3>
                  <select
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--color-tertiary-darker)',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--color-secondary-dark)',
                      background: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                </div>
              )}
            </>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
            <button
              onClick={onClose}
              style={{
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif',
                border: '1px solid var(--color-tertiary-darker)',
                background: 'var(--color-basic-white)',
                color: 'var(--color-secondary-main)',
                cursor: 'pointer',
                transition: 'all 150ms ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--color-tertiary-light)';
                e.target.style.borderColor = 'var(--color-secondary-lighter)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--color-basic-white)';
                e.target.style.borderColor = 'var(--color-tertiary-darker)';
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif',
                border: 'none',
                background: 'var(--color-primary-main)',
                color: 'white',
                cursor: 'pointer',
                transition: 'background 150ms ease'
              }}
              onMouseEnter={(e) => (e.target.style.background = 'var(--color-primary-dark)')}
              onMouseLeave={(e) => (e.target.style.background = 'var(--color-primary-main)')}
            >
              Save settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineSettingsModal;
