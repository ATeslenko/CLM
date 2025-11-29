import React from 'react';
import { DocumentPortraitIcon, ChevronDownIcon } from './Icons';
import StatusLabel from './StatusLabel';
import Avatar from './Avatar';

const DocumentsTable = () => {
  const documents = [
    {
      id: 1,
      name: 'Proposal for Kraftwerk Events',
      participants: 'Will Holland, Mariel Stacey',
      status: 'Draft',
      amount: '$4,250.00',
      created: 'May 21, 2024',
      avatar: '/images/4.png'
    },
    {
      id: 2,
      name: 'Equipment Purchase Proposal for Tresor Media',
      participants: 'Emily Gold, Nathan Howard',
      status: 'Sent',
      amount: '$9,780.00',
      created: 'Nov 2, 2024',
      avatar: '/images/2.png'
    },
    {
      id: 3,
      name: 'Non-Disclosure Agreement for Brilliant Moments Inc.',
      participants: 'Mariel Stacey',
      status: 'Completed',
      amount: '',
      created: 'Jan 10, 2025',
      avatar: '/images/1.png'
    },
    {
      id: 4,
      name: 'Equipment Purchase Proposal for Captured Moments',
      participants: 'Andreya Triana, Will Holland',
      status: 'Awaiting approval',
      amount: '$6,560.00',
      created: 'Jan 10, 2025',
      avatar: '/images/3.png'
    },
    {
      id: 5,
      name: 'Non-Disclosure Agreement for Brilliant Moments Inc.',
      participants: 'Andreya Triana, Will Holland',
      status: 'Rejected',
      amount: '',
      created: 'Jan 10, 2025',
      avatar: '/images/4.png'
    },
    {
      id: 6,
      name: 'Equipment Purchase Proposal for Tresor Media',
      participants: 'Emily Gold, Nathan Howard',
      status: 'Sent',
      amount: '$9,780.00',
      created: 'Nov 2, 2024',
      avatar: '/images/2.png'
    }
  ];

  return (
    <div className="bg-white">
      {/* Table Header */}
      <div className="flex items-center h-10 border-b border-gray-100 text-13 font-graphik-regular text-[#767676]">
        <div className="flex-1 min-w-0 px-0 flex items-center">
          Name
        </div>
        <div className="w-40 flex items-center">
          Status
        </div>
        <div className="w-32 flex items-center justify-end">
          Amount
        </div>
        <div className="w-40 flex items-center ml-6">
          Created
        </div>
      </div>

      {/* Table Body */}
      <div>
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center h-17 border-b border-gray-50 hover:bg-gray-25 transition-colors">
            {/* Document Icon + Name Column */}
            <div className="flex-1 min-w-0 flex items-center">
              <div className="w-12 flex justify-center">
                <DocumentPortraitIcon className="w-6 h-6 text-secondary-light" />
              </div>
              <div className="flex-1 pr-3 min-w-0">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-graphik-semibold text-14 text-secondary-dark truncate">
                    {doc.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-13 font-graphik-regular text-secondary-dark truncate">
                    {doc.participants}
                  </span>
                  <ChevronDownIcon className="w-4 h-4 text-secondary-light flex-shrink-0" />
                </div>
              </div>
            </div>

            {/* Status Column */}
            <div className="w-40 flex items-center">
              <StatusLabel type={doc.status} />
            </div>

            {/* Amount Column */}
            <div className="w-32 flex items-center justify-end">
              <span className="text-13 font-graphik-regular text-secondary-dark">
                {doc.amount || '\u00A0'}
              </span>
            </div>

            {/* Created Column */}
            <div className="w-40 flex items-center gap-2 ml-6">
              <Avatar src={doc.avatar} alt="User avatar" size="sm" />
              <span className="text-13 font-graphik-regular text-secondary-dark">
                {doc.created}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsTable;
