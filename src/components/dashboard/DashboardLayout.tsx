import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  CreditCardIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  Cog6ToothIcon, 
  BellIcon, 
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  ShieldCheckIcon,
  UsersIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  // const {merchant, logout} = useAuth();
  const {merchant} = useAuth();

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Payment Received',
      message: 'You received $250.00 in Bitcoin',
      time: '5 minutes ago',
      read: false,
      type: 'payment'
    },
    {
      id: 2,
      title: 'New Login',
      message: 'New login detected from Chrome on Windows',
      time: '1 hour ago',
      read: false,
      type: 'security'
    },
    {
      id: 3,
      title: 'Price Alert',
      message: 'Bitcoin price increased by 5% in the last 24 hours',
      time: '3 hours ago',
      read: true,
      type: 'alert'
    },
    {
      id: 4,
      title: 'Account Verified',
      message: 'Your account verification is complete',
      time: '1 day ago',
      read: true,
      type: 'account'
    }
  ]);

  // Get unread notification count
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({
        ...notification,
        read: true
      }))
    );
  };

  // Mark single notification as read
  const markAsRead = (id: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc.)
    navigate('/login');
  };

  // Toggle desktop sidebar
  const toggleDesktopSidebar = () => {
    setDesktopSidebarOpen(!desktopSidebarOpen);
  };

  // Navigate to page without expanding sidebar
  const navigateToPage = (href: string) => {
    navigate(href);
  };

  // Main navigation items
  const mainNavigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Transactions', href: '/dashboard/transactions', icon: CurrencyDollarIcon },
    { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
    { name: 'Payments', href: '/dashboard/payments', icon: CreditCardIcon },
    { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  ];

  // Preferences navigation items
  const preferencesNavigation: NavigationItem[] = [
    { name: 'Administrators', href: '/dashboard/administrators', icon: UsersIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Get notification type color
  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'security':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400';
      case 'alert':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'account':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Animation keyframes and style definitions
  const animationStyles = `
    @keyframes fade-in-up {
      0% {
        opacity: 0;
        transform: translateY(10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes pop-in {
      0% {
        opacity: 0;
        transform: scale(0.95);
      }
      50% {
        transform: scale(1.02);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes badge-bounce {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.15);
      }
    }
    
    .animate-fade-in-up {
      animation: fade-in-up 0.3s ease-out forwards;
    }
    
    .animate-pop-in {
      animation: pop-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    .animate-badge-bounce {
      animation: badge-bounce 1.5s ease-in-out infinite;
    }
    
    .animation-delay-50 {
      animation-delay: 0.05s;
    }
    
    .animation-delay-100 {
      animation-delay: 0.1s;
    }
    
    .animation-delay-150 {
      animation-delay: 0.15s;
    }
    
    .animation-delay-200 {
      animation-delay: 0.2s;
    }
    
    .animation-delay-250 {
      animation-delay: 0.25s;
    }
    
    .animation-delay-300 {
      animation-delay: 0.3s;
    }
  `;

  // Render navigation items
  const renderNavigationItems = (items: NavigationItem[], isMobile: boolean) => {
    return items.map((item) => {
      // For mobile view or expanded desktop view, use regular Link
      if (isMobile || desktopSidebarOpen) {
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`group flex items-center px-2 py-2 ${isMobile ? 'text-base' : 'text-sm'} font-medium rounded-md ${
              isActive(item.href)
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <item.icon
              className={`${isMobile ? 'mr-4 h-6 w-6' : 'mr-3 h-5 w-5'} ${
                isActive(item.href) ? 'text-white' : 'text-gray-500 dark:text-gray-400'
              }`}
            />
            <span>{item.name}</span>
          </Link>
        );
      }
      
      // For collapsed desktop view, use button with onClick handler
      return (
        <div key={item.name} className="relative">
          <button
            onClick={() => navigateToPage(item.href)}
            onMouseEnter={() => setActiveTooltip(item.name)}
            onMouseLeave={() => setActiveTooltip(null)}
            className={`w-full flex items-center justify-center px-2 py-2 text-sm font-medium rounded-md ${
              isActive(item.href)
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <item.icon
              className={`h-5 w-5 ${
                isActive(item.href) ? 'text-white' : 'text-gray-500 dark:text-gray-400'
              }`}
            />
          </button>
          
          {/* Tooltip for collapsed view */}
          {activeTooltip === item.name && (
            <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 z-10">
              <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                {item.name}
              </div>
              <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <style>{animationStyles}</style>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <img 
                src={isDarkMode 
                  ? "https://nativebrands.co/coinley-logo-light.svg" 
                  : "https://nativebrands.co/coinley-logo-dark.svg"} 
                alt="Coinley Logo" 
                className="h-8"
              />
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pt-5 pb-4">
            <nav className="px-2">
              {/* MAIN section - Mobile */}
              <div className="mb-4">
                <h3 className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Main
                </h3>
                <div className="mt-2 space-y-1">
                  {renderNavigationItems(mainNavigation, true)}
                </div>
              </div>
              
              {/* PREFERENCES section - Mobile */}
              <div className="mb-4">
                <h3 className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Preferences
                </h3>
                <div className="mt-2 space-y-1">
                  {renderNavigationItems(preferencesNavigation, true)}
                  
                  {/* Profile Settings - Mobile */}
                  <Link
                    to="/dashboard/profile"
                    className="w-full group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <UserCircleIcon className="mr-4 h-6 w-6 text-gray-500 dark:text-gray-400" />
                    Profile Settings
                  </Link>
                  
                  {/* Logout button - Mobile */}
                  <button
                    onClick={handleLogout}
                    className="w-full group flex items-center px-2 py-2 text-base font-medium rounded-md bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                  >
                    <ArrowRightOnRectangleIcon className="mr-4 h-6 w-6 text-red-500 dark:text-red-400" />
                    Logout
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col ${desktopSidebarOpen ? 'lg:w-64' : 'lg:w-20'} transition-all duration-300`}>
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 shadow">
          <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            {desktopSidebarOpen ? (
              <img 
                src={isDarkMode 
                  ? "https://nativebrands.co/coinley-logo-light.svg" 
                  : "https://nativebrands.co/coinley-logo-dark.svg"} 
                alt="Coinley Logo" 
                className="h-8"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                C
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="flex-1 px-2">
              {/* MAIN section - Desktop */}
              <div className="mb-8">
                {desktopSidebarOpen && (
                  <h3 className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Main
                  </h3>
                )}
                <div className={`${desktopSidebarOpen ? 'mt-2' : 'mt-6'} space-y-1`}>
                  {renderNavigationItems(mainNavigation, false)}
                </div>
              </div>
              
              {/* PREFERENCES section - Desktop */}
              <div className="mb-4">
                {desktopSidebarOpen && (
                  <h3 className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Preferences
                  </h3>
                )}
                <div className="mt-2 space-y-1">
                  {renderNavigationItems(preferencesNavigation, false)}
                  
                  {/* Profile Settings - Desktop */}
                  <div className="relative">
                    <Link
                      to="/dashboard/profile"
                      className={`w-full group flex ${desktopSidebarOpen ? 'justify-start' : 'justify-center'} items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 ${
                        isActive('/dashboard/profile') ? 'bg-primary text-white' : ''
                      }`}
                      onMouseEnter={() => !desktopSidebarOpen && setActiveTooltip('Profile Settings')}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <UserCircleIcon className={`${desktopSidebarOpen ? 'mr-3' : ''} h-5 w-5 ${
                        isActive('/dashboard/profile') ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                      }`} />
                      {desktopSidebarOpen && "Profile Settings"}
                    </Link>
                    
                    {/* Tooltip for profile in collapsed view */}
                    {!desktopSidebarOpen && activeTooltip === 'Profile Settings' && (
                      <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 z-10">
                        <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                          Profile Settings
                        </div>
                        <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Logout button - Desktop */}
                  <div className="relative">
                    <button
                      onClick={handleLogout}
                      onMouseEnter={() => !desktopSidebarOpen && setActiveTooltip('Logout')}
                      onMouseLeave={() => setActiveTooltip(null)}
                      className={`w-full group flex ${desktopSidebarOpen ? 'justify-start' : 'justify-center'} items-center px-2 py-2 text-sm font-medium rounded-md bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30`}
                    >
                      <ArrowRightOnRectangleIcon className={`${desktopSidebarOpen ? 'mr-3' : ''} h-5 w-5 text-red-500 dark:text-red-400`} />
                      {desktopSidebarOpen && "Logout"}
                    </button>
                    
                    {/* Tooltip for logout in collapsed view */}
                    {!desktopSidebarOpen && activeTooltip === 'Logout' && (
                      <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 z-10">
                        <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                          Logout
                        </div>
                        <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`${desktopSidebarOpen ? 'lg:pl-64' : 'lg:pl-20'} flex flex-col flex-1 transition-all duration-300`}>
        {/* Top navigation */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <button
                type="button"
                className="mr-3 p-1 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 hidden lg:block"
                onClick={toggleDesktopSidebar}
                aria-label={desktopSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <div className="flex items-center">
                {/* Mobile logo - visible only on mobile */}
                <div className="block lg:hidden">
                  <img 
                    src={isDarkMode 
                      ? "https://nativebrands.co/coinley-logo-light.svg" 
                      : "https://nativebrands.co/coinley-logo-dark.svg"} 
                    alt="Coinley Logo" 
                    className="h-8"
                  />
                </div>
                {/* Page title - visible only on desktop */}
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white hidden lg:block">Dashboard</h1>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {/* Notification dropdown */}
              <div className="relative" ref={notificationRef}>
                <button
                  type="button"
                  className="p-1 rounded-full text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 relative"
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setUserMenuOpen(false);
                  }}
                >
                  <BellIcon className="h-6 w-6" />
                  {/* Notification badge */}
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] text-[11px] font-bold rounded-full bg-primary text-white ring-2 ring-white dark:ring-gray-800 animate-badge-bounce">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notification dropdown panel */}
                {notificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-screen max-w-[90vw] sm:w-80 sm:max-w-[380px] rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none animate-pop-in opacity-0">
                    <div className="py-2 px-3 sm:px-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center animate-fade-in-up animation-delay-25 opacity-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                      {unreadCount > 0 ? (
                        <button 
                          className="text-xs text-primary hover:opacity-80 dark:text-primary dark:hover:opacity-80" 
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 dark:text-gray-500">No new notifications</span>
                      )}
                    </div>
                    <div className="max-h-[calc(70vh-100px)] sm:max-h-96 overflow-y-auto">
                      {notifications.map((notification, index) => (
                        <div 
                          key={notification.id} 
                          className={`px-3 sm:px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 animate-fade-in-up opacity-0 ${
                            notification.read 
                              ? 'border-l-transparent' 
                              : 'border-l-4 border-primary bg-purple-50 dark:bg-purple-900/10'
                          }`}
                          style={{ animationDelay: `${0.01 + index * 0.005}s` }}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start">
                            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center animate-pop-in opacity-0 ${getNotificationTypeColor(notification.type)}`}
                                style={{ animationDelay: `${0.015 + index * 0.005}s` }}>
                              {notification.type === 'payment' && <CurrencyDollarIcon className="h-4 w-4" />}
                              {notification.type === 'security' && <ShieldCheckIcon className="h-4 w-4" />}
                              {notification.type === 'alert' && <BellIcon className="h-4 w-4" />}
                              {notification.type === 'account' && <UserIcon className="h-4 w-4" />}
                            </div>
                            <div className="ml-3 w-0 flex-1">
                              <div className="flex justify-between items-start">
                                <p className={`text-sm font-medium ${notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <span className="ml-2 flex-shrink-0 h-2 w-2 rounded-full bg-primary"></span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {notification.message}
                              </p>
                              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="py-2 px-3 sm:px-4 border-t border-gray-200 dark:border-gray-700 text-center animate-fade-in-up animation-delay-300 opacity-0">
                      <Link to="/dashboard/notifications" className="text-xs font-medium text-primary hover:opacity-80 dark:text-primary dark:hover:opacity-80 py-1 px-2 inline-block">
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={toggleTheme}
                className="p-1 rounded-full text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {isDarkMode ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </button>
              
              {/* User menu dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  className="max-w-xs rounded-full flex items-center text-sm focus:outline-none"
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setNotificationsOpen(false);
                  }}
                >
                  <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </button>
                
                {/* User menu dropdown panel */}
                {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in-up opacity-0">
                    <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-50 opacity-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{merchant?.businessName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{merchant?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center animate-fade-in-up animation-delay-100 opacity-0"
                      >
                        <UserIcon className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        Your Profile
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center animate-fade-in-up animation-delay-150 opacity-0"
                      >
                        <Cog6ToothIcon className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center animate-fade-in-up animation-delay-200 opacity-0"
                      >
                        <ArrowRightOnRectangleIcon className="mr-3 h-4 w-4 text-red-500 dark:text-red-400" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 pb-8">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 