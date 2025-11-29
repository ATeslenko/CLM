import React from 'react';

const StatusLabel = ({ type, children }) => {
  const getStatusStyles = () => {
    switch (type?.toLowerCase()) {
      case 'draft':
        return 'status-draft';
      case 'sent':
        return 'status-sent';
      case 'completed':
        return 'status-completed';
      case 'awaiting approval':
        return 'status-awaiting-approval';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-draft';
    }
  };

  return (
    <span className={`status-label ${getStatusStyles()}`}>
      {children || type}
    </span>
  );
};

export default StatusLabel;
