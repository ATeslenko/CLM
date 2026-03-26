import React, { useState } from 'react';
import { AlertCircle, FileText, Clock, CheckCircle, Mail } from 'lucide-react';
import BulkEmailModal from './BulkEmailModal';

const TaskTile = ({ icon: Icon, subtitle, description, actions, id, isSelected, onSelect, showCheckbox }) => {
  return (
    <div 
      style={{
        background: 'var(--color-basic-white)',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 0 1px rgba(47,47,47,0.04), 0 1px 4px rgba(47,47,47,0.12)',
        border: isSelected ? '2px solid var(--color-primary-main)' : '1px solid #e5e5e5',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '12px',
        transition: 'all 150ms ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 2px rgba(47,47,47,0.04), 0 2px 8px rgba(47,47,47,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 1px rgba(47,47,47,0.04), 0 1px 4px rgba(47,47,47,0.12)';
      }}
    >
      {showCheckbox && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(id, e.target.checked)}
          style={{
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            accentColor: 'var(--color-primary-main)',
            flexShrink: 0
          }}
        />
      )}
      
      <div 
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          background: 'var(--color-primary-lighter)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <Icon size={20} style={{ color: 'var(--color-primary-main)' }} />
      </div>
      
      <div style={{ flex: 1 }}>
        <div 
          style={{
            fontSize: '14px',
            lineHeight: '17px',
            fontWeight: '600',
            color: 'var(--color-secondary-dark)',
            fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            marginBottom: '4px'
          }}
        >
          {subtitle}
        </div>
        {description && (
          <div 
            style={{
              fontSize: '13px',
              lineHeight: '16px',
              fontWeight: '400',
              color: 'var(--color-secondary-lighter)',
              fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
          >
            {description}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              border: action.primary ? 'none' : '1px solid var(--color-tertiary-darker)',
              background: action.primary ? 'var(--color-primary-main)' : 'var(--color-basic-white)',
              color: action.primary ? 'var(--color-basic-white)' : 'var(--color-secondary-main)',
              cursor: 'pointer',
              transition: 'all 150ms ease',
              boxShadow: action.primary ? '0 0 1px rgba(47,47,47,0.08), 0 0.5px 2px rgba(47,47,47,0.12)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (action.primary) {
                e.target.style.background = 'var(--color-primary-dark)';
              } else {
                e.target.style.background = 'var(--color-tertiary-light)';
              }
            }}
            onMouseLeave={(e) => {
              if (action.primary) {
                e.target.style.background = 'var(--color-primary-main)';
              } else {
                e.target.style.background = 'var(--color-basic-white)';
              }
            }}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const PriorityTasks = ({ activeTab: externalActiveTab, onTabChange }) => {
  const [internalActiveTab, setInternalActiveTab] = useState('urgent');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [prevActiveTab, setPrevActiveTab] = useState('urgent');
  
  const activeTab = externalActiveTab || internalActiveTab;
  
  React.useEffect(() => {
    if (activeTab !== prevActiveTab) {
      setSelectedTasks([]);
      setPrevActiveTab(activeTab);
    }
  }, [activeTab, prevActiveTab]);
  
  const handleTabChange = (tabId) => {
    setInternalActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const tabs = [
    { id: 'urgent', label: 'Urgent' },
    { id: 'renewals', label: 'Renewals' },
    { id: 'expirations', label: 'Expirations' },
    { id: 'payment', label: 'Pending payment' },
    { id: 'awaiting', label: 'Awaiting others' }
  ];

  const urgentTasks = [
    {
      id: 'urgent-1',
      companyName: 'Acme Corp',
      recipientName: 'Sarah Johnson',
      recipientEmail: 'sarah@acmecorp.com',
      icon: AlertCircle,
      subtitle: 'Acme Corp awaiting signature',
      description: 'Sarah Johnson has viewed the contract but hasn\'t signed it',
      actions: [
        { label: 'Remind', onClick: () => console.log('Remind'), primary: false },
        { label: 'View', onClick: () => console.log('View'), primary: true }
      ]
    },
    {
      id: 'urgent-2',
      companyName: 'Enterprise Services',
      recipientName: 'Legal Team',
      recipientEmail: 'legal@enterpriseservices.com',
      icon: FileText,
      subtitle: 'Enterprise Service Agreement renews in 14 days',
      description: 'High-value contract requiring approval from legal team before renewal',
      actions: [
        { label: 'Request approval', onClick: () => console.log('Request approval'), primary: false },
        { label: 'View contract', onClick: () => console.log('View contract'), primary: true }
      ]
    },
    {
      id: 'urgent-3',
      companyName: 'Tech Solutions',
      recipientName: 'Mike Patterson',
      recipientEmail: 'mike@techsolutions.com',
      icon: Clock,
      subtitle: 'Tech Solutions expires in 2 days',
      description: 'Annual subscription contract ending on March 27, 2026',
      actions: [
        { label: 'Renew', onClick: () => console.log('Renew'), primary: true }
      ]
    },
    {
      id: 'urgent-4',
      companyName: 'Global Industries',
      recipientName: 'Finance Department',
      recipientEmail: 'finance@globalindustries.com',
      icon: FileText,
      subtitle: 'Global Industries pending payment',
      description: 'Invoice #INV-2847 overdue by 5 days, amount $4,250.00',
      actions: [
        { label: 'Send reminder', onClick: () => console.log('Send reminder'), primary: false },
        { label: 'View invoice', onClick: () => console.log('View invoice'), primary: true }
      ]
    }
  ];

  const renewalTasks = [
    {
      id: 'renewal-1',
      companyName: 'Beta Systems',
      recipientName: 'David Thompson',
      recipientEmail: 'david@betasystems.com',
      icon: FileText,
      subtitle: 'Beta Systems renews in 24 days',
      description: 'Service agreement worth $12,500 - last renewed April 2025',
      actions: [
        { label: 'Prepare renewal', onClick: () => console.log('Prepare'), primary: true }
      ]
    },
    {
      id: 'renewal-2',
      companyName: 'Omega Partners',
      recipientName: 'Lisa Martinez',
      recipientEmail: 'lisa@omegapartners.com',
      icon: FileText,
      subtitle: 'Omega Partners renews in 18 days',
      description: 'Enterprise license renewal - contact Lisa Martinez for approval',
      actions: [
        { label: 'Contact', onClick: () => console.log('Contact'), primary: false },
        { label: 'Prepare renewal', onClick: () => console.log('Prepare'), primary: true }
      ]
    },
    {
      id: 'renewal-3',
      companyName: 'Zenith Corp',
      recipientName: 'Robert Chen',
      recipientEmail: 'robert@zenithcorp.com',
      icon: FileText,
      subtitle: 'Zenith Corp renews in 30 days',
      description: 'Multi-year partnership agreement - schedule review meeting',
      actions: [
        { label: 'Schedule', onClick: () => console.log('Schedule'), primary: false },
        { label: 'View contract', onClick: () => console.log('View'), primary: true }
      ]
    }
  ];

  const expirationTasks = [
    {
      id: 'expiration-1',
      companyName: 'Alpha Corp',
      recipientName: 'Jennifer White',
      recipientEmail: 'jennifer@alphacorp.com',
      icon: Clock,
      subtitle: 'Alpha Corp expires in 15 days',
      description: 'Quarterly subscription - auto-renewal disabled per client request',
      actions: [
        { label: 'Contact client', onClick: () => console.log('Contact'), primary: false },
        { label: 'Renew', onClick: () => console.log('Renew'), primary: true }
      ]
    },
    {
      id: 'expiration-2',
      companyName: 'Sigma Ltd',
      recipientName: 'James Rodriguez',
      recipientEmail: 'james@sigmaltd.com',
      icon: Clock,
      subtitle: 'Sigma Ltd expires in 28 days',
      description: 'Annual maintenance contract - client has expressed interest in upgrade',
      actions: [
        { label: 'Renew', onClick: () => console.log('Renew'), primary: true }
      ]
    },
    {
      id: 'expiration-3',
      companyName: 'Phoenix Industries',
      recipientName: 'Amanda Foster',
      recipientEmail: 'amanda@phoenixind.com',
      icon: Clock,
      subtitle: 'Phoenix Industries expires in 10 days',
      description: 'Trial period ending - follow up on conversion to paid plan',
      actions: [
        { label: 'Follow up', onClick: () => console.log('Follow up'), primary: false },
        { label: 'Convert', onClick: () => console.log('Convert'), primary: true }
      ]
    }
  ];

  const awaitingTasks = [
    {
      id: 'awaiting-1',
      companyName: 'Acme Corp',
      recipientName: 'Sarah Johnson',
      recipientEmail: 'sarah@acmecorp.com',
      icon: AlertCircle,
      subtitle: 'Acme Corp awaiting signature',
      description: 'Sarah Johnson has viewed the contract but hasn\'t signed it',
      actions: [
        { label: 'Remind', onClick: () => console.log('Remind'), primary: false },
        { label: 'View', onClick: () => console.log('View'), primary: true }
      ]
    },
    {
      id: 'awaiting-2',
      companyName: 'NextGen Tech',
      recipientName: 'Michael Chen',
      recipientEmail: 'michael@nextgentech.com',
      icon: AlertCircle,
      subtitle: 'NextGen Tech awaiting signature',
      description: 'Michael Chen opened the document 3 days ago but hasn\'t completed signing',
      actions: [
        { label: 'Remind', onClick: () => console.log('Remind'), primary: false },
        { label: 'View', onClick: () => console.log('View'), primary: true }
      ]
    },
    {
      id: 'awaiting-3',
      companyName: 'Delta Corp',
      recipientName: 'Finance Department',
      recipientEmail: 'finance@deltacorp.com',
      icon: Clock,
      subtitle: 'Delta Corp awaiting approval',
      description: 'Contract modification waiting for internal approval from finance department',
      actions: [
        { label: 'Follow up', onClick: () => console.log('Follow up'), primary: false },
        { label: 'View', onClick: () => console.log('View'), primary: true }
      ]
    }
  ];

  const paymentTasks = [
    {
      id: 'payment-1',
      companyName: 'Global Industries',
      recipientName: 'Finance Department',
      recipientEmail: 'finance@globalindustries.com',
      icon: FileText,
      subtitle: 'Global Industries pending payment',
      description: 'Invoice #INV-2847 overdue by 5 days, amount $4,250.00',
      actions: [
        { label: 'Send reminder', onClick: () => console.log('Send reminder'), primary: false },
        { label: 'View invoice', onClick: () => console.log('View invoice'), primary: true }
      ]
    },
    {
      id: 'payment-2',
      companyName: 'Quantum Systems',
      recipientName: 'Accounts Payable',
      recipientEmail: 'ap@quantumsystems.com',
      icon: FileText,
      subtitle: 'Quantum Systems pending payment',
      description: 'Invoice #INV-2891 due today, amount $8,900.00',
      actions: [
        { label: 'Send reminder', onClick: () => console.log('Send reminder'), primary: false },
        { label: 'View invoice', onClick: () => console.log('View invoice'), primary: true }
      ]
    },
    {
      id: 'payment-3',
      companyName: 'Stellar Inc',
      recipientName: 'Billing Team',
      recipientEmail: 'billing@stellarinc.com',
      icon: FileText,
      subtitle: 'Stellar Inc pending payment',
      description: 'Invoice #INV-2823 overdue by 12 days, amount $2,150.00',
      actions: [
        { label: 'Escalate', onClick: () => console.log('Escalate'), primary: false },
        { label: 'View invoice', onClick: () => console.log('View invoice'), primary: true }
      ]
    }
  ];

  const getTasksForTab = () => {
    switch (activeTab) {
      case 'renewals':
        return renewalTasks;
      case 'expirations':
        return expirationTasks;
      case 'awaiting':
        return awaitingTasks;
      case 'payment':
        return paymentTasks;
      case 'urgent':
        return urgentTasks;
      default:
        return urgentTasks;
    }
  };

  const currentTasks = getTasksForTab();
  const supportsEmail = activeTab !== 'urgent';
  const selectedTasksData = currentTasks.filter(task => selectedTasks.includes(task.id));

  const handleSelectTask = (taskId, isChecked) => {
    if (isChecked) {
      setSelectedTasks([...selectedTasks, taskId]);
    } else {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    }
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === currentTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(currentTasks.map(task => task.id));
    }
  };

  const handleSendEmails = (emailData) => {
    console.log('Sending emails to:', selectedTasksData.length, 'recipients');
    console.log('Email data:', emailData);
    console.log('Recipients:', selectedTasksData.map(t => ({ 
      company: t.companyName, 
      recipient: t.recipientName,
      email: t.recipientEmail 
    })));
    setSelectedTasks([]);
  };

  return (
    <div 
      style={{
        background: 'var(--color-basic-white)',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 0 1px rgba(47,47,47,0.04), 0 1px 4px rgba(47,47,47,0.12)'
      }}
    >
      <h2 
        style={{
          fontSize: '18px',
          lineHeight: '24px',
          fontWeight: '600',
          color: 'var(--color-secondary-dark)',
          fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          marginBottom: '24px'
        }}
      >
        Priority tasks
      </h2>

      {/* Tabs */}
      <div 
        role="tablist" 
        aria-label="Priority task categories"
        style={{
          display: 'flex',
          gap: '4px',
          borderBottom: '1px solid var(--color-tertiary-main)',
          marginBottom: '24px'
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => handleTabChange(tab.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 16px',
              border: 'none',
              background: 'transparent',
              color: activeTab === tab.id ? 'var(--color-primary-main)' : 'var(--color-secondary-lighter)',
              fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? '600' : '400',
              lineHeight: '17px',
              cursor: 'pointer',
              transition: 'all 150ms ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.color = 'var(--color-secondary-main)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.color = 'var(--color-secondary-lighter)';
              }
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '-1px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--color-primary-main)',
                  borderRadius: '2px 2px 0 0'
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Bulk Action Bar */}
      {supportsEmail && selectedTasks.length > 0 && (
        <div 
          style={{
            background: 'var(--color-primary-lighter)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid var(--color-primary-light)'
          }}
        >
          <div 
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--color-secondary-dark)',
              fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
          >
            {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''} selected
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setSelectedTasks([])}
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
              Clear selection
            </button>
            <button
              onClick={() => setIsEmailModalOpen(true)}
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
                boxShadow: '0 0 1px rgba(47,47,47,0.08), 0 0.5px 2px rgba(47,47,47,0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--color-primary-dark)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--color-primary-main)';
              }}
            >
              <Mail size={16} />
              Send reminders
            </button>
          </div>
        </div>
      )}

      {/* Select All Option */}
      {supportsEmail && currentTasks.length > 0 && (
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            padding: '8px 0'
          }}
        >
          <input
            type="checkbox"
            checked={selectedTasks.length === currentTasks.length && currentTasks.length > 0}
            onChange={handleSelectAll}
            style={{
              width: '20px',
              height: '20px',
              cursor: 'pointer',
              accentColor: 'var(--color-primary-main)'
            }}
          />
          <label 
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--color-secondary-main)',
              fontFamily: 'Graphik, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              cursor: 'pointer'
            }}
            onClick={handleSelectAll}
          >
            Select all
          </label>
        </div>
      )}

      {/* Tab Panel */}
      <div role="tabpanel">
        {currentTasks.map((task) => (
          <TaskTile
            key={task.id}
            id={task.id}
            icon={task.icon}
            subtitle={task.subtitle}
            description={task.description}
            actions={task.actions}
            showCheckbox={supportsEmail}
            isSelected={selectedTasks.includes(task.id)}
            onSelect={handleSelectTask}
          />
        ))}
      </div>

      {/* Email Modal */}
      <BulkEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        selectedTasks={selectedTasksData}
        onSend={handleSendEmails}
        defaultSubject={
          activeTab === 'renewals' ? 'Renewal Reminder for [Company Name]' :
          activeTab === 'expirations' ? 'Contract Expiration Notice for [Company Name]' :
          activeTab === 'awaiting' ? 'Document Signature Reminder for [Company Name]' :
          activeTab === 'payment' ? 'Payment Reminder for [Company Name]' :
          'Reminder for [Company Name]'
        }
        defaultBody={
          activeTab === 'renewals' ? 
            `Dear [Recipient Name],\n\nThis is a friendly reminder that your contract with [Company Name] is coming up for renewal.\n\nWe'd love to continue our partnership. Please let us know if you have any questions or would like to discuss renewal terms.\n\nBest regards,\nAsya` :
          activeTab === 'expirations' ?
            `Dear [Recipient Name],\n\nYour contract with [Company Name] is expiring soon. We wanted to reach out to discuss renewal options.\n\nPlease contact us at your earliest convenience to ensure uninterrupted service.\n\nBest regards,\nAsya` :
          activeTab === 'awaiting' ?
            `Dear [Recipient Name],\n\nThis is a gentle reminder that we're awaiting your signature on the document for [Company Name].\n\nPlease review and sign at your earliest convenience. Let us know if you have any questions.\n\nBest regards,\nAsya` :
          activeTab === 'payment' ?
            `Dear [Recipient Name],\n\nThis is a friendly reminder regarding the pending payment for [Company Name].\n\nPlease process the payment at your earliest convenience. Contact us if you need any additional information.\n\nBest regards,\nAsya` :
          `Dear [Recipient Name],\n\nThis is a friendly reminder regarding your contract with [Company Name].\n\nPlease let us know if you have any questions or need assistance.\n\nBest regards,\nAsya`
        }
      />
    </div>
  );
};

export default PriorityTasks;
