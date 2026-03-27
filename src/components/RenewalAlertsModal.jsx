import React, { useState, useEffect } from 'react';
import { Clock, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { SparkleIcon } from './Icons';

const RenewalAlertsModal = ({ isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState('main'); // 'main', 'renewal-date', 'notifications'
  const [renewalDate, setRenewalDate] = useState('ai-suggestion');
  const [sendNotifications, setSendNotifications] = useState(true);
  const [notifyOwner, setNotifyOwner] = useState(true);
  const [notifyRecipients, setNotifyRecipients] = useState(false);
  const [remindDays, setRemindDays] = useState('60');

  useEffect(() => {
    if (!isOpen) {
      setCurrentView('main');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getRenewalDateStatus = () => {
    switch (renewalDate) {
      case 'not-set':
        return 'Not set';
      case 'after-completion':
        return 'After document completion';
      case 'specific-date':
        return 'On specific date';
      case 'ai-suggestion':
        return 'Based on AI recommendation';
      default:
        return 'Not set';
    }
  };

  const getNotificationsStatus = () => {
    if (!sendNotifications) return 'Not set';
    const recipients = [];
    if (notifyOwner) recipients.push('document owner');
    if (notifyRecipients) recipients.push('recipients');
    if (recipients.length === 0) return 'Not set';
    return `Send to ${recipients.join(' and ')} ${remindDays} days prior`;
  };

  const handleBack = () => {
    setCurrentView('main');
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
          width: '460px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} color="var(--color-secondary-dark)" />
            <h2
              style={{ 
                fontSize: '20px',
                lineHeight: '24px',
                fontWeight: '700',
                color: 'var(--color-secondary-dark)',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Renewal alerts
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
              justifyContent: 'center',
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
          {/* Main View - Entry Points */}
          {currentView === 'main' && (
            <>
              <p
                className="text-14 font-graphik-regular"
                style={{
                  color: 'var(--color-secondary-main)',
                  marginBottom: '20px'
                }}
              >
                Set a renewal and document expiration date to enable notifications
              </p>

              {/* Entry Point Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Renewal Date Entry */}
                <div
                  onClick={() => setCurrentView('renewal-date')}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-tertiary-dark)',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fafafa';
                    e.currentTarget.style.borderColor = 'var(--color-secondary-lighter)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = 'var(--color-tertiary-dark)';
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        color: 'var(--color-secondary-dark)',
                        fontFamily: 'Inter, sans-serif',
                        marginBottom: '4px'
                      }}
                    >
                      Renewal date
                      {renewalDate !== 'not-set' && (
                        <span
                          style={{
                            marginLeft: '8px',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            background: '#E8F5F1',
                            color: 'var(--color-primary-main)'
                          }}
                        >
                          SET
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: '400',
                        color: 'var(--color-secondary-light)',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      {getRenewalDateStatus()}
                    </div>
                  </div>
                  <ChevronRight size={20} color="var(--color-secondary-light)" />
                </div>

                {/* Notifications Entry */}
                <div
                  onClick={() => setCurrentView('notifications')}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-tertiary-dark)',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fafafa';
                    e.currentTarget.style.borderColor = 'var(--color-secondary-lighter)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = 'var(--color-tertiary-dark)';
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        color: 'var(--color-secondary-dark)',
                        fontFamily: 'Inter, sans-serif',
                        marginBottom: '4px'
                      }}
                    >
                      Notifications
                      {(notifyOwner || notifyRecipients) && sendNotifications && (
                        <span
                          style={{
                            marginLeft: '8px',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            background: '#E8F5F1',
                            color: 'var(--color-primary-main)'
                          }}
                        >
                          SET
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: '400',
                        color: 'var(--color-secondary-light)',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      {getNotificationsStatus()}
                    </div>
                  </div>
                  <ChevronRight size={20} color="var(--color-secondary-light)" />
                </div>
              </div>
            </>
          )}

          {/* Renewal Date Detail View */}
          {currentView === 'renewal-date' && (
            <>
              <button
                onClick={handleBack}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'transparent',
                  border: 'none',
                  padding: '8px 0',
                  marginBottom: '16px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--color-secondary-light)',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'color 150ms ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-secondary-dark)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-secondary-light)')}
              >
                <ChevronLeft size={18} />
                Back
              </button>

              <h3
                className="text-13 font-graphik-semibold"
                style={{
                  color: 'var(--color-secondary-lighter)',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}
              >
                RENEWAL DATE
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
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
                  name="renewalDate"
                  value="not-set"
                  checked={renewalDate === 'not-set'}
                  onChange={(e) => setRenewalDate(e.target.value)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: 'var(--color-primary-main)',
                    flexShrink: 0
                  }}
                />
                <span className="text-14 font-graphik-regular" style={{ color: 'var(--color-secondary-dark)' }}>
                  Not set
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
                  name="renewalDate"
                  value="after-completion"
                  checked={renewalDate === 'after-completion'}
                  onChange={(e) => setRenewalDate(e.target.value)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: 'var(--color-primary-main)',
                    flexShrink: 0
                  }}
                />
                <span className="text-14 font-graphik-regular" style={{ color: 'var(--color-secondary-dark)' }}>
                  After document completion
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
                  name="renewalDate"
                  value="specific-date"
                  checked={renewalDate === 'specific-date'}
                  onChange={(e) => setRenewalDate(e.target.value)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: 'var(--color-primary-main)',
                    flexShrink: 0
                  }}
                />
                <span className="text-14 font-graphik-regular" style={{ color: 'var(--color-secondary-dark)' }}>
                  On specific date
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
                  name="renewalDate"
                  value="ai-suggestion"
                  checked={renewalDate === 'ai-suggestion'}
                  onChange={(e) => setRenewalDate(e.target.value)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: 'var(--color-primary-main)',
                    flexShrink: 0
                  }}
                />
                <span className="text-14 font-graphik-regular" style={{ color: 'var(--color-secondary-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Auto-set based on
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-smart-main)', fontWeight: '600' }}>
                    <SparkleIcon className="w-4 h-4" />
                    AI suggestion
                  </span>
                </span>
              </label>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                <button
                  onClick={handleBack}
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
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'var(--color-basic-white)';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Save renewal date:', renewalDate);
                    handleBack();
                  }}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif',
                    border: 'none',
                    background: 'var(--color-primary-main)',
                    color: 'var(--color-basic-white)',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                    boxShadow: '0 2px 4px rgba(36, 133, 103, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--color-primary-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'var(--color-primary-main)';
                  }}
                >
                  Save
                </button>
              </div>
            </>
          )}

          {/* Notifications Detail View */}
          {currentView === 'notifications' && (
            <>
              <button
                onClick={handleBack}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'transparent',
                  border: 'none',
                  padding: '8px 0',
                  marginBottom: '16px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--color-secondary-light)',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'color 150ms ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-secondary-dark)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-secondary-light)')}
              >
                <ChevronLeft size={18} />
                Back
              </button>

              <h3
                className="text-13 font-graphik-semibold"
                style={{
                  color: 'var(--color-secondary-lighter)',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  marginBottom: '12px'
                }}
              >
                NOTIFICATIONS
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {/* Send notifications toggle */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '4px',
                  transition: 'background 150ms ease'
                }}
                onMouseEnter={(e) => (e.target.style.background = '#fafafa')}
                onMouseLeave={(e) => (e.target.style.background = 'transparent')}
              >
                <span className="text-14 font-graphik-regular" style={{ color: 'var(--color-secondary-dark)' }}>
                  Send notifications
                </span>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setSendNotifications(!sendNotifications);
                  }}
                  style={{
                    width: '48px',
                    height: '28px',
                    borderRadius: '14px',
                    background: sendNotifications ? 'var(--color-primary-main)' : 'var(--color-tertiary-darker)',
                    position: 'relative',
                    transition: 'background 200ms ease',
                    cursor: 'pointer'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '3px',
                      left: sendNotifications ? '23px' : '3px',
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'white',
                      transition: 'left 200ms ease',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                  />
                </div>
              </label>

              {/* Document owner checkbox */}
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
                  type="checkbox"
                  checked={notifyOwner}
                  onChange={(e) => setNotifyOwner(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: 'var(--color-primary-main)',
                    flexShrink: 0
                  }}
                />
                <span className="text-14 font-graphik-regular" style={{ color: 'var(--color-secondary-dark)' }}>
                  Document owner
                </span>
              </label>

              {/* Document recipients checkbox */}
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
                  type="checkbox"
                  checked={notifyRecipients}
                  onChange={(e) => setNotifyRecipients(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: 'var(--color-primary-main)',
                    flexShrink: 0
                  }}
                />
                <span className="text-14 font-graphik-regular" style={{ color: 'var(--color-secondary-dark)' }}>
                  Document recipients
                </span>
              </label>
              </div>

              {/* Remind days prior */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 12px',
                  background: '#fafafa',
                  borderRadius: '4px',
                  marginBottom: '20px'
                }}
              >
                <span className="text-14 font-graphik-regular" style={{ color: 'var(--color-secondary-dark)' }}>
                  Remind
                </span>
                <input
                  type="number"
                  value={remindDays}
                  onChange={(e) => setRemindDays(e.target.value)}
                  style={{
                    width: '70px',
                    padding: '6px 10px',
                    border: '1px solid var(--color-tertiary-darker)',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--color-secondary-dark)',
                    textAlign: 'center'
                  }}
                />
                <span className="text-14 font-graphik-regular" style={{ color: 'var(--color-secondary-dark)' }}>
                  days prior
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                <button
                  onClick={handleBack}
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
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'var(--color-basic-white)';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Save notifications:', { sendNotifications, notifyOwner, notifyRecipients, remindDays });
                    handleBack();
                  }}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif',
                    border: 'none',
                    background: 'var(--color-primary-main)',
                    color: 'var(--color-basic-white)',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                    boxShadow: '0 2px 4px rgba(36, 133, 103, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--color-primary-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'var(--color-primary-main)';
                  }}
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenewalAlertsModal;
