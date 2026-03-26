import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import GmailImportModal from './components/GmailImportModal';
import GetStartedModal from './components/GetStartedModal';
import StatsSection from './components/StatsSection';
import PriorityTasks from './components/PriorityTasks';
import RoutinesSection from './components/RoutinesSection';
import { PlusIcon, ChevronDownIcon } from './components/Icons';

function App() {
  const [isGmailImportModalOpen, setIsGmailImportModalOpen] = useState(false);
  const [isGetStartedModalOpen, setIsGetStartedModalOpen] = useState(false);
  const [importedDocuments, setImportedDocuments] = useState([]);
  const [importedOrganizationSettings, setImportedOrganizationSettings] = useState(null);
  const [currentTab, setCurrentTab] = useState('All documents');
  const [currentFolder, setCurrentFolder] = useState(null);
  const [currentView, setCurrentView] = useState('Home');
  const [priorityTasksTab, setPriorityTasksTab] = useState('urgent');

  const handleOpenGmailImport = () => {
    setIsGmailImportModalOpen(true);
  };

  const handleCloseGmailImport = () => {
    setIsGmailImportModalOpen(false);
  };

  const handleOpenGetStarted = () => {
    setIsGetStartedModalOpen(true);
  };

  const handleCloseGetStarted = () => {
    setIsGetStartedModalOpen(false);
  };

  const handleImportComplete = (documents, organizationSettings) => {
    // Add imported documents to state with organization metadata
    const documentsWithImportInfo = documents.map(doc => ({
      ...doc,
      isImported: true,
      importDate: new Date().toISOString()
    }));
    
    setImportedDocuments(prev => [...prev, ...documentsWithImportInfo]);
    setImportedOrganizationSettings(organizationSettings);
    
    // Reset folder navigation and switch to imported tab root
    setCurrentFolder(null);
    setCurrentTab('Imported');
  };

  const handleStatClick = (tabId) => {
    setPriorityTasksTab(tabId);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar - Fixed position */}
      <div className="w-60 flex-shrink-0">
        <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Full width of remaining space */}
        <div className="w-full z-20">
          <Header />
        </div>
        
        {/* Main content - Scrollable, full width */}
        <main className="flex-1 overflow-auto" style={{ background: '#f4f4f4' }}>
          {currentView === 'Home' && (
            <div className="w-full p-15">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-24 font-graphik-bold text-secondary-dark">
                  Welcome back, Asya
                </h1>
                <div className="flex rounded shadow-subtle overflow-hidden">
                  <button 
                    onClick={handleOpenGetStarted}
                    className="px-4 py-2.5 text-white text-14 font-graphik-semibold transition-colors flex items-center gap-2 h-10"
                    style={{ 
                      background: 'var(--color-primary-main)',
                      borderRadius: '4px 0 0 4px'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'var(--color-primary-dark)'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--color-primary-main)'}
                  >
                    <PlusIcon className="w-6 h-6" />
                    Document
                  </button>
                  <button 
                    className="w-10 h-10 text-white border-l border-white/20 transition-colors flex items-center justify-center"
                    style={{ 
                      background: 'var(--color-primary-main)',
                      borderRadius: '0 4px 4px 0'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'var(--color-primary-dark)'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--color-primary-main)'}
                  >
                    <ChevronDownIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <StatsSection onStatClick={handleStatClick} />
              <PriorityTasks activeTab={priorityTasksTab} onTabChange={setPriorityTasksTab} />
              <RoutinesSection />
            </div>
          )}
          
          {currentView === 'Documents' && (
            <MainContent 
              importedDocuments={importedDocuments}
              importedOrganizationSettings={importedOrganizationSettings}
              currentTab={currentTab}
              onTabChange={setCurrentTab}
              currentFolder={currentFolder}
              onFolderChange={setCurrentFolder}
              onOpenDocumentModal={handleOpenGetStarted}
            />
          )}
        </main>
      </div>

      {/* Get Started Modal */}
      <GetStartedModal
        isOpen={isGetStartedModalOpen}
        onClose={handleCloseGetStarted}
        onOpenGmailImport={handleOpenGmailImport}
      />

      {/* Gmail Import Modal */}
      <GmailImportModal
        isOpen={isGmailImportModalOpen}
        onClose={handleCloseGmailImport}
        onImportComplete={handleImportComplete}
      />
    </div>
  );
}

export default App;
