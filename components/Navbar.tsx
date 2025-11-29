import React, { useState } from 'react';
import { BookOpen, Search, Menu, X, Home, Info, Library } from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  setPage: (page: Page) => void;
  activePage: Page;
}

const Navbar: React.FC<NavbarProps> = ({ setPage, activePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'الرئيسية', icon: Home, page: Page.HOME },
    { label: 'بحث متقدم', icon: Search, page: Page.SEARCH },
    { label: 'الكتب', icon: Library, page: Page.BOOK },
    { label: 'عن الموقع', icon: Info, page: Page.ABOUT },
  ];

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg border-b-4 border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-3" onClick={() => setPage(Page.HOME)}>
            <div className="bg-secondary p-2 rounded-lg text-primary">
              <BookOpen size={32} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-sans tracking-wide">جامع الأحاديث</h1>
              <p className="text-xs text-secondary/90 font-light">الموسوعة الشاملة للسنة النبوية</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 space-x-reverse">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setPage(item.page)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activePage === item.page
                      ? 'bg-secondary text-primary shadow-md transform scale-105'
                      : 'text-gray-300 hover:text-white hover:bg-primary/50'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-primary/95 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setPage(item.page);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${
                  activePage === item.page
                    ? 'bg-secondary text-primary'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;