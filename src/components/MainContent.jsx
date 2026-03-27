import React, { useState } from 'react';
import { PlusIcon, FilterIcon, ChevronDownIcon, SparkleIcon, FolderPlusIcon, ChevronRightIcon } from './Icons';
import DocumentsTable from './DocumentsTable';
import Badge from './Badge';

const MainContent = ({ importedDocuments = [], importedOrganizationSettings = null, currentTab, onTabChange, currentFolder, onFolderChange, onOpenDocumentModal, activeFilters = [], onFiltersChange }) => {
  // Reset folder when switching tabs
  React.useEffect(() => {
    onFolderChange(null);
  }, [currentTab, onFolderChange]);

  const handleRemoveFilter = (filterToRemove) => {
    onFiltersChange(activeFilters.filter(f => f !== filterToRemove));
  };

  const handleFolderClick = (folder) => {
    onFolderChange(folder);
  };

  const handleBackToAllDocuments = () => {
    onFolderChange(null);
  };

  const tabs = [
    { label: 'Recent', active: currentTab === 'Recent' },
    { label: 'All documents', active: currentTab === 'All documents' },
    { label: 'Created by me', active: currentTab === 'Created by me' },
    { label: 'Imported', active: currentTab === 'Imported', badge: 'NEW' },
    { label: 'Archived', active: currentTab === 'Archived' },
    { label: 'More', active: currentTab === 'More', badge: '6', hasDropdown: true }
  ];

  const filters = [
    'Date',
    'Status',
    'Amount',
    'Owner',
    'Recipients'
  ];

  const handleTabClick = (tabLabel) => {
    onTabChange(tabLabel);
  };

  return (
    <div className="w-full bg-white">
      <div className="p-15 max-w-none">
        {/* Page Header */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-24 font-graphik-bold text-secondary-dark">
                {currentFolder ? currentFolder.name : (currentTab === 'Imported' ? 'Imported' : 'All documents')}
              </h1>
            </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 text-14 font-graphik-semibold text-secondary-light hover:bg-gray-50 transition-colors">
                  <FolderPlusIcon className="w-6 h-6 text-[#767676]" />
                  New folder
                </button>
                <div className="flex rounded shadow-subtle overflow-hidden">
                  <button 
                    onClick={onOpenDocumentModal}
                    className="px-4 py-2.5 bg-brand-primary text-white text-14 font-graphik-semibold hover:bg-brand-primary/90 transition-colors flex items-center gap-2 h-10"
                  >
                    <PlusIcon className="w-6 h-6" />
                    Document
                  </button>
                  <button className="w-10 h-10 bg-brand-primary text-white border-l border-white/20 hover:bg-brand-primary/90 transition-colors flex items-center justify-center">
                    <ChevronDownIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
          </div>

          {/* Breadcrumbs (shown when in folder view) */}
          {currentFolder && (
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBackToAllDocuments}
                  className="text-14 font-graphik-regular text-secondary-light hover:text-brand-primary transition-colors"
                >
                  {currentTab === 'Imported' ? 'Imported' : 'All documents'}
                </button>
                {currentFolder.parentPath && currentFolder.parentPath.length > 0 && (
                  <>
                    {currentFolder.parentPath.map((parent, index) => (
                      <React.Fragment key={index}>
                        <ChevronRightIcon className="w-4 h-4 text-secondary-light" />
                        <span className="text-14 font-graphik-regular text-secondary-light">
                          {parent}
                        </span>
                      </React.Fragment>
                    ))}
                  </>
                )}
                <ChevronRightIcon className="w-4 h-4 text-secondary-light" />
                <span className="text-14 font-graphik-semibold text-secondary-dark">
                  {currentFolder.name}
                </span>
                <ChevronDownIcon className="w-4 h-4 text-secondary-light" />
              </div>
            </div>
          )}

          {/* Tabs (hide when in folder view) */}
          {!currentFolder && (
            <div className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {tabs.map((tab, index) => (
                  <div key={index} className="relative">
                    <button
                      onClick={() => handleTabClick(tab.label)}
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
          )}
        </div>

        {/* Filters Row (hide when in folder view) */}
        {!currentFolder && (
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

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex items-center gap-3 mt-4">
                {activeFilters.map((filter, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 12px',
                      background: 'var(--color-primary-lighter)',
                      border: '1px solid var(--color-primary-light)',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: 'var(--color-primary-dark)',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    <span>{filter.type}: {filter.value}</span>
                    <button
                      onClick={() => handleRemoveFilter(filter)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'var(--color-primary-dark)',
                        opacity: '0.7',
                        transition: 'opacity 150ms ease'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '1'}
                      onMouseLeave={(e) => e.target.style.opacity = '0.7'}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Documents Table */}
        <DocumentsTable 
          currentFolder={currentFolder}
          onFolderClick={handleFolderClick}
          importedDocuments={importedDocuments}
          importedOrganizationSettings={importedOrganizationSettings}
          currentTab={currentTab}
        />
      </div>
    </div>
  );
};

export default MainContent;
