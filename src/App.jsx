import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar - Fixed position */}
      <div className="w-60 flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Full width of remaining space */}
        <div className="w-full z-20">
          <Header />
        </div>
        
        {/* Main content - Scrollable, full width */}
        <main className="flex-1 overflow-auto">
          <MainContent />
        </main>
      </div>
    </div>
  );
}

export default App;
