import React from 'react';
import {
  WorkspaceIcon,
  HomeIcon,
  DocumentIcon,
  TemplateIcon,
  ContactsIcon,
  MoreIcon,
  ExtensionsIcon,
  DiscoverIcon,
  InviteIcon,
  SettingsIcon,
  ChevronDownIcon
} from './Icons';

const Sidebar = () => {
  const mainNavItems = [
    { icon: HomeIcon, label: 'Home', active: false },
    { icon: DocumentIcon, label: 'Documents', active: true },
    { icon: TemplateIcon, label: 'Templates', active: false },
    { icon: ContactsIcon, label: 'Contacts', active: false },
    { icon: MoreIcon, label: 'More', active: false },
  ];

  const bottomNavItems = [
    { icon: DiscoverIcon, label: 'Discover' },
    { icon: InviteIcon, label: 'Invite users' },
    { icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <div className="w-full bg-surface-primary h-full flex flex-col">
      {/* Workspace Header */}
      <div className="p-4 pb-10">
        <div className="flex items-center gap-1">
          <WorkspaceIcon />
          <div className="flex-1 flex items-center justify-between p-2 hover:bg-white hover:bg-opacity-50 rounded-sm transition-colors cursor-pointer">
            <div className="flex flex-col">
              <div className="font-graphik-bold text-14 text-secondary-dark leading-8">
                Acme Sales
              </div>
              <div className="font-graphik-semibold text-9 text-secondary-light uppercase leading-normal">
                Sales • 3 members
              </div>
            </div>
            <ChevronDownIcon className="w-3 h-3 text-secondary-light" />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-4">
        <nav className="space-y-0">
          {mainNavItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                className={`nav-item ${item.active ? 'active' : ''}`}
                style={item.active ? {
                  backgroundColor: 'white',
                  boxShadow: '0px 0px 1px 0px rgba(47,47,47,0.04), 0px 1px 4px 0px rgba(47,47,47,0.12)'
                } : {}}
              >
                <IconComponent className={`w-5 h-5 mr-3 ${item.active ? 'text-[#1D6A52]' : 'text-[#474747]'}`} />
                <span className={item.active ? 'text-secondary-dark' : 'text-secondary-dark'}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Extensions Section */}
        <div className="mt-6">
          <button className="nav-item">
            <ExtensionsIcon className="w-5 h-5 mr-3 text-[#474747]" />
            <span>Extensions</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="px-4 pb-4">
        <nav className="space-y-0">
          {bottomNavItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                className="nav-item"
              >
                <IconComponent className="w-5 h-5 mr-3 text-[#474747]" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
