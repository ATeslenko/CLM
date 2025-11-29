import React from 'react';
import { PlusIcon, FilterIcon, ChevronDownIcon, SparkleIcon, FolderPlusIcon } from './Icons';
import DocumentsTable from './DocumentsTable';
import Badge from './Badge';

const MainContent = () => {
  const tabs = [
    { label: 'Recent', active: false },
    { label: 'All documents', active: true },
    { label: 'Created by me', active: false },
    { label: 'Imported', active: false, badge: 'NEW' },
    { label: 'Archived', active: false },
    { label: 'More', active: false, badge: '6', hasDropdown: true }
  ];

  const filters = [
    'Date',
    'Status',
    'Amount',
    'Owner',
    'Recipients'
  ];

  return (
    <div className="w-full bg-white">
      <div className="p-15 max-w-none">
        {/* Page Header */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-24 font-graphik-bold text-secondary-dark">
                All documents
              </h1>
            </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 text-14 font-graphik-semibold text-secondary-light hover:bg-gray-50 transition-colors">
                  <FolderPlusIcon className="w-6 h-6 text-[#767676]" />
                  New folder
                </button>
                <div className="flex rounded shadow-subtle overflow-hidden">
                  <button className="px-4 py-2.5 bg-brand-primary text-white text-14 font-graphik-semibold hover:bg-brand-primary/90 transition-colors flex items-center gap-2 h-10">
                    <PlusIcon className="w-6 h-6" />
                    Document
                  </button>
                  <button className="w-10 h-10 bg-brand-primary text-white border-l border-white/20 hover:bg-brand-primary/90 transition-colors flex items-center justify-center">
                    <ChevronDownIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {tabs.map((tab, index) => (
                  <div key={index} className="relative">
                    <button
                      className={`flex items-center gap-2 h-12 px-0 text-14 font-graphik-${tab.active ? 'semibold' : 'regular'} ${
                        tab.active ? 'text-secondary-dark border-b-2 border-brand-primary' : 'text-secondary-dark hover:text-secondary-dark/80'
                      } transition-colors`}
                    >
                      {tab.label}
                      {tab.badge && (
                        tab.badge === 'NEW' ? (
                          <span 
                            className="font-graphik-semibold uppercase"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '0px 4px',
                              width: '30px',
                              height: '16px',
                              background: '#EDF3FB',
                              borderRadius: '2px',
                              fontSize: '9px',
                              lineHeight: '11px',
                              color: '#1A529E',
                              flex: 'none',
                              order: 1,
                              flexGrow: 0
                            }}
                          >
                            {tab.badge}
                          </span>
                        ) : (
                          <Badge number={tab.badge} color="gray" size="sm" />
                        )
                      )}
                      {tab.hasDropdown && (
                        <PlusIcon className="w-6 h-6 text-secondary-light" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-1.5 text-13 font-graphik-semibold text-[#767676] hover:bg-gray-50 transition-colors">
                  <FilterIcon className="w-4 h-4 text-[#767676]" />
                  Filters
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 text-14 font-graphik-semibold text-brand-secondary hover:bg-purple-50 transition-colors rounded">
                  <SparkleIcon className="w-5 h-5 text-brand-secondary" />
                  Ask AI
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            {filters.map((filter, index) => (
              <button
                key={index}
                className="filter-btn flex items-center gap-2"
              >
                {filter}
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            ))}
            <button className="filter-btn flex items-center gap-2">
              More
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Documents Table */}
        <DocumentsTable />
      </div>
    </div>
  );
};

export default MainContent;
