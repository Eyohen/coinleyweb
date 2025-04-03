import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { 
  BellIcon, 
  CheckIcon,
  FunnelIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  UserIcon,
  CurrencyDollarIcon,
  TrashIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  
} from '@heroicons/react/24/outline';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'payment' | 'security' | 'alert' | 'account';
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
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
    },
    {
      id: 5,
      title: 'Payment Failed',
      message: 'Your payment of $75.00 to External Wallet has failed',
      time: '2 days ago',
      read: true,
      type: 'payment'
    },
    {
      id: 6,
      title: 'Security Update',
      message: 'We\'ve updated our security protocols to better protect your account',
      time: '3 days ago',
      read: true,
      type: 'security'
    },
    {
      id: 7,
      title: 'Price Alert',
      message: 'Ethereum price decreased by 3% in the last 24 hours',
      time: '4 days ago',
      read: true,
      type: 'alert'
    },
    {
      id: 8,
      title: 'Account Setting Change',
      message: 'Your email preferences have been updated',
      time: '5 days ago',
      read: true,
      type: 'account'
    },
    {
      id: 9,
      title: 'Payment Sent',
      message: 'You sent $120.00 in Ethereum to Jane Smith',
      time: '1 week ago',
      read: true,
      type: 'payment'
    },
    {
      id: 10,
      title: 'Security Recommendation',
      message: 'Enable two-factor authentication for added security',
      time: '1 week ago',
      read: true,
      type: 'security'
    }
  ]);

  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const itemsPerPage = 5;

  // Get notification type color and icon
  const getNotificationTypeInfo = (type: string) => {
    switch (type) {
      case 'payment':
        return {
          icon: CurrencyDollarIcon,
          colorClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
          iconColorClass: 'text-emerald-600 dark:text-emerald-400'
        };
      case 'security':
        return {
          icon: ShieldCheckIcon,
          colorClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
          iconColorClass: 'text-rose-600 dark:text-rose-400'
        };
      case 'alert':
        return {
          icon: BellIcon,
          colorClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
          iconColorClass: 'text-amber-600 dark:text-amber-400'
        };
      case 'account':
        return {
          icon: UserIcon,
          colorClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
          iconColorClass: 'text-blue-600 dark:text-blue-400'
        };
      default:
        return {
          icon: BellIcon,
          colorClass: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
          iconColorClass: 'text-gray-600 dark:text-gray-400'
        };
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    // Filter by type
    const matchesType = filterType === 'all' || notification.type === filterType;
    
    // Filter by read status
    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'unread' && !notification.read) ||
      (filterStatus === 'read' && notification.read);
    
    return matchesType && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const currentNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle marking notification as read
  const markAsRead = (id: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  // Handle marking notification as unread
  const markAsUnread = (id: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: false } 
          : notification
      )
    );
  };

  // Handle marking all notifications as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  // Handle clearing all notifications (in a real app, you might archive them instead)
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Handle deleting a notification
  const deleteNotification = (id: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  // Calculate unread counts for filter badge
  const unreadCount = notifications.filter(n => !n.read).length;
  const activeFilterCount = [
    filterType !== 'all',
    filterStatus !== 'all'
  ].filter(Boolean).length;

  // Animation keyframes and style definitions
  const animationStyles = `
    @keyframes fade-in-up {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes pop-in {
      0% {
        opacity: 0;
        transform: scale(0.95) translateY(20px);
      }
      50% {
        transform: scale(1.02) translateY(0);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    
    .animate-fade-in-up {
      animation: fade-in-up 0.6s ease-out forwards;
    }
    
    .animate-pop-in {
      animation: pop-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
    
    .animation-delay-350 {
      animation-delay: 0.35s;
    }
    
    .animation-delay-400 {
      animation-delay: 0.4s;
    }
    
    .animation-delay-450 {
      animation-delay: 0.45s;
    }
    
    .animation-delay-500 {
      animation-delay: 0.5s;
    }
  `;

  return (
    <DashboardLayout>
      <style>{animationStyles}</style>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 animate-fade-in-up opacity-0">
          <div className="flex items-center mb-4">
            <BellIcon className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage your notifications and alerts from the platform.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden animate-fade-in-up animation-delay-100 opacity-0">
          {/* Filters header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up animation-delay-150 opacity-0">
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white">
                    {unreadCount} Unread
                  </div>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredNotifications.length} Notifications
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setFilterOpen(!filterOpen)} 
                  className={`inline-flex items-center px-3 py-1.5 border rounded-md shadow-sm text-sm font-medium relative ${
                    activeFilterCount > 0
                      ? 'text-primary border-primary bg-primary/10 hover:bg-primary/20 dark:text-primary-400 dark:border-primary-400 dark:bg-primary-900/30'
                      : 'text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                >
                  <FunnelIcon className="h-4 w-4 mr-1.5" />
                  Filter
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                
                <button 
                  onClick={markAllAsRead}
                  disabled={!notifications.some(n => !n.read)}
                  className={`inline-flex items-center px-3 py-1.5 border rounded-md shadow-sm text-sm font-medium
                    ${notifications.some(n => !n.read) 
                      ? 'text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' 
                      : 'opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                >
                  <CheckIcon className="h-4 w-4 mr-1.5" />
                  Mark all as read
                </button>
                
                <button 
                  onClick={clearAllNotifications}
                  disabled={notifications.length === 0}
                  className={`inline-flex items-center px-3 py-1.5 border rounded-md shadow-sm text-sm font-medium 
                    ${notifications.length > 0 
                      ? 'text-red-700 dark:text-red-400 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30' 
                      : 'opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                >
                  <TrashIcon className="h-4 w-4 mr-1.5" />
                  Clear all
                </button>
              </div>
            </div>
            
            {/* Filter dropdown */}
            {filterOpen && (
              <div className="mt-4 p-4 border rounded-md border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 animate-fade-in-up animation-delay-200 opacity-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Filter by type
                    </label>
                    <select
                      value={filterType}
                      onChange={(e) => {
                        setFilterType(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="all">All Types</option>
                      <option value="payment">Payment</option>
                      <option value="security">Security</option>
                      <option value="alert">Alert</option>
                      <option value="account">Account</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Filter by status
                    </label>
                    <select
                      value={filterStatus}
                      onChange={(e) => {
                        setFilterStatus(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="all">All Statuses</option>
                      <option value="read">Read</option>
                      <option value="unread">Unread</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications list */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700 animate-fade-in-up animation-delay-250 opacity-0">
            {currentNotifications.length > 0 ? (
              currentNotifications.map((notification, index) => {
                const typeInfo = getNotificationTypeInfo(notification.type);
                const TypeIcon = typeInfo.icon;
                
                return (
                  <div 
                    key={notification.id} 
                    className={`p-6 ${
                      notification.read 
                        ? 'hover:bg-gray-50 dark:hover:bg-gray-700' 
                        : 'hover:bg-blue-100 dark:hover:bg-blue-900/20'
                      } animate-fade-in-up opacity-0 ${
                      notification.read ? '' : 'border-l-4 border-primary bg-blue-50 dark:bg-blue-900/10'
                    }`}
                    style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                        !notification.read 
                          ? `ring-2 ring-primary ${typeInfo.colorClass}` 
                          : typeInfo.colorClass
                      }`}>
                        <TypeIcon className="h-5 w-5" />
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className={`text-sm ${notification.read ? 'font-medium' : 'font-bold'} text-gray-900 dark:text-white`}>
                              {notification.title}
                              {!notification.read && (
                                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white">
                                  New
                                </span>
                              )}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              {notification.message}
                            </p>
                            <p className={`mt-1 text-xs ${notification.read ? 'text-gray-500 dark:text-gray-500' : 'text-primary dark:text-primary font-medium'}`}>
                              {notification.time}
                            </p>
                          </div>
                          
                          <div className="ml-4 flex-shrink-0 flex space-x-2">
                            {notification.read ? (
                              <button
                                onClick={() => markAsUnread(notification.id)}
                                className="bg-white dark:bg-gray-700 rounded-md text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                title="Mark as unread"
                              >
                                <ArrowPathIcon className="h-5 w-5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="bg-white dark:bg-gray-700 rounded-md text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                title="Mark as read"
                              >
                                <CheckCircleIcon className="h-5 w-5" />
                              </button>
                            )}
                            
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="bg-white dark:bg-gray-700 rounded-md text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              title="Delete notification"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center animate-fade-in-up animation-delay-300 opacity-0">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700">
                  <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" aria-hidden="true" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No notifications</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {notifications.length === 0 
                    ? "You don't have any notifications at the moment." 
                    : "No notifications match your current filters."}
                </p>
              </div>
            )}
          </div>

          {/* Pagination controls */}
          {filteredNotifications.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between animate-fade-in-up animation-delay-400 opacity-0">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Showing <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredNotifications.length)}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredNotifications.length)}</span> of <span className="font-medium">{filteredNotifications.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page
                            ? 'z-10 bg-primary border-primary text-white dark:bg-primary dark:border-primary'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications; 