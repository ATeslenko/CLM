import React, { useState } from 'react';
import { X } from 'lucide-react';

const BulkEmailModal = ({ isOpen, onClose, selectedTasks, onSend, defaultSubject, defaultBody }) => {
  const [subject, setSubject] = useState(defaultSubject || 'Reminder for [Company Name]');
  const [body, setBody] = useState(
    defaultBody || `Dear [Recipient Name],\n\nThis is a friendly reminder regarding your contract with [Company Name].\n\nPlease let us know if you have any questions or need assistance.\n\nBest regards,\nAsya`
  );

  React.useEffect(() => {
    if (isOpen) {
      setSubject(defaultSubject || 'Reminder for [Company Name]');
      setBody(defaultBody || `Dear [Recipient Name],\n\nThis is a friendly reminder regarding your contract with [Company Name].\n\nPlease let us know if you have any questions or need assistance.\n\nBest regards,\nAsya`);
    }
  }, [isOpen, defaultSubject, defaultBody]);

  if (!isOpen) return null;

  const handleSend = () => {
    onSend({ subject, body });
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
        background: 'rgba(47, 47, 47, 0.32)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-basic-white)',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(47,47,47,0.04), 0 4px 16px rgba(47,47,47,0.12)',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '24px',
            borderBottom: '1px solid var(--color-tertiary-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <h2 
            style={{
              fontSize: '18px',
              lineHeight: '24px',
              fontWeight: '600',
              color: 'var(--color-secondary-dark)',
              fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
          >
            Send Bulk Reminder
          </h2>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--color-secondary-lighter)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
          <div style={{ marginBottom: '16px' }}>
            <div 
              style={{
                fontSize: '13px',
                fontWeight: '400',
                color: 'var(--color-secondary-main)',
                marginBottom: '8px',
                fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              Sending to {selectedTasks.length} recipient{selectedTasks.length !== 1 ? 's' : ''}:
            </div>
            <div 
              style={{
                fontSize: '12px',
                color: 'var(--color-secondary-lighter)',
                fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              {selectedTasks.map(task => `${task.recipientName} (${task.companyName})`).join(', ')}
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label 
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '400',
                color: 'var(--color-secondary-main)',
                marginBottom: '8px',
                fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid var(--color-tertiary-darker)',
                borderRadius: '4px',
                fontSize: '13px',
                fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                color: 'var(--color-secondary-main)',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-primary-main)';
                e.target.style.boxShadow = '0 0 0 2px var(--color-primary-lighter)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-tertiary-darker)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label 
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '400',
                color: 'var(--color-secondary-main)',
                marginBottom: '8px',
                fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              Message
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid var(--color-tertiary-darker)',
                borderRadius: '4px',
                fontSize: '13px',
                fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                color: 'var(--color-secondary-main)',
                outline: 'none',
                resize: 'vertical'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-primary-main)';
                e.target.style.boxShadow = '0 0 0 2px var(--color-primary-lighter)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-tertiary-darker)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <div 
              style={{
                fontSize: '12px',
                color: 'var(--color-secondary-lighter)',
                marginTop: '8px',
                fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              Available variables: [Company Name], [Recipient Name]
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--color-tertiary-main)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px'
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
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
            onClick={handleSend}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              border: 'none',
              background: 'var(--color-primary-main)',
              color: 'var(--color-basic-white)',
              cursor: 'pointer',
              transition: 'all 150ms ease',
              boxShadow: '0 0 1px rgba(47,47,47,0.08), 0 0.5px 2px rgba(47,47,47,0.12)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--color-primary-dark)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'var(--color-primary-main)';
            }}
          >
            Send {selectedTasks.length} reminder{selectedTasks.length !== 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkEmailModal;
