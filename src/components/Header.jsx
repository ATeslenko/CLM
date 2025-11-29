import React from 'react';
import { SearchIcon, NotificationIcon, HelpIcon } from './Icons';
import Avatar from './Avatar';

const Header = () => {
  return (
    <header className="bg-white h-20 border-b border-gray-100 flex items-center px-15">
      <div className="flex-1 flex items-center gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-light w-5 h-5" />
            <input
              type="text"
              placeholder="Search documents"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md text-14 font-graphik-regular placeholder-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <NotificationIcon className="w-6 h-6 text-secondary-light" />
        </button>

        {/* Help */}
        <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <HelpIcon className="w-5 h-5 text-secondary-light" />
        </button>

        {/* User Profile */}
        <button className="p-1 hover:bg-gray-50 rounded-lg transition-colors">
          <Avatar 
            src="/images/User profile.png" 
            alt="User Profile" 
            size="sm" 
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
