import React, { useState, useRef, useEffect } from 'react';
import { Clock, Mail, ChevronDown, ChevronUp, DollarSign, List, MoreVertical, FileText } from 'lucide-react';
import BulkEmailModal from './BulkEmailModal';
import RenewalAlertsModal from './RenewalAlertsModal';

const ActionTileItem = ({ company, contract, expiryDate, amount, contact, daysLeft, actions, isSelected, onSelect, showCheckbox }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    };

    if (showMoreMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMoreMenu]);

  const handleOpenMenu = (e) => {
    e.stopPropagation();
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right
      });
    }
    setShowMoreMenu(!showMoreMenu);
  };

  const primaryAction = actions.find(a => a.primary);
  const secondaryActions = actions.filter(a => !a.primary);

  const moreActions = [
    ...secondaryActions,
    { label: 'Remind me later', onClick: () => console.log('Remind me later:', company) },
    { label: 'Remove task', onClick: () => console.log('Remove task:', company) }
  ];

  return (
    <>
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          borderBottom: '1px solid #e5e5e5',
          background: 'white'
        }}
      >
      {showCheckbox && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
          style={{
            width: '16px',
            height: '16px',
            cursor: 'pointer',
            accentColor: 'var(--color-primary-main)',
            flexShrink: 0
          }}
        />
      )}
      
      <div 
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '6px',
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <FileText size={14} style={{ color: '#767676' }} />
      </div>

      <div style={{ flex: 1 }}>
        <div 
          style={{
            fontSize: '13px',
            lineHeight: '18px',
            fontWeight: '600',
            color: 'var(--color-secondary-dark)',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '2px'
          }}
        >
          {company} — {contract}
        </div>
        <div 
          style={{
            fontSize: '12px',
            lineHeight: '16px',
            fontWeight: '400',
            color: 'var(--color-secondary-lighter)',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {expiryDate} · {amount} · Contact: {contact}
        </div>
      </div>

      {daysLeft && (
        <div 
          style={{
            padding: '3px 10px',
            borderRadius: '10px',
            fontSize: '11px',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif',
            background: daysLeft.critical ? '#FDF1F0' : '#FFF8F2',
            color: daysLeft.critical ? '#E44E48' : '#F88619',
            flexShrink: 0
          }}
        >
          {daysLeft.label}
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', flexShrink: 0, alignItems: 'center' }}>
        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            style={{
              padding: '6px 14px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              border: 'none',
              background: 'var(--color-primary-main)',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 150ms ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--color-primary-dark)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'var(--color-primary-main)';
            }}
          >
            {primaryAction.label}
          </button>
        )}

        {/* More Actions Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            ref={buttonRef}
            onClick={handleOpenMenu}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '4px',
              border: '1px solid #D1D1D1',
              background: 'white',
              color: 'var(--color-secondary-main)',
              cursor: 'pointer',
              transition: 'all 150ms ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f9f9f9';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
            }}
          >
            <MoreVertical size={14} />
          </button>
        </div>
      </div>
      </div>

      {/* Dropdown Menu - Rendered at body level using portal-like approach */}
      {showMoreMenu && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: `${menuPosition.top}px`,
            right: `${menuPosition.right}px`,
            background: 'white',
            borderRadius: '6px',
            border: '1px solid var(--color-tertiary-darker)',
            boxShadow: 'var(--elevation-down-m)',
            minWidth: '160px',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000
          }}
        >
          {moreActions.map((action, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
                setShowMoreMenu(false);
              }}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '13px',
                fontWeight: '400',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--color-secondary-dark)',
                background: 'white',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background 150ms ease',
                borderBottom: index < moreActions.length - 1 ? '1px solid #f0f0f0' : 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f9f9f9';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

const ActionTile = ({ 
  icon: Icon, 
  iconColor, 
  iconBg,
  title, 
  subtitle, 
  badge, 
  badgeColor,
  badgeBg,
  mainActionLabel,
  items,
  defaultExpanded = false,
  variant = 'default',
  onShowSnackbar,
  showAutoRemindersFooter = false,
  bulkActionLabel = 'Send reminder',
  bulkActionIcon: BulkActionIcon = Mail,
  onBulkAction
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isRenewalAlertsModalOpen, setIsRenewalAlertsModalOpen] = useState(false);

  const handleSelectItem = (itemId, isChecked) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
  };

  const selectedItemsData = items.filter(item => selectedItems.includes(item.id));

  const getBorderColor = () => {
    return '#e5e5e5';
  };

  return (
    <>
      <div 
        style={{
          background: 'white',
          borderRadius: '8px',
          border: `1px solid ${getBorderColor()}`,
          boxShadow: '0 0 1px rgba(47,47,47,0.04), 0 1px 4px rgba(47,47,47,0.12)',
          overflow: 'hidden',
          marginBottom: '12px',
          transition: 'all 200ms ease',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '14px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'white',
            transition: 'background 150ms ease'
          }}
          onClick={() => setIsExpanded(!isExpanded)}
          onMouseEnter={(e) => {
            if (!isExpanded) {
              e.currentTarget.style.background = '#fafafa';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
          }}
        >
          {/* Icon */}
          <div 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Icon size={20} style={{ color: iconColor }} />
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            <div 
              style={{
                fontSize: '14px',
                lineHeight: '18px',
                fontWeight: '600',
                color: 'var(--color-secondary-dark)',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '2px'
              }}
            >
              {title}
            </div>
            <div 
              style={{
                fontSize: '12px',
                lineHeight: '16px',
                fontWeight: '400',
                color: 'var(--color-secondary-light)',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Badge */}
          {badge && (
            <div 
              style={{
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif',
                background: badgeBg,
                color: badgeColor,
                flexShrink: 0
              }}
            >
              {badge}
            </div>
          )}

          {/* Expand Icon */}
          <div 
            style={{
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-secondary-lighter)',
              flexShrink: 0
            }}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div style={{ background: 'white' }}>
            {/* Select All */}
            <div 
              style={{
                padding: '10px 16px',
                borderBottom: '1px solid #e5e5e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#fafafa'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="checkbox"
                  checked={selectedItems.length === items.length && items.length > 0}
                  onChange={handleSelectAll}
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                    accentColor: 'var(--color-primary-main)'
                  }}
                />
                <span 
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--color-secondary-main)',
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer'
                  }}
                  onClick={handleSelectAll}
                >
                  Select all
                </span>
              </div>

              {selectedItems.length > 0 && (
                <button
                  onClick={() => {
                    if (onBulkAction) {
                      onBulkAction(selectedItemsData);
                    } else {
                      setIsEmailModalOpen(true);
                    }
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif',
                    border: 'none',
                    background: 'var(--color-primary-main)',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 1px 3px rgba(36, 133, 103, 0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--color-primary-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'var(--color-primary-main)';
                  }}
                >
                  <BulkActionIcon size={12} />
                  {bulkActionLabel}
                </button>
              )}
            </div>

            {/* Items */}
            <div>
              {items.map((item, index) => (
                <ActionTileItem
                  key={item.id}
                  company={item.company}
                  contract={item.contract}
                  expiryDate={item.expiryDate}
                  amount={item.amount}
                  contact={item.contact}
                  daysLeft={item.daysLeft}
                  actions={item.actions}
                  isSelected={selectedItems.includes(item.id)}
                  onSelect={(checked) => handleSelectItem(item.id, checked)}
                  showCheckbox={true}
                />
              ))}
            </div>

            {/* Footer for auto reminders */}
            {showAutoRemindersFooter && (
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '12px 16px',
                  background: 'white'
                }}
              >
                <button
                  onClick={() => setIsRenewalAlertsModalOpen(true)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif',
                    border: 'none',
                    background: 'rgba(118, 118, 118, 0.08)',
                    color: '#474747',
                    cursor: 'pointer',
                    transition: 'all 150ms ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(118, 118, 118, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(118, 118, 118, 0.08)';
                  }}
                >
                  Set auto reminders
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Email Modal */}
      <BulkEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        selectedTasks={selectedItemsData.map(item => ({
          companyName: item.company,
          recipientName: item.contact,
          recipientEmail: item.email || `${item.contact.toLowerCase().replace(' ', '.')}@${item.company.toLowerCase().replace(' ', '')}.com`
        }))}
        onSend={(emailData) => {
          console.log('Sending emails:', emailData);
          const count = selectedItems.length;
          setSelectedItems([]);
          setIsEmailModalOpen(false);
          if (onShowSnackbar) {
            onShowSnackbar(`${count} reminder${count !== 1 ? 's' : ''} sent successfully`);
          }
        }}
        defaultSubject={`Reminder: ${title}`}
        defaultBody={`Dear [Recipient Name],\n\nThis is a friendly reminder regarding your contract with [Company Name].\n\nPlease let us know if you have any questions or need assistance.\n\nBest regards,\nAsya`}
      />

      {/* Renewal Alerts Modal */}
      <RenewalAlertsModal
        isOpen={isRenewalAlertsModalOpen}
        onClose={() => setIsRenewalAlertsModalOpen(false)}
      />
    </>
  );
};

const ActionTiles = ({ onShowSnackbar }) => {
  const handleSendReminder = (company) => {
    console.log('Send reminder to:', company);
    if (onShowSnackbar) {
      onShowSnackbar(`Reminder sent to ${company}`);
    }
  };

  const tilesData = [
    {
      icon: Clock,
      iconColor: '#F88619',
      iconBg: '#FFF8F2',
      title: 'Renewing this month',
      subtitle: '6 contracts · $48,200 combined value',
      badge: '6 contracts',
      badgeColor: '#977338',
      badgeBg: '#FFFAF2',
      mainActionLabel: 'Send reminders',
      variant: 'warning',
      defaultExpanded: true,
      showAutoRemindersFooter: true,
      items: [
        {
          id: 'ren-1',
          company: 'Beta Systems',
          contract: 'Service agreement',
          expiryDate: 'Renews April 15',
          amount: '$12,500',
          contact: 'David Thompson',
          email: 'david@betasystems.com',
          actions: [
            { label: 'Snooze 3d', onClick: () => console.log('Snooze'), primary: false },
            { label: 'View document', onClick: () => console.log('View document'), primary: false },
            { label: 'Send reminder', onClick: () => handleSendReminder('Beta Systems'), primary: true }
          ]
        },
        {
          id: 'ren-2',
          company: 'Omega Partners',
          contract: 'Enterprise license',
          expiryDate: 'Renews April 10',
          amount: '$18,000',
          contact: 'Lisa Martinez',
          email: 'lisa@omegapartners.com',
          actions: [
            { label: 'Contact', onClick: () => console.log('Contact'), primary: false },
            { label: 'View document', onClick: () => console.log('View document'), primary: false },
            { label: 'Send reminder', onClick: () => handleSendReminder('Omega Partners'), primary: true }
          ]
        },
        {
          id: 'ren-3',
          company: 'Zenith Corp',
          contract: 'Multi-year partnership',
          expiryDate: 'Renews April 25',
          amount: '$8,200',
          contact: 'Robert Chen',
          email: 'robert@zenithcorp.com',
          actions: [
            { label: 'Schedule', onClick: () => console.log('Schedule'), primary: false },
            { label: 'View document', onClick: () => console.log('View document'), primary: false },
            { label: 'Send reminder', onClick: () => handleSendReminder('Zenith Corp'), primary: true }
          ]
        }
      ]
    },
    {
      icon: Clock,
      iconColor: '#E44E48',
      iconBg: '#FDF1F0',
      title: 'Expiring this week',
      subtitle: '2 contracts need immediate action',
      badge: '2 critical',
      badgeColor: '#B63E3A',
      badgeBg: '#FDF1F0',
      mainActionLabel: 'Send 2 reminders',
      variant: 'critical',
      defaultExpanded: false,
      items: [
        {
          id: 'exp-1',
          company: 'Tech Solutions',
          contract: 'Annual subscription',
          expiryDate: 'Expires tomorrow, March 27',
          amount: '$4,200/yr',
          contact: 'David Kim',
          email: 'david@techsolutions.com',
          daysLeft: { label: '1 day', critical: true },
          actions: [
            { label: 'Snooze 3d', onClick: () => console.log('Snooze'), primary: false },
            { label: 'View document', onClick: () => console.log('View document'), primary: false },
            { label: 'Send reminder', onClick: () => handleSendReminder('Tech Solutions'), primary: true }
          ]
        },
        {
          id: 'exp-2',
          company: 'Orion Systems',
          contract: 'Service contract',
          expiryDate: 'Expires in 5 days, March 31',
          amount: '$12,000/yr',
          contact: 'Sarah Johnson',
          email: 'sarah@orionsystems.com',
          daysLeft: { label: '5 days', critical: false },
          actions: [
            { label: 'Snooze 3d', onClick: () => console.log('Snooze'), primary: false },
            { label: 'View document', onClick: () => console.log('View document'), primary: false },
            { label: 'Send reminder', onClick: () => handleSendReminder('Orion Systems'), primary: true }
          ]
        }
      ]
    },
    {
      icon: Mail,
      iconColor: '#2167C6',
      iconBg: '#EDF3FB',
      title: 'Viewed but not signed',
      subtitle: '3 recipients opened the document — no signature yet',
      badge: '3 drop-offs',
      badgeColor: '#1A529E',
      badgeBg: '#EDF3FB',
      mainActionLabel: 'Follow up all',
      variant: 'info',
      defaultExpanded: false,
      items: [
        {
          id: 'sign-1',
          company: 'Acme Corp',
          contract: 'Annual agreement',
          expiryDate: 'Opened 3 days ago',
          amount: '$15,000',
          contact: 'Sarah Johnson',
          email: 'sarah@acmecorp.com',
          actions: [
            { label: 'Snooze 3d', onClick: () => console.log('Snooze'), primary: false },
            { label: 'View document', onClick: () => console.log('View document'), primary: false },
            { label: 'Send reminder', onClick: () => handleSendReminder('Acme Corp'), primary: true }
          ]
        },
        {
          id: 'sign-2',
          company: 'NextGen Tech',
          contract: 'Service agreement',
          expiryDate: 'Opened 5 days ago',
          amount: '$22,000',
          contact: 'Michael Chen',
          email: 'michael@nextgentech.com',
          actions: [
            { label: 'Snooze 3d', onClick: () => console.log('Snooze'), primary: false },
            { label: 'View document', onClick: () => console.log('View document'), primary: false },
            { label: 'Send reminder', onClick: () => handleSendReminder('NextGen Tech'), primary: true }
          ]
        },
        {
          id: 'sign-3',
          company: 'Delta Corp',
          contract: 'Contract modification',
          expiryDate: 'Opened yesterday',
          amount: '$8,500',
          contact: 'Finance Department',
          email: 'finance@deltacorp.com',
          actions: [
            { label: 'Snooze 3d', onClick: () => console.log('Snooze'), primary: false },
            { label: 'View document', onClick: () => console.log('View document'), primary: false },
            { label: 'Send reminder', onClick: () => handleSendReminder('Delta Corp'), primary: true }
          ]
        }
      ]
    },
    {
      icon: DollarSign,
      iconColor: '#9B51E0',
      iconBg: '#F5EFFC',
      title: 'High value contracts',
      subtitle: '4 contracts over $20,000 require attention',
      badge: '4 contracts',
      badgeColor: '#7A3FB8',
      badgeBg: '#F5EFFC',
      mainActionLabel: 'View in a list',
      variant: 'default',
      defaultExpanded: false,
      bulkActionLabel: 'View in a list',
      bulkActionIcon: List,
      onBulkAction: (selectedItems) => {
        console.log('View in list:', selectedItems);
      },
      items: [
        {
          id: 'high-1',
          company: 'Enterprise Solutions Inc',
          contract: 'Multi-year service agreement',
          expiryDate: 'Renews June 15, 2026',
          amount: '$125,000/yr',
          contact: 'Jennifer Walsh',
          email: 'jennifer@enterprisesolutions.com',
          actions: [
            { label: 'Renew', onClick: () => console.log('Renew'), primary: true },
            { label: 'View document', onClick: () => console.log('View document'), primary: false },
            { label: 'Contact', onClick: () => console.log('Contact'), primary: false }
          ]
        },
        {
          id: 'high-2',
          company: 'Global Tech Partners',
          contract: 'Enterprise license',
          expiryDate: 'Expires May 30, 2026',
          amount: '$85,000/yr',
          contact: 'Marcus Thompson',
          email: 'marcus@globaltechpartners.com',
          actions: [
            { label: 'Extend', onClick: () => console.log('Extend'), primary: true },
            { label: 'View document', onClick: () => console.log('View document'), primary: false },
            { label: 'Negotiate', onClick: () => console.log('Negotiate'), primary: false }
          ]
        },
        {
          id: 'high-3',
          company: 'Apex Industries',
          contract: 'Partnership agreement',
          expiryDate: 'Renews July 1, 2026',
          amount: '$67,500/yr',
          contact: 'Rachel Green',
          email: 'rachel@apexindustries.com',
          actions: [
            { label: 'Renew', onClick: () => console.log('Renew'), primary: true },
            { label: 'View document', onClick: () => console.log('View document'), primary: false },
            { label: 'Review', onClick: () => console.log('Review'), primary: false }
          ]
        },
        {
          id: 'high-4',
          company: 'Pinnacle Corp',
          contract: 'Strategic alliance',
          expiryDate: 'Expires April 20, 2026',
          amount: '$42,000/yr',
          contact: 'James Wilson',
          email: 'james@pinnaclecorp.com',
          daysLeft: { label: '25 days', critical: false },
          actions: [
            { label: 'Expire', onClick: () => console.log('Expire'), primary: false },
            { label: 'View document', onClick: () => console.log('View document'), primary: false },
            { label: 'Renew', onClick: () => console.log('Renew'), primary: true }
          ]
        }
      ]
    }
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h2 
          style={{
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: '600',
            color: 'var(--color-secondary-dark)',
            fontFamily: 'Inter, sans-serif',
            margin: 0
          }}
        >
          Priority actions
        </h2>
        <button
          onClick={() => console.log('Remove all priority actions')}
          style={{
            padding: '5px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
            border: '1px solid var(--color-tertiary-darker)',
            background: 'var(--color-basic-white)',
            color: 'var(--color-secondary-light)',
            cursor: 'pointer',
            transition: 'all 150ms ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--color-tertiary-light)';
            e.target.style.color = 'var(--color-secondary-dark)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'var(--color-basic-white)';
            e.target.style.color = 'var(--color-secondary-light)';
          }}
        >
          Remove all
        </button>
      </div>
      
      {tilesData.map((tile, index) => (
        <ActionTile
          key={index}
          icon={tile.icon}
          iconColor={tile.iconColor}
          iconBg={tile.iconBg}
          title={tile.title}
          subtitle={tile.subtitle}
          badge={tile.badge}
          badgeColor={tile.badgeColor}
          badgeBg={tile.badgeBg}
          mainActionLabel={tile.mainActionLabel}
          items={tile.items}
          variant={tile.variant}
          defaultExpanded={tile.defaultExpanded}
          onShowSnackbar={onShowSnackbar}
          showAutoRemindersFooter={tile.showAutoRemindersFooter}
          bulkActionLabel={tile.bulkActionLabel}
          bulkActionIcon={tile.bulkActionIcon}
          onBulkAction={tile.onBulkAction}
        />
      ))}
    </div>
  );
};

export default ActionTiles;
