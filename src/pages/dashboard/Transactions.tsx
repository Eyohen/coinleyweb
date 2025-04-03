// import React, { useState } from 'react';
// import DashboardLayout from '../../components/dashboard/DashboardLayout';
// import { 
//   CurrencyDollarIcon, 
//   MagnifyingGlassIcon, 
//   FunnelIcon,
//   CheckCircleIcon,
//   ClockIcon,
//   XCircleIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   ClipboardDocumentIcon,
//   DocumentDuplicateIcon,
//   EyeIcon,
//   XMarkIcon,
//   ArrowDownTrayIcon
// } from '@heroicons/react/24/outline';
// import Toast from '../../components/common/Toast';

// interface Transaction {
//   id: number;
//   customer: string;
//   amount: string;
//   status: 'Completed' | 'Pending' | 'Failed';
//   date: string;
//   time: string;
//   currency: string;
//   txHash: string;
//   type: 'Buy' | 'Sell' | 'Transfer' | 'Deposit' | 'Withdrawal';
// }

// const Transactions: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string>('All');
//   const [typeFilter, setTypeFilter] = useState<string>('All');
//   const [dateFilter, setDateFilter] = useState<string>('Last 30 days');
//   const [currencyFilter, setCurrencyFilter] = useState<string>('All');
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [currentStatIndex, setCurrentStatIndex] = useState(0);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [toastType, setToastType] = useState<'success' | 'error'>('success');
  
//   // Get active filter count
//   const activeFilterCount = [
//     statusFilter !== 'All',
//     typeFilter !== 'All',
//     currencyFilter !== 'All',
//     dateFilter !== 'Last 30 days'
//   ].filter(Boolean).length;
  
//   // Mock transaction data
//   const transactionData: Transaction[] = [
//     {
//       id: 1,
//       customer: 'John Doe',
//       amount: '$125.00',
//       status: 'Completed',
//       date: '2023-06-01',
//       time: '14:30:15',
//       currency: 'BTC',
//       txHash: '0x3a1b2c3d4e5f...',
//       type: 'Buy'
//     },
//     {
//       id: 2,
//       customer: 'Jane Smith',
//       amount: '$75.50',
//       status: 'Pending',
//       date: '2023-06-01',
//       time: '09:45:22',
//       currency: 'ETH',
//       txHash: '0x7a8b9c0d1e2f...',
//       type: 'Sell'
//     },
//     {
//       id: 3,
//       customer: 'Robert Johnson',
//       amount: '$250.00',
//       status: 'Completed',
//       date: '2023-05-31',
//       time: '16:18:05',
//       currency: 'USDT',
//       txHash: '0xf1e2d3c4b5a6...',
//       type: 'Transfer'
//     },
//     {
//       id: 4,
//       customer: 'Emily Davis',
//       amount: '$42.75',
//       status: 'Failed',
//       date: '2023-05-31',
//       time: '11:22:37',
//       currency: 'BTC',
//       txHash: '0x9a8b7c6d5e4f...',
//       type: 'Withdrawal'
//     },
//     {
//       id: 5,
//       customer: 'Michael Wilson',
//       amount: '$180.25',
//       status: 'Completed',
//       date: '2023-05-30',
//       time: '10:05:19',
//       currency: 'ETH',
//       txHash: '0xb1a2c3d4e5f6...',
//       type: 'Deposit'
//     },
//     {
//       id: 6,
//       customer: 'Sarah Anderson',
//       amount: '$95.30',
//       status: 'Completed',
//       date: '2023-05-30',
//       time: '13:45:51',
//       currency: 'BTC',
//       txHash: '0x1d2e3f4a5b6c...',
//       type: 'Buy'
//     },
//     {
//       id: 7,
//       customer: 'David Taylor',
//       amount: '$310.00',
//       status: 'Pending',
//       date: '2023-05-29',
//       time: '09:15:08',
//       currency: 'USDT',
//       txHash: '0xa1b2c3d4e5f6...',
//       type: 'Sell'
//     },
//     {
//       id: 8,
//       customer: 'Lisa Brown',
//       amount: '$62.40',
//       status: 'Completed',
//       date: '2023-05-29',
//       time: '16:30:42',
//       currency: 'ETH',
//       txHash: '0x7d8e9f0a1b2c...',
//       type: 'Transfer'
//     },
//     {
//       id: 9,
//       customer: 'Kevin Miller',
//       amount: '$145.80',
//       status: 'Failed',
//       date: '2023-05-28',
//       time: '15:22:11',
//       currency: 'BTC',
//       txHash: '0xc1d2e3f4a5b6...',
//       type: 'Withdrawal'
//     },
//     {
//       id: 10,
//       customer: 'Amanda White',
//       amount: '$85.50',
//       status: 'Completed',
//       date: '2023-05-28',
//       time: '10:18:37',
//       currency: 'USDT',
//       txHash: '0x6f5e4d3c2b1a...',
//       type: 'Deposit'
//     }
//   ];

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
//           icon: ClockIcon,
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

//   // Get transaction type badge color
//   const getTypeColor = (type: string) => {
//     switch (type) {
//       case 'Buy':
//         return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
//       case 'Sell':
//         return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
//       case 'Transfer':
//         return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
//       case 'Deposit':
//         return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
//       case 'Withdrawal':
//         return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
//       default:
//         return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
//     }
//   };

//   // Filter transactions
//   const filteredTransactions = transactionData.filter(transaction => {
//     const matchesSearch = searchTerm === '' || 
//       transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       transaction.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       transaction.amount.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter;
//     const matchesType = typeFilter === 'All' || transaction.type === typeFilter;
//     const matchesCurrency = currencyFilter === 'All' || transaction.currency === currencyFilter;
    
//     // For date filter implementation, we would normally use a proper date library
//     // This is a simplified implementation
//     return matchesSearch && matchesStatus && matchesType && matchesCurrency;
//   });

//   // Pagination
//   const perPage = 5;
//   const totalPages = Math.ceil(filteredTransactions.length / perPage);
//   const currentTransactions = filteredTransactions.slice(
//     (currentPage - 1) * perPage,
//     currentPage * perPage
//   );

//   // Calculate transaction statistics
//   const totalTransactions = transactionData.length;
//   const completedTransactions = transactionData.filter(t => t.status === 'Completed').length;
//   const pendingTransactions = transactionData.filter(t => t.status === 'Pending').length;
//   const failedTransactions = transactionData.filter(t => t.status === 'Failed').length;

//   // Stats data for mobile carousel
//   const statsData = [
//     {
//       name: 'All Transactions',
//       value: totalTransactions.toString(),
//       icon: DocumentDuplicateIcon,
//       bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
//       iconColor: 'text-blue-500 dark:text-blue-400',
//     },
//     {
//       name: 'Completed',
//       value: completedTransactions.toString(),
//       icon: CheckCircleIcon,
//       bgColor: 'bg-green-100/50 dark:bg-green-900/20',
//       iconColor: 'text-green-500 dark:text-green-400',
//     },
//     {
//       name: 'Pending',
//       value: pendingTransactions.toString(),
//       icon: ClockIcon,
//       bgColor: 'bg-yellow-100/50 dark:bg-yellow-900/20',
//       iconColor: 'text-yellow-500 dark:text-yellow-400',
//     },
//     {
//       name: 'Failed',
//       value: failedTransactions.toString(),
//       icon: XCircleIcon,
//       bgColor: 'bg-red-100/50 dark:bg-red-900/20',
//       iconColor: 'text-red-500 dark:text-red-400',
//     }
//   ];

//   // Navigate to next stat in carousel
//   const nextStat = () => {
//     setCurrentStatIndex((prevIndex) => (prevIndex === statsData.length - 1 ? 0 : prevIndex + 1));
//   };

//   // Navigate to previous stat in carousel
//   const prevStat = () => {
//     setCurrentStatIndex((prevIndex) => (prevIndex === 0 ? statsData.length - 1 : prevIndex - 1));
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

//   // Function to handle opening the details drawer
//   const handleViewDetails = (transaction: Transaction) => {
//     setSelectedTransaction(transaction);
//     setIsDrawerOpen(true);
//   };

//   // Function to get customer initials
//   const getInitials = (name: string): string => {
//     return name.split(' ').map(n => n[0]).join('').toUpperCase();
//   };

//   return (
//     <DashboardLayout>
//       {/* Add animation keyframes for fade-in/slide-up animations */}
//       <style>{`
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
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 animate-fade-in-up opacity-0">
//           <div className="flex items-center mb-4">
//             <CurrencyDollarIcon className="h-6 w-6 text-primary mr-3" />
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h2>
//           </div>
//           <p className="text-gray-600 dark:text-gray-300">
//             View and manage all your cryptocurrency transactions.
//           </p>
//         </div>
        
//         {/* Mobile Stats Carousel - Only visible on small screens */}
//         <div className="block sm:hidden animate-fade-in-up animation-delay-100 opacity-0">
//           <div className="relative">
//             {/* Carousel container */}
//             <div className="overflow-hidden">
//               <div className="relative">
//                 {/* Current stat card */}
//                 <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
//                   <div className="flex items-center">
//                     <div className={`p-3 rounded-full ${statsData[currentStatIndex].bgColor} mr-4`}>
//                       {(() => {
//                         const StatIcon = statsData[currentStatIndex].icon;
//                         return <StatIcon className={`h-6 w-6 ${statsData[currentStatIndex].iconColor}`} />;
//                       })()}
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{statsData[currentStatIndex].name}</p>
//                       <p className="text-2xl font-bold text-gray-900 dark:text-white">{statsData[currentStatIndex].value}</p>
//                     </div>
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
//                 {statsData.map((_, index) => (
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
//                 <ChevronRightIcon className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Desktop Stats Grid - Hidden on small screens */}
//         <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up animation-delay-100 opacity-0">
//           {/* All Transactions */}
//           <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-blue-100/50 dark:bg-blue-900/20 mr-4">
//                 <DocumentDuplicateIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 dark:text-gray-400">All Transactions</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalTransactions}</p>
//               </div>
//             </div>
//           </div>
          
//           {/* Completed Transactions */}
//           <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-green-100/50 dark:bg-green-900/20 mr-4">
//                 <CheckCircleIcon className="h-6 w-6 text-green-500 dark:text-green-400" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedTransactions}</p>
//               </div>
//             </div>
//           </div>
          
//           {/* Pending Transactions */}
//           <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-yellow-100/50 dark:bg-yellow-900/20 mr-4">
//                 <ClockIcon className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingTransactions}</p>
//               </div>
//             </div>
//           </div>
          
//           {/* Failed Transactions */}
//           <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5">
//             <div className="flex items-center">
//               <div className="p-3 rounded-full bg-red-100/50 dark:bg-red-900/20 mr-4">
//                 <XCircleIcon className="h-6 w-6 text-red-500 dark:text-red-400" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Failed</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{failedTransactions}</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden animate-fade-in-up animation-delay-200 opacity-0">
//           {/* Filters and Search */}
//           <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//               <div className="relative rounded-md w-full md:w-64">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   className="form-input block w-full pl-10 py-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-primary focus:border-primary"
//                   placeholder="Search transactions..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <div className="flex flex-wrap gap-3">
//                 <button
//                   onClick={() => setFilterOpen(!filterOpen)}
//                   className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium relative ${
//                     activeFilterCount > 0
//                       ? 'text-primary border-primary bg-primary/10 hover:bg-primary/20 dark:text-primary-400 dark:border-primary-400 dark:bg-primary-900/30'
//                       : 'text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
//                   } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
//                 >
//                   <FunnelIcon className="h-4 w-4 mr-2" />
//                   Filter
//                   {activeFilterCount > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
//                       {activeFilterCount}
//                     </span>
//                   )}
//                 </button>
//                 <button
//                   onClick={() => copyToClipboard('All transaction data')}
//                   className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                 >
//                   <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
//                   Export
//                 </button>
//                 {filterOpen && (
//                   <div className="origin-top-right absolute mt-12 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
//                     <div className="py-1 p-2" role="menu" aria-orientation="vertical">
//                       <div className="px-3 py-2">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
//                         <select 
//                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
//                           value={statusFilter}
//                           onChange={(e) => setStatusFilter(e.target.value)}
//                         >
//                           <option value="All">All Statuses</option>
//                           <option value="Completed">Completed</option>
//                           <option value="Pending">Pending</option>
//                           <option value="Failed">Failed</option>
//                         </select>
//                       </div>
//                       <div className="px-3 py-2">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Currency</label>
//                         <select 
//                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
//                           value={currencyFilter}
//                           onChange={(e) => setCurrencyFilter(e.target.value)}
//                         >
//                           <option value="All">All Currencies</option>
//                           <option value="BTC">Bitcoin (BTC)</option>
//                           <option value="ETH">Ethereum (ETH)</option>
//                           <option value="USDT">Tether (USDT)</option>
//                         </select>
//                       </div>
//                       <div className="px-3 py-2">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
//                         <select 
//                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
//                           value={typeFilter}
//                           onChange={(e) => setTypeFilter(e.target.value)}
//                         >
//                           <option value="All">All Types</option>
//                           <option value="Buy">Buy</option>
//                           <option value="Sell">Sell</option>
//                           <option value="Transfer">Transfer</option>
//                           <option value="Deposit">Deposit</option>
//                           <option value="Withdrawal">Withdrawal</option>
//                         </select>
//                       </div>
//                       <div className="px-3 py-2">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date Range</label>
//                         <select 
//                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
//                           value={dateFilter}
//                           onChange={(e) => setDateFilter(e.target.value)}
//                         >
//                           <option value="Last 7 days">Last 7 days</option>
//                           <option value="Last 30 days">Last 30 days</option>
//                           <option value="Last 90 days">Last 90 days</option>
//                           <option value="All time">All time</option>
//                         </select>
//                       </div>
//                       <div className="px-3 py-2 flex justify-between">
//                         <button
//                           type="button"
//                           className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
//                           onClick={() => {
//                             setStatusFilter('All');
//                             setTypeFilter('All');
//                             setCurrencyFilter('All');
//                             setDateFilter('Last 30 days');
//                           }}
//                         >
//                           Clear filters
//                         </button>
//                         <button
//                           type="button"
//                           className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                           onClick={() => setFilterOpen(false)}
//                         >
//                           Apply Filters
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
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
//                     Type
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Currency
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Date & Time
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Status
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
//                 {currentTransactions.length > 0 ? (
//                   currentTransactions.map((transaction) => (
//                     <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10">
//                             <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
//                               {getInitials(transaction.customer)}
//                             </div>
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.customer}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(transaction.type)}`}>
//                           {transaction.type}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900 dark:text-white">{transaction.amount}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900 dark:text-white">{transaction.currency}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900 dark:text-white">{transaction.date}</div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.time}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {(() => {
//                           const badge = getStatusBadge(transaction.status);
//                           const BadgeIcon = badge.icon;
//                           return (
//                             <span className={`px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full border ${badge.colorClass}`}>
//                               <BadgeIcon className={`h-3.5 w-3.5 mr-1 ${badge.iconColorClass}`} />
//                               {transaction.status}
//                             </span>
//                           );
//                         })()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                         <div className="flex items-center">
//                           <span className="font-mono mr-2">{transaction.txHash}</span>
//                           <button 
//                             onClick={() => copyToClipboard(transaction.txHash)}
//                             className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
//                             title="Copy transaction hash"
//                           >
//                             <ClipboardDocumentIcon className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <button
//                           onClick={() => handleViewDetails(transaction)}
//                           className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
//                           title="View details"
//                         >
//                           <EyeIcon className="h-5 w-5" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
//                       No transactions found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
          
//           {/* Stacked cards for small screens */}
//           <div className="sm:hidden divide-y divide-gray-200 dark:divide-gray-700">
//             {currentTransactions.length > 0 ? (
//               currentTransactions.map((transaction) => (
//                 <div key={transaction.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10">
//                         <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
//                           {getInitials(transaction.customer)}
//                         </div>
//                       </div>
//                       <div className="ml-3">
//                         <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.customer}</div>
//                         <div className="mt-1">
//                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(transaction.type)}`}>
//                             {transaction.type}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     {(() => {
//                       const badge = getStatusBadge(transaction.status);
//                       const BadgeIcon = badge.icon;
//                       return (
//                         <span className={`px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full border ${badge.colorClass}`}>
//                           <BadgeIcon className={`h-3.5 w-3.5 mr-1 ${badge.iconColorClass}`} />
//                           {transaction.status}
//                         </span>
//                       );
//                     })()}
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-3 text-sm mt-4">
//                     <div>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
//                       <p className="font-medium text-gray-900 dark:text-white">{transaction.amount}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">Currency</p>
//                       <p className="font-medium text-gray-900 dark:text-white">{transaction.currency}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
//                       <p className="font-medium text-gray-900 dark:text-white">{transaction.date}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
//                       <p className="font-medium text-gray-900 dark:text-white">{transaction.time}</p>
//                     </div>
//                     <div className="col-span-2">
//                       <p className="text-xs text-gray-500 dark:text-gray-400">Transaction Hash</p>
//                       <div className="flex items-center">
//                         <p className="font-medium text-gray-900 dark:text-white font-mono text-xs truncate mr-2">{transaction.txHash}</p>
//                         <button 
//                           onClick={() => copyToClipboard(transaction.txHash)}
//                           className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
//                           title="Copy transaction hash"
//                         >
//                           <ClipboardDocumentIcon className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Add view details button to mobile cards */}
//                   <div className="mt-4 flex justify-end">
//                     <button
//                       onClick={() => handleViewDetails(transaction)}
//                       className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors inline-flex items-center text-sm"
//                     >
//                       <EyeIcon className="h-4 w-4 mr-1" />
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
//                 No transactions found
//               </div>
//             )}
//           </div>
          
//           {/* Pagination controls */}
//           {filteredTransactions.length > 0 && (
//             <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
//               <div className="flex-1 flex justify-between sm:hidden">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   Next
//                 </button>
//               </div>
//               <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                 <div>
//                   <p className="text-sm text-gray-700 dark:text-gray-300">
//                     Showing <span className="font-medium">{Math.min((currentPage - 1) * perPage + 1, filteredTransactions.length)}</span> to <span className="font-medium">{Math.min(currentPage * perPage, filteredTransactions.length)}</span> of <span className="font-medium">{filteredTransactions.length}</span> results
//                   </p>
//                 </div>
//                 <div>
//                   <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                       disabled={currentPage === 1}
//                       className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
//                     >
//                       <span className="sr-only">Previous</span>
//                       <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//                     </button>
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                       <button
//                         key={page}
//                         onClick={() => setCurrentPage(page)}
//                         className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                           currentPage === page
//                             ? 'z-10 bg-primary border-primary text-white dark:bg-primary dark:border-primary'
//                             : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                       disabled={currentPage === totalPages}
//                       className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
//                     >
//                       <span className="sr-only">Next</span>
//                       <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//                     </button>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           )}
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
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
//                         <span className={`px-2 py-1 mt-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(selectedTransaction.type)}`}>
//                           {selectedTransaction.type}
//                         </span>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
//                         <p className="text-base font-medium text-gray-900 dark:text-white">{selectedTransaction.amount}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Currency</p>
//                         <p className="text-base font-medium text-gray-900 dark:text-white">{selectedTransaction.currency}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
//                         <p className="text-base font-medium text-gray-900 dark:text-white">{selectedTransaction.date}</p>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">{selectedTransaction.time}</p>
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
                  
//                   {/* Additional Information - could be expanded in a real app */}
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

// export default Transactions; 





import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { 
  CurrencyDollarIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardDocumentIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  XMarkIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
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
  type?: 'Buy' | 'Sell' | 'Transfer' | 'Deposit' | 'Withdrawal'; // Add type for display
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
  stats: {
    currency: CurrencyStats[];
    status: StatusStats[];
    monthly: any[];
  };
}

const Transactions: React.FC = () => {
  const { merchant, token } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [_totalCount, setTotalCount] = useState(0);
  const [pageSize, _setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('Last 30 days');
  const [currencyFilter, setCurrencyFilter] = useState<string>('All');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Payment | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  
  // State for API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Payment[]>([]);
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);
  const [availableStatuses, setAvailableStatuses] = useState<string[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    failed: 0
  });
  
  // Get active filter count
  const activeFilterCount = [
    statusFilter !== 'All',
    typeFilter !== 'All',
    currencyFilter !== 'All',
    dateFilter !== 'Last 30 days'
  ].filter(Boolean).length;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!merchant?.apiKey || !merchant?.apiSecret || !token) {
          throw new Error('Authentication required');
        }

        // Set up headers with auth token and API credentials
        const headers = {
          'Authorization': `Bearer ${token}`,
          'x-api-key': merchant.apiKey,
          'x-api-secret': merchant.apiSecret
        };

        // Fetch both endpoints in parallel
        const [paymentsResponse, statsResponse] = await Promise.all([
          axios.get<PaymentsResponse>(`${URL}/api/payments/merchant/list`, { headers }),
          axios.get<StatsResponse>(`${URL}/api/payments/merchant/stats`, { headers })
        ]);

        // Process payments data
        if (paymentsResponse.data.success) {
          const customerNames = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Wilson'];
          const transactionTypes = ['Buy', 'Sell', 'Transfer', 'Deposit', 'Withdrawal'];
          
          // Add mock customer names and transaction types for display purposes
          const enrichedPayments = paymentsResponse.data.payments.data.map((payment, index) => ({
            ...payment,
            customer: customerNames[index % customerNames.length],
            type: transactionTypes[index % transactionTypes.length] as any
          }));
          
          setTransactions(enrichedPayments);
          setTotalCount(paymentsResponse.data.payments.totalCount);
          setTotalPages(paymentsResponse.data.payments.totalPages);
          setAvailableCurrencies(paymentsResponse.data.filters.currencies);
          setAvailableStatuses(paymentsResponse.data.filters.statuses);
        }

        // Process stats data
        if (statsResponse.data.success) {
          const { stats } = statsResponse.data;
          
          // Extract status counts
          const pendingStats = stats.status.find(s => s.status === 'pending');
          const completedStats = stats.status.find(s => s.status === 'completed');
          const failedStats = stats.status.find(s => s.status === 'failed');
          
          setStats({
            total: stats.status.reduce((sum, stat) => sum + parseInt(stat.count), 0),
            completed: completedStats ? parseInt(completedStats.count) : 0,
            pending: pendingStats ? parseInt(pendingStats.count) : 0,
            failed: failedStats ? parseInt(failedStats.count) : 0
          });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load transaction data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [merchant, token]);

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
          icon: ClockIcon,
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

  // Get transaction type badge color
  const getTypeColor = (type: string | undefined) => {
    switch (type) {
      case 'Buy':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Sell':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Transfer':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Deposit':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Withdrawal':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  // Filter transactions - for now, we're just using local filtering
  // In a real app, you'd likely want to pass these filters to your API
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = searchTerm === '' || 
      (transaction.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (transaction.transactionHash?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      transaction.amount.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || transaction.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === 'All' || transaction.type === typeFilter;
    const matchesCurrency = currencyFilter === 'All' || transaction.currency === currencyFilter;
    
    // For date filter implementation, we would normally use a proper date library
    // This is a simplified implementation
    return matchesSearch && matchesStatus && matchesType && matchesCurrency;
  });

  // Stats data for mobile carousel
  const statsData = [
    {
      name: 'All Transactions',
      value: stats.total.toString(),
      icon: DocumentDuplicateIcon,
      bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
      iconColor: 'text-blue-500 dark:text-blue-400',
    },
    {
      name: 'Completed',
      value: stats.completed.toString(),
      icon: CheckCircleIcon,
      bgColor: 'bg-green-100/50 dark:bg-green-900/20',
      iconColor: 'text-green-500 dark:text-green-400',
    },
    {
      name: 'Pending',
      value: stats.pending.toString(),
      icon: ClockIcon,
      bgColor: 'bg-yellow-100/50 dark:bg-yellow-900/20',
      iconColor: 'text-yellow-500 dark:text-yellow-400',
    },
    {
      name: 'Failed',
      value: stats.failed.toString(),
      icon: XCircleIcon,
      bgColor: 'bg-red-100/50 dark:bg-red-900/20',
      iconColor: 'text-red-500 dark:text-red-400',
    }
  ];

  // Navigate to next stat in carousel
  const nextStat = () => {
    setCurrentStatIndex((prevIndex) => (prevIndex === statsData.length - 1 ? 0 : prevIndex + 1));
  };

  // Navigate to previous stat in carousel
  const prevStat = () => {
    setCurrentStatIndex((prevIndex) => (prevIndex === 0 ? statsData.length - 1 : prevIndex - 1));
  };

  // Function to format date
  const formatDate = (dateString: string): { date: string, time: string } => {
    const date = new Date(dateString);
    return {
      date: date.toISOString().split('T')[0], // YYYY-MM-DD
      time: date.toTimeString().split(' ')[0].substring(0, 8) // HH:MM:SS
    };
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

  // Function to handle opening the details drawer
  const handleViewDetails = (transaction: Payment) => {
    setSelectedTransaction(transaction);
    setIsDrawerOpen(true);
  };

  // Function to get customer initials
  const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
      {/* Add animation keyframes for fade-in/slide-up animations */}
      <style>{`
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
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 animate-fade-in-up opacity-0">
          <div className="flex items-center mb-4">
            <CurrencyDollarIcon className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage all your cryptocurrency transactions.
          </p>
        </div>
        
        {/* Mobile Stats Carousel - Only visible on small screens */}
        <div className="block sm:hidden animate-fade-in-up animation-delay-100 opacity-0">
          <div className="relative">
            {/* Carousel container */}
            <div className="overflow-hidden">
              <div className="relative">
                {/* Current stat card */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full ${statsData[currentStatIndex].bgColor} mr-4`}>
                      {(() => {
                        const StatIcon = statsData[currentStatIndex].icon;
                        return <StatIcon className={`h-6 w-6 ${statsData[currentStatIndex].iconColor}`} />;
                      })()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{statsData[currentStatIndex].name}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{statsData[currentStatIndex].value}</p>
                    </div>
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
                {statsData.map((_, index) => (
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
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Desktop Stats Grid - Hidden on small screens */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up animation-delay-100 opacity-0">
          {/* All Transactions */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100/50 dark:bg-blue-900/20 mr-4">
                <DocumentDuplicateIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">All Transactions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
            </div>
          </div>
          
          {/* Completed Transactions */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100/50 dark:bg-green-900/20 mr-4">
                <CheckCircleIcon className="h-6 w-6 text-green-500 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
              </div>
            </div>
          </div>
          
          {/* Pending Transactions */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100/50 dark:bg-yellow-900/20 mr-4">
                <ClockIcon className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
              </div>
            </div>
          </div>
          
          {/* Failed Transactions */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100/50 dark:bg-red-900/20 mr-4">
                <XCircleIcon className="h-6 w-6 text-red-500 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Failed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.failed}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden animate-fade-in-up animation-delay-200 opacity-0">
          {/* Filters and Search */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="relative rounded-md w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="form-input block w-full pl-10 py-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-primary focus:border-primary"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium relative ${
                    activeFilterCount > 0
                      ? 'text-primary border-primary bg-primary/10 hover:bg-primary/20 dark:text-primary-400 dark:border-primary-400 dark:bg-primary-900/30'
                      : 'text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                >
                  <FunnelIcon className="h-4 w-4 mr-2" />
                  Filter
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    const transactionData = transactions.map(t => ({
                      id: t.id,
                      amount: t.amount,
                      currency: t.currency,
                      status: t.status,
                      createdAt: t.createdAt,
                      transactionHash: t.transactionHash || 'N/A'
                    }));
                    copyToClipboard(JSON.stringify(transactionData, null, 2));
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Export
                </button>
                {filterOpen && (
                  <div className="origin-top-right absolute mt-12 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1 p-2" role="menu" aria-orientation="vertical">
                      <div className="px-3 py-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                        <select 
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                        >
                          <option value="All">All Statuses</option>
                          {availableStatuses.map(status => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="px-3 py-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Currency</label>
                        <select 
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                          value={currencyFilter}
                          onChange={(e) => setCurrencyFilter(e.target.value)}
                        >
                          <option value="All">All Currencies</option>
                          {availableCurrencies.map(currency => (
                            <option key={currency} value={currency}>{currency}</option>
                          ))}
                        </select>
                      </div>
                      <div className="px-3 py-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                        <select 
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                          value={typeFilter}
                          onChange={(e) => setTypeFilter(e.target.value)}
                        >
                          <option value="All">All Types</option>
                          <option value="Buy">Buy</option>
                          <option value="Sell">Sell</option>
                          <option value="Transfer">Transfer</option>
                          <option value="Deposit">Deposit</option>
                          <option value="Withdrawal">Withdrawal</option>
                        </select>
                      </div>
                      <div className="px-3 py-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date Range</label>
                        <select 
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                        >
                          <option value="Last 7 days">Last 7 days</option>
                          <option value="Last 30 days">Last 30 days</option>
                          <option value="Last 90 days">Last 90 days</option>
                          <option value="All time">All time</option>
                        </select>
                      </div>
                      <div className="px-3 py-2 flex justify-between">
                        <button
                          type="button"
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                          onClick={() => {
                            setStatusFilter('All');
                            setTypeFilter('All');
                            setCurrencyFilter('All');
                            setDateFilter('Last 30 days');
                          }}
                        >
                          Clear filters
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          onClick={() => setFilterOpen(false)}
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Currency
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
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
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => {
                    const { date, time } = formatDate(transaction.createdAt);
                    return (
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
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(transaction.type)}`}>
                            {transaction.type || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{transaction.amount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{transaction.currency}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{date}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {(() => {
                            const badge = getStatusBadge(transaction.status);
                            const BadgeIcon = badge.icon;
                            return (
                              <span className={`px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full border ${badge.colorClass}`}>
                                <BadgeIcon className={`h-3.5 w-3.5 mr-1 ${badge.iconColorClass}`} />
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </span>
                            );
                          })()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <span className="font-mono mr-2">
                              {transaction.transactionHash 
                                ? `${transaction.transactionHash.substring(0, 10)}...` 
                                : 'N/A'}
                            </span>
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
                            onClick={() => handleViewDetails(transaction)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            title="View details"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Stacked cards for small screens */}
          <div className="sm:hidden divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => {
                const { date, time } = formatDate(transaction.createdAt);
                return (
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
                          <div className="mt-1">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(transaction.type)}`}>
                              {transaction.type || 'Unknown'}
                            </span>
                          </div>
                        </div>
                      </div>
                      {(() => {
                        const badge = getStatusBadge(transaction.status);
                        const BadgeIcon = badge.icon;
                        return (
                          <span className={`px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full border ${badge.colorClass}`}>
                            <BadgeIcon className={`h-3.5 w-3.5 mr-1 ${badge.iconColorClass}`} />
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        );
                      })()}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm mt-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
                        <p className="font-medium text-gray-900 dark:text-white">{transaction.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Currency</p>
                        <p className="font-medium text-gray-900 dark:text-white">{transaction.currency}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                        <p className="font-medium text-gray-900 dark:text-white">{date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
                        <p className="font-medium text-gray-900 dark:text-white">{time}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Transaction Hash</p>
                        <div className="flex items-center">
                          <p className="font-medium text-gray-900 dark:text-white font-mono text-xs truncate mr-2">
                            {transaction.transactionHash || 'Not available yet'}
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
                    
                    {/* Add view details button to mobile cards */}
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleViewDetails(transaction)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors inline-flex items-center text-sm"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                No transactions found
              </div>
            )}
          </div>
          
          {/* Pagination controls */}
          {filteredTransactions.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
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
                    Showing <span className="font-medium">{Math.min((currentPage - 1) * pageSize + 1, filteredTransactions.length)}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, filteredTransactions.length)}</span> of <span className="font-medium">{filteredTransactions.length}</span> results
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
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      // Show at most 5 page buttons
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === pageNum
                              ? 'z-10 bg-primary border-primary text-white dark:bg-primary dark:border-primary'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
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
                        <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                        <span className={`px-2 py-1 mt-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(selectedTransaction.type)}`}>
                          {selectedTransaction.type || 'Unknown'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">{selectedTransaction.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Currency</p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">{selectedTransaction.currency}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {formatDate(selectedTransaction.createdAt).date}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(selectedTransaction.createdAt).time}
                        </p>
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
                        <p className="text-sm text-gray-500 dark:text-gray-400">Fee</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {parseFloat(selectedTransaction.amount) * 0.01 > 0.0001 
                            ? (parseFloat(selectedTransaction.amount) * 0.01).toFixed(4) 
                            : '0.0001'} {selectedTransaction.currency}
                        </p>
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

export default Transactions;