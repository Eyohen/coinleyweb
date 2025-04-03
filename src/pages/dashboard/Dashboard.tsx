// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   ArrowUpIcon, 
//   ArrowDownIcon, 
//   CurrencyDollarIcon, 
//   CreditCardIcon, 
//   UsersIcon, 
//   ClockIcon,
//   ExclamationTriangleIcon,
//   ArrowRightIcon,
//   CheckCircleIcon,
//   ClockIcon as ClockIconSolid,
//   XCircleIcon,
//   EyeIcon,
//   ClipboardDocumentIcon,
//   XMarkIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon as ChevronRightIconOutline,
//   MagnifyingGlassIcon,
//   FunnelIcon,
//   DocumentDuplicateIcon,
//   ArrowDownTrayIcon
// } from '@heroicons/react/24/outline';
// import DashboardLayout from '../../components/dashboard/DashboardLayout';
// import Toast from '../../components/common/Toast';
// import axios, { AxiosError } from 'axios';
// import { useAuth } from '../../context/AuthContext';
// import { URL } from '../../url';

// const Dashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
//   const [currentStatIndex, setCurrentStatIndex] = useState(0);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [toastType, setToastType] = useState<'success' | 'error'>('success');

//   // Mock data for statistics
//   const stats = [
//     {
//       name: 'Total Revenue',
//       value: '$12,345.67',
//       change: '+12.5%',
//       isIncrease: true,
//       icon: CurrencyDollarIcon,
//       iconColor: 'text-emerald-500 dark:text-emerald-400',
//       bgColor: 'bg-emerald-100/50 dark:bg-emerald-900/20',
//       textColor: 'text-emerald-600 dark:text-emerald-400',
//     },
//     {
//       name: 'Transactions',
//       value: '1,234',
//       change: '+8.2%',
//       isIncrease: true,
//       icon: CreditCardIcon,
//       iconColor: 'text-blue-500 dark:text-blue-400',
//       bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
//       textColor: 'text-blue-600 dark:text-blue-400',
//     },
//     {
//       name: 'Customers',
//       value: '567',
//       change: '+5.3%',
//       isIncrease: true,
//       icon: UsersIcon,
//       iconColor: 'text-violet-500 dark:text-violet-400',
//       bgColor: 'bg-violet-100/50 dark:bg-violet-900/20',
//       textColor: 'text-violet-600 dark:text-violet-400',
//     },
//     {
//       name: 'Avg. Transaction',
//       value: '$21.45',
//       change: '-2.3%',
//       isIncrease: false,
//       icon: ClockIcon,
//       iconColor: 'text-amber-500 dark:text-amber-400',
//       bgColor: 'bg-amber-100/50 dark:bg-amber-900/20',
//       textColor: 'text-amber-600 dark:text-amber-400',
//     },
//   ];

//   // Navigate to next stat in carousel
//   const nextStat = () => {
//     setCurrentStatIndex((prevIndex) => (prevIndex === stats.length - 1 ? 0 : prevIndex + 1));
//   };

//   // Navigate to previous stat in carousel
//   const prevStat = () => {
//     setCurrentStatIndex((prevIndex) => (prevIndex === 0 ? stats.length - 1 : prevIndex - 1));
//   };

//   // Mock data for recent transactions
//   const recentTransactions = [
//     {
//       id: 1,
//       customer: 'John Doe',
//       amount: '$125.00',
//       status: 'Completed',
//       date: '2023-06-01',
//       currency: 'BTC',
//       txHash: '0x3a1b2c3d4e5f...',
//       statusColor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
//     },
//     {
//       id: 2,
//       customer: 'Jane Smith',
//       amount: '$75.50',
//       status: 'Pending',
//       date: '2023-06-01',
//       currency: 'ETH',
//       txHash: '0x7a8b9c0d1e2f...',
//       statusColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
//     },
//     {
//       id: 3,
//       customer: 'Robert Johnson',
//       amount: '$250.00',
//       status: 'Completed',
//       date: '2023-05-31',
//       currency: 'USDT',
//       txHash: '0xf1e2d3c4b5a6...',
//       statusColor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
//     },
//     {
//       id: 4,
//       customer: 'Emily Davis',
//       amount: '$42.75',
//       status: 'Failed',
//       date: '2023-05-31',
//       currency: 'BTC',
//       txHash: '0x9a8b7c6d5e4f...',
//       statusColor: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
//     },
//     {
//       id: 5,
//       customer: 'Michael Wilson',
//       amount: '$180.25',
//       status: 'Completed',
//       date: '2023-05-30',
//       currency: 'ETH',
//       txHash: '0xb1a2c3d4e5f6...',
//       statusColor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
//     },
//   ];

//   // Mock for account setup status
//   const accountSetupStatus = {
//     isComplete: false,
//     pendingSteps: [
//       { id: 1, name: 'Verify your identity', link: '/dashboard/profile/verify' },
//       { id: 2, name: 'Set up two-factor authentication', link: '/dashboard/profile/security' },
//       { id: 3, name: 'Connect a payment method', link: '/dashboard/payments/methods' }
//     ]
//   };

//   // Helper function to get status badge details
//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'Completed':
//         return {
//           icon: CheckCircleIcon,
//           colorClass: 'bg-green-100 border-green-500 text-green-800 dark:bg-green-800/30 dark:border-green-500 dark:text-green-400',
//           iconColorClass: 'text-green-600 dark:text-green-400'
//         };
//       case 'Pending':
//         return {
//           icon: ClockIconSolid,
//           colorClass: 'bg-yellow-100 border-yellow-500 text-yellow-800 dark:bg-yellow-800/30 dark:border-yellow-500 dark:text-yellow-400',
//           iconColorClass: 'text-yellow-600 dark:text-yellow-400'
//         };
//       case 'Failed':
//         return {
//           icon: XCircleIcon,
//           colorClass: 'bg-red-100 border-red-500 text-red-800 dark:bg-red-800/30 dark:border-red-500 dark:text-red-400',
//           iconColorClass: 'text-red-600 dark:text-red-400'
//         };
//       default:
//         return {
//           icon: CheckCircleIcon,
//           colorClass: 'bg-gray-100 border-gray-500 text-gray-800 dark:bg-gray-800/30 dark:border-gray-500 dark:text-gray-400',
//           iconColorClass: 'text-gray-600 dark:text-gray-400'
//         };
//     }
//   };

//   // Function to get customer initials
//   const getInitials = (name: string): string => {
//     return name.split(' ').map(n => n[0]).join('');
//   };

//   // Function to copy text to clipboard
//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text)
//       .then(() => {
//         setToastMessage('Transaction hash copied to clipboard');
//         setToastType('success');
//         setShowToast(true);
//       })
//       .catch(err => {
//         console.error('Failed to copy hash: ', err);
//         setToastMessage('Failed to copy transaction hash');
//         setToastType('error');
//         setShowToast(true);
//       });
//   };

//   // Function to handle viewing transaction details
//   const handleViewTransaction = (transaction: any) => {
//     // Open the drawer with transaction details
//     setSelectedTransaction(transaction);
//     setIsDrawerOpen(true);
//   };

//   return (
//     <DashboardLayout>
//       {/* Add animation keyframes for both pulse and fade-in/slide-up animations */}
//       <style>{`
//         @keyframes pulse-subtle {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.92;
//           }
//         }
//         .animate-pulse-subtle {
//           animation: pulse-subtle 3s ease-in-out infinite;
//         }

//         @keyframes fade-in-up {
//           0% {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fade-in-up {
//           animation: fade-in-up 0.6s ease-out forwards;
//         }

//         .animation-delay-100 {
//           animation-delay: 0.1s;
//         }
        
//         .animation-delay-200 {
//           animation-delay: 0.2s;
//         }
        
//         .animation-delay-300 {
//           animation-delay: 0.3s;
//         }
        
//         .animation-delay-400 {
//           animation-delay: 0.4s;
//         }
        
//         .animation-delay-500 {
//           animation-delay: 0.5s;
//         }
        
//         .animation-delay-600 {
//           animation-delay: 0.6s;
//         }
//       `}</style>

//       <div className="space-y-6">
//         {/* Account Setup Notice */}
//         {!accountSetupStatus.isComplete && (
//           <div className="relative bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-500 dark:border-amber-500 shadow-lg rounded-lg p-6 animate-pulse-subtle overflow-hidden animate-fade-in-up">
//             {/* Background decoration */}
//             <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-200 dark:bg-amber-700/30 rounded-full opacity-50"></div>
//             <div className="absolute right-12 bottom-0 w-16 h-16 bg-amber-300 dark:bg-amber-600/30 rounded-full opacity-30"></div>
            
//             <div className="relative flex flex-col md:flex-row items-start md:items-center">
//               <div className="flex-shrink-0 bg-amber-200 dark:bg-amber-700/50 p-3 rounded-full shadow-md">
//                 <ExclamationTriangleIcon className="h-8 w-8 text-amber-600 dark:text-amber-400" aria-hidden="true" />
//               </div>
//               <div className="mt-3 md:mt-0 ml-0 md:ml-4 flex-1">
//                 <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300">Complete your account setup</h3>
//                 <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">
//                   <p className="font-medium">Your account setup is incomplete. Please complete the following steps to unlock all features:</p>
//                   <ul className="mt-3 space-y-2">
//                     {accountSetupStatus.pendingSteps.map((step) => (
//                       <li key={step.id} className="flex items-center">
//                         <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-amber-300 dark:bg-amber-700 text-amber-800 dark:text-amber-200 font-bold text-xs">
//                           {step.id}
//                         </span>
//                         <a 
//                           href={step.link}
//                           className="ml-2 text-amber-800 dark:text-amber-200 hover:text-amber-900 dark:hover:text-amber-100 hover:underline font-medium"
//                         >
//                           {step.name}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//               <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
//                 <button
//                   type="button"
//                   onClick={() => navigate('/dashboard/settings')}
//                   className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-md text-base font-bold text-white bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-150 transform hover:scale-105"
//                 >
//                   Complete Setup
//                   <ArrowRightIcon className="ml-2 h-5 w-5" />
//                 </button>
//               </div>
//             </div>

//             {/* Progress indicator */}
//             <div className="mt-4 pt-3 border-t border-amber-200 dark:border-amber-700/50">
//               <div className="flex justify-between items-center">
//                 <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
//                   Account setup progress: 
//                   <span className="ml-1 font-bold">0/{accountSetupStatus.pendingSteps.length} complete</span>
//                 </p>
//                 <div className="w-32 bg-amber-200 dark:bg-amber-800 rounded-full h-2.5">
//                   <div className="bg-amber-600 dark:bg-amber-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Welcome section */}
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 animate-fade-in-up animation-delay-100 opacity-0">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back!</h2>
//           <p className="text-gray-600 dark:text-gray-300">
//             Here's what's happening with your crypto payments today.
//           </p>
//         </div>

//         {/* Mobile Stats Carousel - Only visible on small screens */}
//         <div className="block sm:hidden animate-fade-in-up animation-delay-200 opacity-0">
//           <div className="relative">
//             {/* Carousel container */}
//             <div className="overflow-hidden">
//               <div className="relative">
//                 {/* Current stat card */}
//                 <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
//                   <div className="flex items-center">
//                     <div className={`p-3 rounded-full ${stats[currentStatIndex].bgColor} mr-4`}>
//                       {(() => {
//                         const StatIcon = stats[currentStatIndex].icon;
//                         return <StatIcon className={`h-6 w-6 ${stats[currentStatIndex].iconColor}`} />;
//                       })()}
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stats[currentStatIndex].name}</p>
//                       <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats[currentStatIndex].value}</p>
//                     </div>
//                   </div>
//                   <div className="mt-4 flex items-center justify-between">
//                     <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
//                       stats[currentStatIndex].isIncrease ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
//                     }`}>
//                       {stats[currentStatIndex].isIncrease ? (
//                         <ArrowUpIcon className="h-3 w-3 mr-1" />
//                       ) : (
//                         <ArrowDownIcon className="h-3 w-3 mr-1" />
//                       )}
//                       {stats[currentStatIndex].change}
//                     </div>
//                     <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
//                   </div>
//                   <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
//                     <div 
//                       className={`h-1 rounded-full ${stats[currentStatIndex].isIncrease ? 'bg-green-500 dark:bg-green-400' : 'bg-red-500 dark:bg-red-400'}`} 
//                       style={{ width: stats[currentStatIndex].isIncrease ? '75%' : '25%' }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation buttons */}
//             <div className="flex justify-between mt-4">
//               <button 
//                 onClick={prevStat}
//                 className="p-2 rounded-full bg-white dark:bg-gray-800 shadow text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//               >
//                 <ChevronLeftIcon className="h-5 w-5" />
//               </button>
              
//               {/* Indicators */}
//               <div className="flex items-center space-x-2">
//                 {stats.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentStatIndex(index)}
//                     className={`w-2 h-2 rounded-full transition-colors ${
//                       index === currentStatIndex ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
//                     }`}
//                     aria-label={`Go to stat ${index + 1}`}
//                   />
//                 ))}
//               </div>
              
//               <button 
//                 onClick={nextStat}
//                 className="p-2 rounded-full bg-white dark:bg-gray-800 shadow text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//               >
//                 <ChevronRightIconOutline className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Desktop Stats Grid - Hidden on small screens */}
//         <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up animation-delay-200 opacity-0">
//           {stats.map((stat, index) => (
//             <div 
//               key={stat.name} 
//               className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] animate-fade-in-up opacity-0`}
//               style={{ animationDelay: `${0.2 + index * 0.1}s` }}
//             >
//               <div className="flex items-center">
//                 <div className={`p-3 rounded-full ${stat.bgColor} mr-4`}>
//                   <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
//                   <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
//                 </div>
//               </div>
//               <div className="mt-4 flex items-center justify-between">
//                 <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
//                   stat.isIncrease ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
//                 }`}>
//                   {stat.isIncrease ? (
//                     <ArrowUpIcon className="h-3 w-3 mr-1" />
//                   ) : (
//                     <ArrowDownIcon className="h-3 w-3 mr-1" />
//                   )}
//                   {stat.change}
//                 </div>
//                 <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
//               </div>
//               <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
//                 <div 
//                   className={`h-1 rounded-full ${stat.isIncrease ? 'bg-green-500 dark:bg-green-400' : 'bg-red-500 dark:bg-red-400'}`} 
//                   style={{ width: stat.isIncrease ? '75%' : '25%' }}
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Charts section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up animation-delay-400 opacity-0">
//           {/* Revenue chart */}
//           <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-medium text-gray-900 dark:text-white">Revenue Overview</h3>
//               <select className="text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
//                 <option>Last 7 days</option>
//                 <option>Last 30 days</option>
//                 <option>Last 90 days</option>
//               </select>
//             </div>
//             <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
//               <p className="text-gray-500 dark:text-gray-400">Revenue chart will be displayed here</p>
//             </div>
//           </div>

//           {/* Transaction chart */}
//           <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-medium text-gray-900 dark:text-white">Transaction Volume</h3>
//               <select className="text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
//                 <option>Last 7 days</option>
//                 <option>Last 30 days</option>
//                 <option>Last 90 days</option>
//               </select>
//             </div>
//             <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
//               <p className="text-gray-500 dark:text-gray-400">Transaction chart will be displayed here</p>
//             </div>
//           </div>
//         </div>

//         {/* Recent transactions */}
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden animate-fade-in-up animation-delay-500 opacity-0">
//           <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
//             <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Transactions</h3>
//           </div>
          
//           {/* Table for larger screens, hidden on small screens */}
//           <div className="hidden sm:block overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead className="bg-gray-50 dark:bg-gray-700">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Customer
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Currency
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Transaction Hash
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                 {recentTransactions.map((transaction) => (
//                   <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10">
//                           <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
//                             {getInitials(transaction.customer)}
//                           </div>
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.customer}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900 dark:text-white">{transaction.amount}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900 dark:text-white">{transaction.currency}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {(() => {
//                         const badge = getStatusBadge(transaction.status);
//                         const BadgeIcon = badge.icon;
//                         return (
//                           <span className={`px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full border ${badge.colorClass}`}>
//                             <BadgeIcon className={`h-3.5 w-3.5 mr-1 ${badge.iconColorClass}`} />
//                             {transaction.status}
//                           </span>
//                         );
//                       })()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       {transaction.date}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                       <div className="flex items-center">
//                         <span className="font-mono mr-2">{transaction.txHash}</span>
//                         <button 
//                           onClick={() => copyToClipboard(transaction.txHash)}
//                           className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
//                           title="Copy transaction hash"
//                         >
//                           <ClipboardDocumentIcon className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button
//                         onClick={() => handleViewTransaction(transaction)}
//                         className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
//                         title="View details"
//                       >
//                         <EyeIcon className="h-5 w-5" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           {/* Stacked cards for small screens */}
//           <div className="sm:hidden divide-y divide-gray-200 dark:divide-gray-700">
//             {recentTransactions.map((transaction) => (
//               <div key={transaction.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
//                 <div className="flex justify-between items-start mb-2">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0 h-10 w-10">
//                       <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
//                         {getInitials(transaction.customer)}
//                       </div>
//                     </div>
//                     <div className="ml-3">
//                       <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.customer}</div>
//                     </div>
//                   </div>
//                   {(() => {
//                     const badge = getStatusBadge(transaction.status);
//                     const BadgeIcon = badge.icon;
//                     return (
//                       <span className={`px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full border ${badge.colorClass}`}>
//                         <BadgeIcon className={`h-3.5 w-3.5 mr-1 ${badge.iconColorClass}`} />
//                         {transaction.status}
//                       </span>
//                     );
//                   })()}
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-3 text-sm">
//                   <div>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
//                     <p className="font-medium text-gray-900 dark:text-white">{transaction.amount}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">Currency</p>
//                     <p className="font-medium text-gray-900 dark:text-white">{transaction.currency}</p>
//                   </div>
//                   <div className="col-span-2">
//                     <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
//                     <p className="font-medium text-gray-900 dark:text-white">{transaction.date}</p>
//                   </div>
//                   <div className="col-span-2">
//                     <p className="text-xs text-gray-500 dark:text-gray-400">Transaction Hash</p>
//                     <div className="flex items-center">
//                       <p className="font-medium text-gray-900 dark:text-white font-mono text-xs truncate mr-2">{transaction.txHash}</p>
//                       <button 
//                         onClick={() => copyToClipboard(transaction.txHash)}
//                         className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
//                         title="Copy transaction hash"
//                       >
//                         <ClipboardDocumentIcon className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* View details button */}
//                 <div className="mt-3 flex justify-end">
//                   <button
//                     onClick={() => handleViewTransaction(transaction)}
//                     className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors inline-flex items-center text-sm"
//                   >
//                     <EyeIcon className="h-4 w-4 mr-1" />
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
//             <button 
//               onClick={() => navigate('/dashboard/transactions')}
//               className="text-sm font-medium text-primary hover:text-primary/80 flex items-center"
//             >
//               View all transactions
//               <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Transaction Details Drawer */}
//       <div className={`fixed inset-0 overflow-hidden z-50 ${isDrawerOpen ? 'visible' : 'invisible'}`}>
//         {/* Background overlay */}
//         <div 
//           className={`absolute inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`} 
//           onClick={() => setIsDrawerOpen(false)}
//         />
        
//         {/* Drawer panel */}
//         <div className={`fixed inset-y-0 right-0 max-w-full flex transition-transform transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//           <div className="relative w-screen max-w-md">
//             <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
//               {/* Drawer header */}
//               <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
//                 <h2 className="text-lg font-medium text-gray-900 dark:text-white">Transaction Details</h2>
//                 <button
//                   onClick={() => setIsDrawerOpen(false)}
//                   className="rounded-md p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
//                 >
//                   <span className="sr-only">Close panel</span>
//                   <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                 </button>
//               </div>
              
//               {/* Drawer content */}
//               {selectedTransaction && (
//                 <div className="px-6 py-4 space-y-6">
//                   {/* Transaction ID */}
//                   <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
//                     <p className="text-sm text-gray-500 dark:text-gray-400">Transaction ID</p>
//                     <p className="text-lg font-medium text-gray-900 dark:text-white">#{selectedTransaction.id}</p>
//                   </div>
                  
//                   {/* Status banner */}
//                   <div className={`px-4 py-3 rounded-lg ${
//                     selectedTransaction.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/20' : 
//                     selectedTransaction.status === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-900/20' : 
//                     'bg-red-100 dark:bg-red-900/20'
//                   }`}>
//                     <div className="flex items-center">
//                       {(() => {
//                         const badge = getStatusBadge(selectedTransaction.status);
//                         const BadgeIcon = badge.icon;
//                         return (
//                           <>
//                             <BadgeIcon className={`h-5 w-5 mr-2 ${badge.iconColorClass}`} />
//                             <span className={`font-medium ${badge.iconColorClass}`}>
//                               {selectedTransaction.status === 'Completed' ? 'Transaction Complete' : 
//                               selectedTransaction.status === 'Pending' ? 'Transaction Pending' : 
//                               'Transaction Failed'}
//                             </span>
//                           </>
//                         );
//                       })()}
//                     </div>
//                   </div>
                  
//                   {/* Customer Information */}
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Customer Information</h3>
//                     <div className="flex items-center">
//                       <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-medium">
//                         {getInitials(selectedTransaction.customer)}
//                       </div>
//                       <p className="text-base font-medium text-gray-900 dark:text-white ml-3">{selectedTransaction.customer}</p>
//                     </div>
//                   </div>
                  
//                   {/* Transaction Details */}
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Transaction Details</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
//                         <p className="text-base font-medium text-gray-900 dark:text-white">{selectedTransaction.amount}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Currency</p>
//                         <p className="text-base font-medium text-gray-900 dark:text-white">{selectedTransaction.currency}</p>
//                       </div>
//                       <div className="col-span-2">
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
//                         <p className="text-base font-medium text-gray-900 dark:text-white">{selectedTransaction.date}</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Transaction Hash */}
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Transaction Hash</h3>
//                     <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
//                       <p className="font-mono text-sm mr-2 text-gray-800 dark:text-gray-200 flex-grow break-all">{selectedTransaction.txHash}</p>
//                       <button 
//                         onClick={() => copyToClipboard(selectedTransaction.txHash)}
//                         className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
//                         title="Copy transaction hash"
//                       >
//                         <ClipboardDocumentIcon className="h-5 w-5" />
//                       </button>
//                     </div>
//                   </div>
                  
//                   {/* Additional Information */}
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Additional Information</h3>
//                     <div className="rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
//                       <div className="flex justify-between px-4 py-3">
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Fee</p>
//                         <p className="text-sm font-medium text-gray-900 dark:text-white">$0.25</p>
//                       </div>
//                       <div className="flex justify-between px-4 py-3">
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Network</p>
//                         <p className="text-sm font-medium text-gray-900 dark:text-white">Mainnet</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {showToast && (
//         <Toast
//           message={toastMessage}
//           type={toastType}
//           onClose={() => setShowToast(false)}
//         />
//       )}
//     </DashboardLayout>
//   );
// };

// export default Dashboard; 







import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  CurrencyDollarIcon, 
  CreditCardIcon, 
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon as ClockIconSolid,
  XCircleIcon,
  EyeIcon,
  ClipboardDocumentIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon as ChevronRightIconOutline,

} from '@heroicons/react/24/outline';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Toast from '../../components/common/Toast';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { URL } from '../../url';

// Define interfaces for API responses
interface Payment {
  id: string;
  amount: string;
  currency: string;
  status: string;
  transactionHash: string | null;
  createdAt: string;
  customer?: string; // We'll add this for display purposes
}

interface CurrencyStats {
  currency: string;
  count: string;
  totalAmount: string;
}

interface StatusStats {
  status: string;
  count: string;
}

interface MonthlyStats {
  month: string;
  count: number;
  totalAmount: number;
}

interface MerchantStats {
  currency: CurrencyStats[];
  status: StatusStats[];
  monthly: MonthlyStats[];
}

interface PaymentsResponse {
  success: boolean;
  payments: {
    data: Payment[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
  filters: {
    currencies: string[];
    statuses: string[];
  };
}

interface StatsResponse {
  success: boolean;
  stats: MerchantStats;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { merchant, token } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Payment | null>(null);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  
  // State for API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Payment[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [_totalAmount, setTotalAmount] = useState(0);
  const [_pendingCount, setPendingCount] = useState(0);
  const [_completedCount, setCompletedCount] = useState(0);
  const [monthlyData, setMonthlyData] = useState<MonthlyStats[]>([]);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Set up headers with auth token and API credentials
        const headers = {
          'Authorization': `Bearer ${token}`,
          'x-api-key': merchant?.apiKey,
          'x-api-secret': merchant?.apiSecret
        };

        // Fetch both endpoints in parallel
        const [paymentsResponse, statsResponse] = await Promise.all([
          axios.get<PaymentsResponse>(`${URL}/api/payments/merchant/list`, { headers }),
          axios.get<StatsResponse>(`${URL}/api/payments/merchant/stats`, { headers })
        ]);

        // Process payments data
        if (paymentsResponse.data.success) {
          // Add mock customer names for display purposes
          const customersNames = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Wilson'];
          const payments = paymentsResponse.data.payments.data.map((payment, index) => ({
            ...payment,
            customer: customersNames[index % customersNames.length]
          }));
          
          setRecentTransactions(payments);
          setTotalTransactions(paymentsResponse.data.payments.totalCount);
        }

        // Process stats data
        if (statsResponse.data.success) {
          const { stats } = statsResponse.data;
          
          // Calculate total amount across all currencies
          const totalAmountValue = stats.currency.reduce((sum, curr) => 
            sum + parseFloat(curr.totalAmount), 0);
          setTotalAmount(totalAmountValue);
          
          // Get pending and completed counts
          const pendingStats = stats.status.find(s => s.status === 'pending');
          const completedStats = stats.status.find(s => s.status === 'completed');
          
          setPendingCount(pendingStats ? parseInt(pendingStats.count) : 0);
          setCompletedCount(completedStats ? parseInt(completedStats.count) : 0);
          
          // Save monthly data for charts
          setMonthlyData(stats.monthly);

          // Create stats cards data
          const statsCards = [
            {
              name: 'Total Revenue',
              value: `$${totalAmountValue.toFixed(2)}`,
              change: '+12.5%', // This would need real historical data to calculate
              isIncrease: true,
              icon: CurrencyDollarIcon,
              iconColor: 'text-emerald-500 dark:text-emerald-400',
              bgColor: 'bg-emerald-100/50 dark:bg-emerald-900/20',
              textColor: 'text-emerald-600 dark:text-emerald-400',
            },
            {
              name: 'Transactions',
              value: paymentsResponse.data.payments.totalCount.toString(),
              change: '+8.2%', // This would need real historical data to calculate
              isIncrease: true,
              icon: CreditCardIcon,
              iconColor: 'text-blue-500 dark:text-blue-400',
              bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
              textColor: 'text-blue-600 dark:text-blue-400',
            },
            {
              name: 'Completed',
              value: completedStats ? completedStats.count : '0',
              change: `${completedStats ? Math.round((parseInt(completedStats.count) / totalTransactions) * 100) : 0}%`,
              isIncrease: true,
              icon: CheckCircleIcon,
              iconColor: 'text-violet-500 dark:text-violet-400',
              bgColor: 'bg-violet-100/50 dark:bg-violet-900/20',
              textColor: 'text-violet-600 dark:text-violet-400',
            },
            {
              name: 'Pending',
              value: pendingStats ? pendingStats.count : '0',
              change: `${pendingStats ? Math.round((parseInt(pendingStats.count) / totalTransactions) * 100) : 0}%`,
              isIncrease: false,
              icon: ClockIcon,
              iconColor: 'text-amber-500 dark:text-amber-400',
              bgColor: 'bg-amber-100/50 dark:bg-amber-900/20',
              textColor: 'text-amber-600 dark:text-amber-400',
            },
          ];
          
          setStats(statsCards);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (merchant?.apiKey && merchant?.apiSecret && token) {
      fetchData();
    }
  }, [merchant, token]);

  // Navigate to next stat in carousel
  const nextStat = () => {
    setCurrentStatIndex((prevIndex) => (prevIndex === stats.length - 1 ? 0 : prevIndex + 1));
  };

  // Navigate to previous stat in carousel
  const prevStat = () => {
    setCurrentStatIndex((prevIndex) => (prevIndex === 0 ? stats.length - 1 : prevIndex - 1));
  };

  // Mock data for account setup status
  const accountSetupStatus = {
    isComplete: false,
    pendingSteps: [
      { id: 1, name: 'Verify your identity', link: '/dashboard/profile/verify' },
      { id: 2, name: 'Set up two-factor authentication', link: '/dashboard/profile/security' },
      { id: 3, name: 'Connect a payment method', link: '/dashboard/payments/methods' }
    ]
  };

  // Helper function to get status badge details
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return {
          icon: CheckCircleIcon,
          colorClass: 'bg-green-100 border-green-500 text-green-800 dark:bg-green-800/30 dark:border-green-500 dark:text-green-400',
          iconColorClass: 'text-green-600 dark:text-green-400'
        };
      case 'pending':
        return {
          icon: ClockIconSolid,
          colorClass: 'bg-yellow-100 border-yellow-500 text-yellow-800 dark:bg-yellow-800/30 dark:border-yellow-500 dark:text-yellow-400',
          iconColorClass: 'text-yellow-600 dark:text-yellow-400'
        };
      case 'failed':
        return {
          icon: XCircleIcon,
          colorClass: 'bg-red-100 border-red-500 text-red-800 dark:bg-red-800/30 dark:border-red-500 dark:text-red-400',
          iconColorClass: 'text-red-600 dark:text-red-400'
        };
      default:
        return {
          icon: CheckCircleIcon,
          colorClass: 'bg-gray-100 border-gray-500 text-gray-800 dark:bg-gray-800/30 dark:border-gray-500 dark:text-gray-400',
          iconColorClass: 'text-gray-600 dark:text-gray-400'
        };
    }
  };

  // Function to get customer initials
  const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('');
  };

  // Function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setToastMessage('Transaction hash copied to clipboard');
        setToastType('success');
        setShowToast(true);
      })
      .catch(err => {
        console.error('Failed to copy hash: ', err);
        setToastMessage('Failed to copy transaction hash');
        setToastType('error');
        setShowToast(true);
      });
  };

  // Function to handle viewing transaction details
  const handleViewTransaction = (transaction: Payment) => {
    // Open the drawer with transaction details
    setSelectedTransaction(transaction);
    setIsDrawerOpen(true);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-t-black border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg text-red-700 dark:text-red-300 max-w-md text-center">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Reload
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Add animation keyframes for both pulse and fade-in/slide-up animations */}
      <style>{`
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.92;
          }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }

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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>

      <div className="space-y-6">
        {/* Account Setup Notice */}
        {!accountSetupStatus.isComplete && (
          <div className="relative bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-500 dark:border-amber-500 shadow-lg rounded-lg p-6 animate-pulse-subtle overflow-hidden animate-fade-in-up">
            {/* Background decoration */}
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-200 dark:bg-amber-700/30 rounded-full opacity-50"></div>
            <div className="absolute right-12 bottom-0 w-16 h-16 bg-amber-300 dark:bg-amber-600/30 rounded-full opacity-30"></div>
            
            <div className="relative flex flex-col md:flex-row items-start md:items-center">
              <div className="flex-shrink-0 bg-amber-200 dark:bg-amber-700/50 p-3 rounded-full shadow-md">
                <ExclamationTriangleIcon className="h-8 w-8 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              </div>
              <div className="mt-3 md:mt-0 ml-0 md:ml-4 flex-1">
                <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300">Complete your account setup</h3>
                <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                  <p className="font-medium">Your account setup is incomplete. Please complete the following steps to unlock all features:</p>
                  <ul className="mt-3 space-y-2">
                    {accountSetupStatus.pendingSteps.map((step) => (
                      <li key={step.id} className="flex items-center">
                        <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-amber-300 dark:bg-amber-700 text-amber-800 dark:text-amber-200 font-bold text-xs">
                          {step.id}
                        </span>
                        <a 
                          href={step.link}
                          className="ml-2 text-amber-800 dark:text-amber-200 hover:text-amber-900 dark:hover:text-amber-100 hover:underline font-medium"
                        >
                          {step.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard/settings')}
                  className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-md text-base font-bold text-white bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-150 transform hover:scale-105"
                >
                  Complete Setup
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-4 pt-3 border-t border-amber-200 dark:border-amber-700/50">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  Account setup progress: 
                  <span className="ml-1 font-bold">0/{accountSetupStatus.pendingSteps.length} complete</span>
                </p>
                <div className="w-32 bg-amber-200 dark:bg-amber-800 rounded-full h-2.5">
                  <div className="bg-amber-600 dark:bg-amber-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 animate-fade-in-up animation-delay-100 opacity-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {merchant?.businessName}!</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Here's what's happening with your crypto payments today.
          </p>
        </div>

        {/* Mobile Stats Carousel - Only visible on small screens */}
        <div className="block sm:hidden animate-fade-in-up animation-delay-200 opacity-0">
          <div className="relative">
            {/* Carousel container */}
            <div className="overflow-hidden">
              <div className="relative">
                {/* Current stat card */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full ${stats[currentStatIndex]?.bgColor || 'bg-gray-100'} mr-4`}>
                      {stats[currentStatIndex]?.icon && (() => {
                        const StatIcon = stats[currentStatIndex].icon;
                        return <StatIcon className={`h-6 w-6 ${stats[currentStatIndex].iconColor}`} />;
                      })()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stats[currentStatIndex]?.name || 'Loading...'}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats[currentStatIndex]?.value || '0'}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      stats[currentStatIndex]?.isIncrease ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {stats[currentStatIndex]?.isIncrease ? (
                        <ArrowUpIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-3 w-3 mr-1" />
                      )}
                      {stats[currentStatIndex]?.change || '0%'}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">of total</span>
                  </div>
                  <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full ${stats[currentStatIndex]?.isIncrease ? 'bg-green-500 dark:bg-green-400' : 'bg-red-500 dark:bg-red-400'}`} 
                      style={{ width: stats[currentStatIndex]?.isIncrease ? '75%' : '25%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-4">
              <button 
                onClick={prevStat}
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              
              {/* Indicators */}
              <div className="flex items-center space-x-2">
                {stats.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStatIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStatIndex ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`Go to stat ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextStat}
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <ChevronRightIconOutline className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Stats Grid - Hidden on small screens */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up animation-delay-200 opacity-0">
          {stats.map((stat, index) => (
            <div 
              key={stat.name} 
              className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] animate-fade-in-up opacity-0`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.bgColor} mr-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  stat.isIncrease ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {stat.isIncrease ? (
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3 mr-1" />
                  )}
                  {stat.change}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">of total</span>
              </div>
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <div 
                  className={`h-1 rounded-full ${stat.isIncrease ? 'bg-green-500 dark:bg-green-400' : 'bg-red-500 dark:bg-red-400'}`} 
                  style={{ width: stat.isIncrease ? '75%' : '25%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up animation-delay-400 opacity-0">
          {/* Revenue chart */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Revenue Overview</h3>
              <select className="text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-64 flex flex-col justify-center">
              <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">Monthly Revenue</h4>
              <div className="space-y-3">
                {monthlyData.map((month, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{month.month}</span>
                      <span className="text-gray-900 dark:text-white font-medium">${month.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-blue-500 dark:bg-blue-400 h-2.5 rounded-full" 
                        style={{ width: `${(month.totalAmount / Math.max(...monthlyData.map(m => m.totalAmount))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transaction chart */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Transaction Volume</h3>
              <select className="text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-64 flex flex-col justify-center">
              <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">Transactions by Currency</h4>
              <div className="space-y-3">
                {(stats[0]?.currency || []).map((curr: CurrencyStats, idx: number) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{curr.currency}</span>
                      <span className="text-gray-900 dark:text-white font-medium">{curr.count} transactions</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-violet-500 dark:bg-violet-400 h-2.5 rounded-full" 
                        style={{ width: `${(parseInt(curr.count) / totalTransactions) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden animate-fade-in-up animation-delay-500 opacity-0">
    
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Transactions</h3>
          </div>
          
          {/* Table for larger screens, hidden on small screens */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Currency
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Transaction Hash
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {getInitials(transaction.customer || 'User')}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.customer || 'User'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{transaction.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{transaction.currency}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(() => {
                        const badge = getStatusBadge(transaction.status);
                        const BadgeIcon = badge.icon;
                        return (
                          <span className={`px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full border ${badge.colorClass}`}>
                            <BadgeIcon className={`h-3.5 w-3.5 mr-1 ${badge.iconColorClass}`} />
                            {transaction.status}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(transaction.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <span className="font-mono mr-2">{transaction.transactionHash ? `${transaction.transactionHash.substring(0, 10)}...` : 'N/A'}</span>
                        {transaction.transactionHash && (
                          <button 
                            onClick={() => copyToClipboard(transaction.transactionHash!)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            title="Copy transaction hash"
                          >
                            <ClipboardDocumentIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewTransaction(transaction)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        title="View details"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Stacked cards for small screens */}
          <div className="sm:hidden divide-y divide-gray-200 dark:divide-gray-700">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {getInitials(transaction.customer || 'User')}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.customer || 'User'}</div>
                    </div>
                  </div>
                  {(() => {
                    const badge = getStatusBadge(transaction.status);
                    const BadgeIcon = badge.icon;
                    return (
                      <span className={`px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full border ${badge.colorClass}`}>
                        <BadgeIcon className={`h-3.5 w-3.5 mr-1 ${badge.iconColorClass}`} />
                        {transaction.status}
                      </span>
                    );
                  })()}
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
                    <p className="font-medium text-gray-900 dark:text-white">{transaction.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Currency</p>
                    <p className="font-medium text-gray-900 dark:text-white">{transaction.currency}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(transaction.createdAt)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Transaction Hash</p>
                    <div className="flex items-center">
                      <p className="font-medium text-gray-900 dark:text-white font-mono text-xs truncate mr-2">
                        {transaction.transactionHash ? `${transaction.transactionHash.substring(0, 16)}...` : 'N/A'}
                      </p>
                      {transaction.transactionHash && (
                        <button 
                          onClick={() => copyToClipboard(transaction.transactionHash!)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          title="Copy transaction hash"
                        >
                          <ClipboardDocumentIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* View details button */}
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => handleViewTransaction(transaction)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors inline-flex items-center text-sm"
                  >
                    <EyeIcon className="h-4 w-4 mr-1" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => navigate('/dashboard/transactions')}
              className="text-sm font-medium text-primary hover:text-primary/80 flex items-center"
            >
              View all transactions
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Details Drawer */}
      <div className={`fixed inset-0 overflow-hidden z-50 ${isDrawerOpen ? 'visible' : 'invisible'}`}>
        {/* Background overlay */}
        <div 
          className={`absolute inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsDrawerOpen(false)}
        />
        
        {/* Drawer panel */}
        <div className={`fixed inset-y-0 right-0 max-w-full flex transition-transform transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
              {/* Drawer header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Transaction Details</h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="rounded-md p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              {/* Drawer content */}
              {selectedTransaction && (
                <div className="px-6 py-4 space-y-6">
                  {/* Transaction ID */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Transaction ID</p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">#{selectedTransaction.id.substring(0, 8)}</p>
                  </div>
                  
                  {/* Status banner */}
                  <div className={`px-4 py-3 rounded-lg ${
                    selectedTransaction.status.toLowerCase() === 'completed' ? 'bg-green-100 dark:bg-green-900/20' : 
                    selectedTransaction.status.toLowerCase() === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/20' : 
                    'bg-red-100 dark:bg-red-900/20'
                  }`}>
                    <div className="flex items-center">
                      {(() => {
                        const badge = getStatusBadge(selectedTransaction.status);
                        const BadgeIcon = badge.icon;
                        return (
                          <>
                            <BadgeIcon className={`h-5 w-5 mr-2 ${badge.iconColorClass}`} />
                            <span className={`font-medium ${badge.iconColorClass}`}>
                              {selectedTransaction.status.toLowerCase() === 'completed' ? 'Transaction Complete' : 
                              selectedTransaction.status.toLowerCase() === 'pending' ? 'Transaction Pending' : 
                              'Transaction Failed'}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                  
                  {/* Customer Information */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Customer Information</h3>
                    <div className="flex items-center">
                      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-medium">
                        {getInitials(selectedTransaction.customer || 'User')}
                      </div>
                      <p className="text-base font-medium text-gray-900 dark:text-white ml-3">{selectedTransaction.customer || 'User'}</p>
                    </div>
                  </div>
                  
                  {/* Transaction Details */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Transaction Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">{selectedTransaction.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Currency</p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">{selectedTransaction.currency}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">{formatDate(selectedTransaction.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Transaction Hash */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Transaction Hash</h3>
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="font-mono text-sm mr-2 text-gray-800 dark:text-gray-200 flex-grow break-all">
                        {selectedTransaction.transactionHash || 'Not available yet'}
                      </p>
                      {selectedTransaction.transactionHash && (
                        <button 
                          onClick={() => copyToClipboard(selectedTransaction.transactionHash!)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
                          title="Copy transaction hash"
                        >
                          <ClipboardDocumentIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Additional Information */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Additional Information</h3>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
                      <div className="flex justify-between px-4 py-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{selectedTransaction.status}</p>
                      </div>
                      <div className="flex justify-between px-4 py-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Network</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedTransaction.currency === 'SOL' || selectedTransaction.currency === 'USDC_SOL' ? 'Solana' : 'Binance Smart Chain'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;