// import React, { useState } from 'react';
// import DashboardLayout from '../../components/dashboard/DashboardLayout';
// import { 
//   CreditCardIcon, 
//   PlusIcon, 
//   TrashIcon, 
//   PencilIcon, 
//   ArrowUpIcon, 
//   ArrowDownIcon,
//   BanknotesIcon,
//   ClockIcon,
//   CheckCircleIcon,
//   XCircleIcon,
//   XMarkIcon,
//   MagnifyingGlassIcon,
//   ArrowPathIcon,
//   CurrencyDollarIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   FunnelIcon
// } from '@heroicons/react/24/outline';
// import axios from 'axios';
// import { URL } from '../../url'
// import { useAuth } from '../../context/AuthContext';



// interface PaymentMethod {
//   id: string;
//   type: 'card' | 'bank' | 'crypto';
//   name: string;
//   details: string;
//   isDefault: boolean;
//   expiryDate?: string;
// }

// interface Transaction {
//   id: string;
//   date: string;
//   amount: string;
//   status: 'completed' | 'pending' | 'failed';
//   method: string;
//   description: string;
//   recipient: string;
// }

// const Payments: React.FC = () => {
//   // State for active tab
//   const [activeTab, setActiveTab] = useState<'methods' | 'transactions'>('methods');
//   // State for mobile stats carousel
//   const [currentStatIndex, setCurrentStatIndex] = useState(0);
//   // State for payment modal
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   // State for add payment method modal
//   const [isAddMethodModalOpen, setIsAddMethodModalOpen] = useState(false);
//   // State for edit payment method modal
//   const [isEditMethodModalOpen, setIsEditMethodModalOpen] = useState(false);
//   // State for delete confirmation modal
//   const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
//   // State for method being edited or deleted
//   const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  
//   // State for new payment method
//   const [newPaymentMethod, setNewPaymentMethod] = useState<{
//     type: 'bank' | 'crypto';
//     name: string;
//     details: string;
//     isDefault: boolean;
//   }>({
//     type: 'bank',
//     name: '',
//     details: '',
//     isDefault: false
//   });
  
//   // State for edited payment method
//   const [editedPaymentMethod, setEditedPaymentMethod] = useState<{
//     type: 'bank' | 'crypto';
//     name: string;
//     details: string;
//     isDefault: boolean;
//   }>({
//     type: 'bank',
//     name: '',
//     details: '',
//     isDefault: false
//   });
  
//   // State for payment methods
//   const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
//     {
//       id: '1',
//       type: 'bank',
//       name: 'Chase Bank Account',
//       details: 'Account ending in 6789',
//       isDefault: false
//     },
//     {
//       id: '2',
//       type: 'crypto',
//       name: 'Bitcoin Wallet',
//       details: 'Address: 3FZbgi29...8j7',
//       isDefault: true
//     }
//   ]);

//   // State for transactions
//   const [transactions, setTransactions] = useState<Transaction[]>([
//     {
//       id: 't1',
//       date: '2023-05-28',
//       amount: '$75.50',
//       status: 'pending',
//       method: 'Bitcoin Wallet',
//       description: 'Crypto transfer',
//       recipient: 'External Wallet'
//     },
//     {
//       id: 't2',
//       date: '2023-05-25',
//       amount: '$120.00',
//       status: 'completed',
//       method: 'Chase Bank Account',
//       description: 'FIAT Transfer',
//       recipient: 'External Wallet'
//     },
//     {
//       id: 't3',
//       date: '2023-05-15',
//       amount: '$350.00',
//       status: 'completed',
//       method: 'Bitcoin Wallet',
//       description: 'Crypto purchase',
//       recipient: 'Crypto Exchange'
//     },
//     {
//       id: 't4',
//       date: '2023-05-12',
//       amount: '$42.75',
//       status: 'failed',
//       method: 'Chase Bank Account',
//       description: 'Payment attempt',
//       recipient: 'Online Store'
//     },
//     {
//       id: 't5',
//       date: '2023-05-08',
//       amount: '$180.25',
//       status: 'completed',
//       method: 'Bitcoin Wallet',
//       description: 'Crypto exchange',
//       recipient: 'Trading Platform'
//     },
//     {
//       id: 't6',
//       date: '2023-05-04',
//       amount: '$95.00',
//       status: 'pending',
//       method: 'Chase Bank Account',
//       description: 'Monthly subscription',
//       recipient: 'Streaming Service'
//     },
//     {
//       id: 't7',
//       date: '2023-04-28',
//       amount: '$250.00',
//       status: 'completed',
//       method: 'Bitcoin Wallet',
//       description: 'Investment purchase',
//       recipient: 'Crypto Fund'
//     },
//     {
//       id: 't8',
//       date: '2023-04-22',
//       amount: '$68.50',
//       status: 'failed',
//       method: 'Chase Bank Account',
//       description: 'Failed withdrawal',
//       recipient: 'ATM Transaction'
//     },
//     {
//       id: 't9',
//       date: '2023-04-18',
//       amount: '$125.75',
//       status: 'completed',
//       method: 'Bitcoin Wallet',
//       description: 'Token purchase',
//       recipient: 'NFT Marketplace'
//     },
//     {
//       id: 't10',
//       date: '2023-04-12',
//       amount: '$32.99',
//       status: 'failed',
//       method: 'Chase Bank Account',
//       description: 'Declined payment',
//       recipient: 'Digital Goods Store'
//     },
//     {
//       id: 't11',
//       date: '2023-04-08',
//       amount: '$150.00',
//       status: 'completed',
//       method: 'Bitcoin Wallet',
//       description: 'Wallet funding',
//       recipient: 'Crypto Exchange'
//     },
//     {
//       id: 't12',
//       date: '2023-04-01',
//       amount: '$200.00',
//       status: 'completed',
//       method: 'Chase Bank Account',
//       description: 'Fund transfer',
//       recipient: 'Savings Account'
//     }
//   ]);

//   // State for new payment
//   const [newPayment, setNewPayment] = useState({
//     amount: '',
//     description: '',
//     method: ''
//   });

//   // State for search term
//   const [searchTerm, setSearchTerm] = useState('');

//   // State for pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // State for filter dropdown
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   // State for filter values
//   const [filters, setFilters] = useState({
//     method: 'All',
//     status: 'All'
//   });

//   // Payment statistics
//   const paymentStats = [
//     {
//       name: 'Total Payments',
//       value: '$1,245.50',
//       change: '+8.5%',
//       isIncrease: true,
//       icon: BanknotesIcon,
//       bgColor: 'bg-blue-100 dark:bg-blue-900/30',
//       textColor: 'text-blue-600 dark:text-blue-400',
//       iconColor: 'text-blue-500 dark:text-blue-400',
//     },
//     {
//       name: 'Pending',
//       value: '$75.50',
//       change: '-2.3%',
//       isIncrease: false,
//       icon: ClockIcon,
//       bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
//       textColor: 'text-yellow-600 dark:text-yellow-400',
//       iconColor: 'text-yellow-500 dark:text-yellow-400',
//     },
//     {
//       name: 'Successful',
//       value: '$1,125.00',
//       change: '+10.2%',
//       isIncrease: true,
//       icon: CheckCircleIcon,
//       bgColor: 'bg-green-100 dark:bg-green-900/30',
//       textColor: 'text-green-600 dark:text-green-400',
//       iconColor: 'text-green-500 dark:text-green-400',
//     },
//     {
//       name: 'Failed',
//       value: '$45.99',
//       change: '-15.0%',
//       isIncrease: false,
//       icon: XCircleIcon,
//       bgColor: 'bg-red-100 dark:bg-red-900/30',
//       textColor: 'text-red-600 dark:text-red-400',
//       iconColor: 'text-red-500 dark:text-red-400',
//     },
//   ];

//   // Filter transactions based on search term and filters
//   const filteredTransactions = transactions.filter(transaction => {
//     // Search term filter
//     const matchesSearch = searchTerm === '' || 
//       transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       transaction.amount.toLowerCase().includes(searchTerm.toLowerCase());
    
//     // Method filter
//     const matchesMethod = filters.method === 'All' || transaction.method === filters.method;
    
//     // Status filter
//     const matchesStatus = filters.status === 'All' || 
//       transaction.status === filters.status.toLowerCase();
    
//     // Return true only if all conditions are met
//     return matchesSearch && matchesMethod && matchesStatus;
//   });

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

//   // Handle page change
//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   // Navigate to next stat in carousel
//   const nextStat = () => {
//     setCurrentStatIndex((prevIndex) => (prevIndex === paymentStats.length - 1 ? 0 : prevIndex + 1));
//   };

//   // Navigate to previous stat in carousel
//   const prevStat = () => {
//     setCurrentStatIndex((prevIndex) => (prevIndex === 0 ? paymentStats.length - 1 : prevIndex - 1));
//   };

//   // Handle setting default payment method
//   const handleSetDefault = (id: string) => {
//     setPaymentMethods(
//       paymentMethods.map(method => ({
//         ...method,
//         isDefault: method.id === id
//       }))
//     );
//   };

//   // Handle editing payment method
//   const handleEditMethod = (id: string) => {
//     const methodToEdit = paymentMethods.find(method => method.id === id);
//     if (!methodToEdit) return;
    
//     setEditedPaymentMethod({
//       type: methodToEdit.type as 'bank' | 'crypto',
//       name: methodToEdit.name,
//       details: methodToEdit.details,
//       isDefault: methodToEdit.isDefault
//     });
    
//     setSelectedMethodId(id);
//     setIsEditMethodModalOpen(true);
//   };
  
//   // Handle updating payment method
//   const handleUpdateMethod = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!selectedMethodId) return;
    
//     // If edited method is being set as default, update other methods
//     if (editedPaymentMethod.isDefault) {
//       setPaymentMethods(
//         paymentMethods.map(method => ({
//           ...method,
//           isDefault: false
//         }))
//       );
//     }
    
//     // Update the method
//     setPaymentMethods(
//       paymentMethods.map(method => 
//         method.id === selectedMethodId
//           ? {
//               ...method,
//               type: editedPaymentMethod.type,
//               name: editedPaymentMethod.name,
//               details: editedPaymentMethod.details,
//               isDefault: editedPaymentMethod.isDefault
//             }
//           : method
//       )
//     );
    
//     // Reset form and close modal
//     setEditedPaymentMethod({
//       type: 'bank',
//       name: '',
//       details: '',
//       isDefault: false
//     });
//     setSelectedMethodId(null);
//     setIsEditMethodModalOpen(false);
//   };
  
//   // Handle opening delete confirmation
//   const handleDeleteConfirmation = (id: string) => {
//     setSelectedMethodId(id);
//     setIsDeleteConfirmModalOpen(true);
//   };
  
//   // Handle confirming deletion
//   const handleConfirmDelete = () => {
//     if (selectedMethodId) {
//       // Get the method being deleted
//       const methodToDelete = paymentMethods.find(method => method.id === selectedMethodId);
      
//       // Remove the method
//       setPaymentMethods(paymentMethods.filter(method => method.id !== selectedMethodId));
      
//       // If the deleted method was default, set the first remaining method as default (if any)
//       if (methodToDelete?.isDefault && paymentMethods.length > 1) {
//         const remainingMethods = paymentMethods.filter(method => method.id !== selectedMethodId);
//         if (remainingMethods.length > 0) {
//           setPaymentMethods(
//             remainingMethods.map((method, index) => ({
//               ...method,
//               isDefault: index === 0 // Set the first method as default
//             }))
//           );
//         }
//       }
      
//       setSelectedMethodId(null);
//       setIsDeleteConfirmModalOpen(false);
//     }
//   };

//   // Handle submitting new payment
//   const handleSubmitPayment = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Here you would typically process the payment
//     // For now, we'll just add it to the transactions list
//     const newTransaction: Transaction = {
//       id: `t${transactions.length + 1}`,
//       date: new Date().toISOString().split('T')[0],
//       amount: `$${newPayment.amount}`,
//       status: 'pending',
//       method: newPayment.method,
//       description: newPayment.description,
//       recipient: 'Wallet Transfer' // Default recipient since we removed the field
//     };
    
//     setTransactions([newTransaction, ...transactions]);
    
//     // Reset form
//     setNewPayment({
//       amount: '',
//       description: '',
//       method: ''
//     });
    
//     // Close the payment modal and switch to transactions tab
//     setIsPaymentModalOpen(false);
//     setActiveTab('transactions');
//   };

//   // Handle adding new payment method
//   const handleAddMethod = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const newMethod: PaymentMethod = {
//       id: `m${paymentMethods.length + 1}`,
//       ...newPaymentMethod
//     };
    
//     // If new method is default, update other methods
//     if (newMethod.isDefault) {
//       setPaymentMethods(
//         paymentMethods.map(method => ({
//           ...method,
//           isDefault: false
//         }))
//       );
//     }
    
//     // Add the new method to the list
//     setPaymentMethods([...paymentMethods, newMethod]);
    
//     // Reset form and close modal
//     setNewPaymentMethod({
//       type: 'bank',
//       name: '',
//       details: '',
//       isDefault: false
//     });
//     setIsAddMethodModalOpen(false);
//   };

//   // Get unique payment methods from transactions for filter dropdown
//   const uniqueMethods = ['All', ...Array.from(new Set(transactions.map(t => t.method)))];
  
//   // Status options for filter dropdown
//   const statusOptions = ['All', 'Completed', 'Pending', 'Failed'];
  
//   // Handle filter change
//   const handleFilterChange = (filterType: 'method' | 'status', value: string) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterType]: value
//     }));
//   };
  
//   // Clear all filters
//   const clearFilters = () => {
//     setFilters({
//       method: 'All',
//       status: 'All'
//     });
//   };

//   return (
//     <DashboardLayout>
//       {/* Add animation keyframes */}
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
        
//         @keyframes pop-in {
//           0% {
//             opacity: 0;
//             transform: scale(0.95) translateY(20px);
//           }
//           50% {
//             transform: scale(1.02) translateY(0);
//           }
//           100% {
//             opacity: 1;
//             transform: scale(1) translateY(0);
//           }
//         }
        
//         @keyframes slide-in-right {
//           0% {
//             opacity: 0;
//             transform: translateX(40px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         .animate-fade-in-up {
//           animation: fade-in-up 0.6s ease-out forwards;
//         }
        
//         .animate-pop-in {
//           animation: pop-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
//         }
        
//         .animate-slide-in-right {
//           animation: slide-in-right 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
//         }

//         .animation-delay-50 {
//           animation-delay: 0.05s;
//         }
        
//         .animation-delay-100 {
//           animation-delay: 0.1s;
//         }
        
//         .animation-delay-150 {
//           animation-delay: 0.15s;
//         }
        
//         .animation-delay-200 {
//           animation-delay: 0.2s;
//         }
        
//         .animation-delay-250 {
//           animation-delay: 0.25s;
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
//       `}</style>

//       <div className="space-y-6">
//         {/* Header section */}
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 animate-fade-in-up opacity-0">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <div className="flex items-center mb-2">
//                 <CreditCardIcon className="h-6 w-6 text-primary mr-3" />
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payments</h2>
//               </div>
//               <p className="text-gray-600 dark:text-gray-300">
//                 Manage your payment methods, transactions, and make new payments.
//               </p>
//             </div>
//             <div className="mt-4 md:mt-0">
//               <button
//                 onClick={() => setIsPaymentModalOpen(true)}
//                 className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//               >
//                 <CurrencyDollarIcon className="-ml-1 mr-2 h-5 w-5" />
//                 Send Payment
//               </button>
//             </div>
//           </div>
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
//                     <div className={`p-3 rounded-full ${paymentStats[currentStatIndex].bgColor} mr-4`}>
//                       {(() => {
//                         const StatIcon = paymentStats[currentStatIndex].icon;
//                         return <StatIcon className={`h-6 w-6 ${paymentStats[currentStatIndex].iconColor}`} />;
//                       })()}
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{paymentStats[currentStatIndex].name}</p>
//                       <p className="text-2xl font-bold text-gray-900 dark:text-white">{paymentStats[currentStatIndex].value}</p>
//                     </div>
//                   </div>
//                   <div className="mt-4 flex items-center justify-between">
//                     <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
//                       paymentStats[currentStatIndex].isIncrease ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
//                     }`}>
//                       {paymentStats[currentStatIndex].isIncrease ? (
//                         <ArrowUpIcon className="h-3 w-3 mr-1" />
//                       ) : (
//                         <ArrowDownIcon className="h-3 w-3 mr-1" />
//                       )}
//                       {paymentStats[currentStatIndex].change}
//                     </div>
//                     <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
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
//                 {paymentStats.map((_, index) => (
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
//         <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up animation-delay-100 opacity-0">
//           {paymentStats.map((stat) => (
//             <div 
//               key={stat.name} 
//               className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
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
//             </div>
//           ))}
//         </div>

//         {/* Tabs */}
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden animate-fade-in-up animation-delay-200 opacity-0">
//           <div className="border-b border-gray-200 dark:border-gray-700">
//             <nav className="-mb-px flex">
//               <button
//                 onClick={() => setActiveTab('methods')}
//                 className={`py-4 px-6 text-sm font-medium ${
//                   activeTab === 'methods'
//                     ? 'border-b-2 border-primary text-primary'
//                     : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//                 }`}
//               >
//                 Payment Methods
//               </button>
//               <button
//                 onClick={() => setActiveTab('transactions')}
//                 className={`py-4 px-6 text-sm font-medium ${
//                   activeTab === 'transactions'
//                     ? 'border-b-2 border-primary text-primary'
//                     : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//                 }`}
//               >
//                 Transactions
//               </button>
//             </nav>
//           </div>

//           {/* Payment Methods Tab */}
//           {activeTab === 'methods' && (
//             <div className="p-6">
//               <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4 xs:gap-0 mb-6">
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Payment Methods</h3>
//                 <button 
//                   onClick={() => setIsAddMethodModalOpen(true)}
//                   className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                 >
//                   <PlusIcon className="-ml-1 mr-1 h-4 w-4" />
//                   Add Method
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 {paymentMethods.map((method, index) => (
//                   <div 
//                     key={method.id} 
//                     className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 animate-fade-in-up opacity-0"
//                     style={{ animationDelay: `${0.3 + index * 0.05}s` }}
//                   >
//                     <div className="flex items-start flex-1">
//                       <div className={`p-2 rounded-full flex-shrink-0 ${
//                         method.type === 'card' 
//                           ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
//                           : method.type === 'bank' 
//                             ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
//                             : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
//                       } mr-4 mt-1`}>
//                         {method.type === 'card' && <CreditCardIcon className="h-5 w-5" />}
//                         {method.type === 'bank' && <BanknotesIcon className="h-5 w-5" />}
//                         {method.type === 'crypto' && <CurrencyDollarIcon className="h-5 w-5" />}
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex flex-wrap items-center gap-2">
//                           <p className="text-sm font-medium text-gray-900 dark:text-white">{method.name}</p>
//                           {method.isDefault && (
//                             <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
//                               Default
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{method.details}</p>
//                       </div>
//                     </div>
                    
//                     <div className="flex flex-wrap gap-2 justify-end mt-3 sm:mt-0 border-t sm:border-t-0 pt-3 sm:pt-0">
//                       {!method.isDefault && (
//                         <button 
//                           onClick={() => handleSetDefault(method.id)}
//                           className="px-2 py-1.5 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                         >
//                           Set Default
//                         </button>
//                       )}
//                       <button 
//                         onClick={() => handleEditMethod(method.id)}
//                         className="p-1.5 rounded-md bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-indigo-800/30"
//                         aria-label="Edit"
//                       >
//                         <PencilIcon className="h-4 w-4" />
//                       </button>
//                       <button 
//                         onClick={() => handleDeleteConfirmation(method.id)}
//                         className="p-1.5 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-800/30"
//                         aria-label="Delete"
//                       >
//                         <TrashIcon className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
                
//                 {paymentMethods.length === 0 && (
//                   <div className="text-center py-8 animate-fade-in-up animation-delay-300 opacity-0">
//                     <CreditCardIcon className="mx-auto h-12 w-12 text-gray-400" />
//                     <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No payment methods</h3>
//                     <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                       Get started by adding a new payment method.
//                     </p>
//                     <div className="mt-6">
//                       <button
//                         type="button"
//                         className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                       >
//                         <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
//                         Add Payment Method
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Transactions Tab */}
//           {activeTab === 'transactions' && (
//             <div className="p-6">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Transactions</h3>
//                 <div className="flex items-center space-x-2">
//                   <div className="relative flex-1">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-white sm:text-sm"
//                       placeholder="Search transactions..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                   </div>
                  
//                   {/* Filter Button and Dropdown */}
//                   <div className="relative">
//                     <button 
//                       onClick={() => setIsFilterOpen(!isFilterOpen)}
//                       className={`p-2 border rounded-md flex items-center justify-center ${
//                         (filters.method !== 'All' || filters.status !== 'All')
//                           ? 'text-primary border-primary bg-primary/10 hover:bg-primary/20'
//                           : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border-gray-300 dark:border-gray-600'
//                       }`}
//                       aria-label="Filter transactions"
//                     >
//                       <FunnelIcon className="h-5 w-5" />
//                       {(filters.method !== 'All' || filters.status !== 'All') && (
//                         <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
//                           {(filters.method !== 'All' ? 1 : 0) + (filters.status !== 'All' ? 1 : 0)}
//                         </span>
//                       )}
//                     </button>
                    
//                     {/* Filter Dropdown */}
//                     {isFilterOpen && (
//                       <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
//                         <div className="p-4">
//                           <div className="flex justify-between items-center mb-4">
//                             <h3 className="text-sm font-medium text-gray-900 dark:text-white">Filters</h3>
//                             <button 
//                               onClick={() => setIsFilterOpen(false)} 
//                               className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
//                             >
//                               <XMarkIcon className="h-5 w-5" />
//                             </button>
//                           </div>
                          
//                           {/* Method Filter */}
//                           <div className="mb-4">
//                             <label htmlFor="methodFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                               Payment Method
//                             </label>
//                             <select
//                               id="methodFilter"
//                               className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm"
//                               value={filters.method}
//                               onChange={(e) => handleFilterChange('method', e.target.value)}
//                             >
//                               {uniqueMethods.map((method) => (
//                                 <option key={method} value={method}>{method}</option>
//                               ))}
//                             </select>
//                           </div>
                          
//                           {/* Status Filter */}
//                           <div className="mb-4">
//                             <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                               Status
//                             </label>
//                             <select
//                               id="statusFilter"
//                               className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm"
//                               value={filters.status}
//                               onChange={(e) => handleFilterChange('status', e.target.value)}
//                             >
//                               {statusOptions.map((status) => (
//                                 <option key={status} value={status}>{status}</option>
//                               ))}
//                             </select>
//                           </div>
                          
//                           {/* Filter Actions */}
//                           <div className="flex justify-between">
//                             <button
//                               onClick={clearFilters}
//                               className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
//                             >
//                               Clear filters
//                             </button>
//                             <button
//                               onClick={() => setIsFilterOpen(false)}
//                               className="px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary/90"
//                             >
//                               Apply
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
                  
//                   <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md">
//                     <ArrowPathIcon className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="overflow-x-auto animate-fade-in-up animation-delay-300 opacity-0">
//                 {/* Desktop table - hide on small screens */}
//                 <table className="hidden sm:table min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                   <thead className="bg-gray-50 dark:bg-gray-700">
//                     <tr>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                         Date
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                         Description
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                         Recipient
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                         Method
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                         Amount
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                         Status
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                     {currentTransactions.map((transaction) => (
//                       <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                           {transaction.date}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900 dark:text-white">{transaction.description}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900 dark:text-white">{transaction.recipient}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900 dark:text-white">{transaction.method}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.amount}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${
//                             transaction.status === 'completed' 
//                               ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800' 
//                               : transaction.status === 'pending'
//                                 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
//                                 : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
//                           }`}>
//                             {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
                
//                 {/* Mobile stacked cards - only show on small screens */}
//                 <div className="sm:hidden space-y-4">
//                   {currentTransactions.map((transaction) => (
//                     <div key={transaction.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
//                       <div className="p-4">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <span className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</span>
//                             <h3 className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{transaction.amount}</h3>
//                           </div>
//                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${
//                             transaction.status === 'completed' 
//                               ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800' 
//                               : transaction.status === 'pending'
//                                 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
//                                 : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
//                           }`}>
//                             {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
//                           </span>
//                         </div>
                        
//                         <div className="mt-4 grid grid-cols-2 gap-3">
//                           <div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">Description</p>
//                             <p className="text-sm font-medium text-gray-900 dark:text-white">{transaction.description}</p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">Recipient</p>
//                             <p className="text-sm font-medium text-gray-900 dark:text-white">{transaction.recipient}</p>
//                           </div>
//                           <div className="col-span-2">
//                             <p className="text-xs text-gray-500 dark:text-gray-400">Payment Method</p>
//                             <p className="text-sm font-medium text-gray-900 dark:text-white">{transaction.method}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
                  
//                   {currentTransactions.length === 0 && (
//                     <div className="text-center py-8">
//                       <p className="text-gray-500 dark:text-gray-400">No transactions found matching your search criteria.</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               {filteredTransactions.length === 0 && searchTerm && (
//                 <div className="text-center py-8 hidden sm:block">
//                   <p className="text-gray-500 dark:text-gray-400">No transactions found matching your search criteria.</p>
//                 </div>
//               )}
              
//               {/* Pagination controls */}
//               {filteredTransactions.length > 0 && (
//                 <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
//                   <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                     <div>
//                       <p className="text-sm text-gray-700 dark:text-gray-300">
//                         Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
//                         <span className="font-medium">
//                           {indexOfLastItem > filteredTransactions.length ? filteredTransactions.length : indexOfLastItem}
//                         </span>{' '}
//                         of <span className="font-medium">{filteredTransactions.length}</span> results
//                       </p>
//                     </div>
//                     <div>
//                       <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                         <button
//                           onClick={() => handlePageChange(currentPage - 1)}
//                           disabled={currentPage === 1}
//                           className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium ${
//                             currentPage === 1
//                               ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
//                               : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
//                           }`}
//                         >
//                           <span className="sr-only">Previous</span>
//                           <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//                         </button>
                        
//                         {/* Page numbers */}
//                         {Array.from({ length: totalPages }).map((_, index) => (
//                           <button
//                             key={index}
//                             onClick={() => handlePageChange(index + 1)}
//                             className={`relative inline-flex items-center px-4 py-2 border ${
//                               currentPage === index + 1
//                                 ? 'bg-primary text-white border-primary'
//                                 : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//                             } text-sm font-medium`}
//                           >
//                             {index + 1}
//                           </button>
//                         ))}
                        
//                         <button
//                           onClick={() => handlePageChange(currentPage + 1)}
//                           disabled={currentPage === totalPages}
//                           className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium ${
//                             currentPage === totalPages
//                               ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
//                               : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
//                           }`}
//                         >
//                           <span className="sr-only">Next</span>
//                           <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//                         </button>
//                       </nav>
//                     </div>
//                   </div>
                  
//                   {/* Mobile pagination */}
//                   <div className="flex items-center justify-between sm:hidden">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
//                         currentPage === 1
//                           ? 'text-gray-300 dark:text-gray-600 bg-white dark:bg-gray-800 cursor-not-allowed'
//                           : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
//                       }`}
//                     >
//                       Previous
//                     </button>
//                     <div className="text-sm text-gray-700 dark:text-gray-300">
//                       <span>Page {currentPage} of {totalPages}</span>
//                     </div>
//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
//                         currentPage === totalPages
//                           ? 'text-gray-300 dark:text-gray-600 bg-white dark:bg-gray-800 cursor-not-allowed'
//                           : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
//                       }`}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Send Payment Modal */}
//       {isPaymentModalOpen && (
//         <div className="fixed inset-0 overflow-y-auto z-50">
//           <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             {/* Overlay */}
//             <div 
//               className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity animate-fade-in-up" 
//               style={{animationDuration: '0.2s'}}
//               aria-hidden="true"
//               onClick={() => setIsPaymentModalOpen(false)}
//             ></div>
            
//             {/* Modal */}
//             <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-pop-in" style={{animationDuration: '0.3s'}}>
//               <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">Send a Payment</h3>
//                 <button 
//                   onClick={() => setIsPaymentModalOpen(false)} 
//                   className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
//                 >
//                   <XMarkIcon className="h-6 w-6" />
//                 </button>
//               </div>
              
//               <div className="p-6">
//                 <form onSubmit={handleSubmitPayment} className="space-y-6">
//                   <div className="grid grid-cols-1 gap-6">
//                     <div>
//                       <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Amount
//                       </label>
//                       <div className="mt-1 relative rounded-md shadow-sm">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
//                         </div>
//                         <input
//                           type="text"
//                           name="amount"
//                           id="amount"
//                           className="block w-full pl-7 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-white sm:text-sm"
//                           placeholder="0.00"
//                           value={newPayment.amount}
//                           onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
//                           required
//                         />
//                         <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                           <span className="text-gray-500 dark:text-gray-400 sm:text-sm">USD</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Description
//                       </label>
//                       <textarea
//                         name="description"
//                         id="description"
//                         rows={4}
//                         className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                         placeholder="What's this payment for?"
//                         value={newPayment.description}
//                         onChange={(e) => setNewPayment({...newPayment, description: e.target.value})}
//                         required
//                       ></textarea>
//                     </div>
                    
//                     <div>
//                       <label htmlFor="method" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Payment Method
//                       </label>
//                       <select
//                         id="method"
//                         name="method"
//                         className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                         value={newPayment.method}
//                         onChange={(e) => setNewPayment({...newPayment, method: e.target.value})}
//                         required
//                       >
//                         <option value="">Select a payment method</option>
//                         {paymentMethods.map(method => (
//                           <option key={method.id} value={method.name}>
//                             {method.name}
//                           </option>
//                         ))}
//                       </select>
                      
//                       {/* Display selected payment method details */}
//                       {newPayment.method && (
//                         <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-md">
//                           {(() => {
//                             const selectedMethod = paymentMethods.find(m => m.name === newPayment.method);
//                             if (!selectedMethod) return null;
                            
//                             return (
//                               <div className="flex items-start">
//                                 <div className={`p-2 rounded-full ${
//                                   selectedMethod.type === 'card' 
//                                     ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
//                                     : selectedMethod.type === 'bank' 
//                                       ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
//                                       : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
//                                 } mr-3 mt-0.5 flex-shrink-0`}>
//                                   {selectedMethod.type === 'card' && <CreditCardIcon className="h-4 w-4" />}
//                                   {selectedMethod.type === 'bank' && <BanknotesIcon className="h-4 w-4" />}
//                                   {selectedMethod.type === 'crypto' && <CurrencyDollarIcon className="h-4 w-4" />}
//                                 </div>
//                                 <div>
//                                   <p className="text-sm font-medium text-gray-800 dark:text-white">
//                                     {selectedMethod.name}
//                                     {selectedMethod.isDefault && (
//                                       <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
//                                         Default
//                                       </span>
//                                     )}
//                                   </p>
//                                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{selectedMethod.details}</p>
//                                   {selectedMethod.expiryDate && (
//                                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
//                                       Expires: {selectedMethod.expiryDate}
//                                     </p>
//                                   )}
//                                 </div>
//                               </div>
//                             );
//                           })()}
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Payment Summary */}
//                   {newPayment.amount && newPayment.method && (
//                     <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
//                       <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Payment Summary</h4>
//                       <div className="bg-gray-50 dark:bg-gray-700/50 rounded-md p-4 space-y-2">
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600 dark:text-gray-400">Amount:</span>
//                           <span className="text-gray-900 dark:text-white font-medium">${newPayment.amount || '0.00'}</span>
//                         </div>
                        
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600 dark:text-gray-400">Network Fee:</span>
//                           <span className="text-gray-900 dark:text-white font-medium">
//                             $
//                             {(() => {
//                               // Calculate a mock fee based on amount and payment method
//                               const amount = parseFloat(newPayment.amount) || 0;
//                               const selectedMethod = paymentMethods.find(m => m.name === newPayment.method);
//                               let feePercentage = 0;
                              
//                               if (selectedMethod) {
//                                 switch (selectedMethod.type) {
//                                   case 'card': feePercentage = 0.029; break;
//                                   case 'bank': feePercentage = 0.01; break;
//                                   case 'crypto': feePercentage = 0.015; break;
//                                   default: feePercentage = 0.02;
//                                 }
//                               }
                              
//                               const fee = (amount * feePercentage).toFixed(2);
//                               return fee;
//                             })()}
//                           </span>
//                         </div>
                        
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-600 dark:text-gray-400">Processing Fee:</span>
//                           <span className="text-gray-900 dark:text-white font-medium">$0.30</span>
//                         </div>
                        
//                         <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
//                           <div className="flex justify-between font-medium">
//                             <span className="text-gray-900 dark:text-white">Total:</span>
//                             <span className="text-gray-900 dark:text-white">
//                               $
//                               {(() => {
//                                 // Calculate total including fees
//                                 const amount = parseFloat(newPayment.amount) || 0;
//                                 const selectedMethod = paymentMethods.find(m => m.name === newPayment.method);
//                                 let feePercentage = 0;
                                
//                                 if (selectedMethod) {
//                                   switch (selectedMethod.type) {
//                                     case 'card': feePercentage = 0.029; break;
//                                     case 'bank': feePercentage = 0.01; break;
//                                     case 'crypto': feePercentage = 0.015; break;
//                                     default: feePercentage = 0.02;
//                                   }
//                                 }
                                
//                                 const networkFee = amount * feePercentage;
//                                 const processingFee = 0.30;
//                                 const total = (amount + networkFee + processingFee).toFixed(2);
//                                 return total;
//                               })()}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
                  
//                   <div className="flex justify-end">
//                     <button
//                       type="button"
//                       className="mr-3 px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                       onClick={() => setIsPaymentModalOpen(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                     >
//                       Send Payment
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Add Payment Method Modal */}
//       {isAddMethodModalOpen && (
//         <div className="fixed inset-0 overflow-y-auto z-50">
//           <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             {/* Overlay */}
//             <div 
//               className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity animate-fade-in-up" 
//               style={{animationDuration: '0.2s'}}
//               aria-hidden="true"
//               onClick={() => setIsAddMethodModalOpen(false)}
//             ></div>
            
//             {/* Modal */}
//             <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-pop-in" style={{animationDuration: '0.3s'}}>
//               <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add Payment Method</h3>
//                 <button 
//                   onClick={() => setIsAddMethodModalOpen(false)} 
//                   className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
//                 >
//                   <XMarkIcon className="h-6 w-6" />
//                 </button>
//               </div>
              
//               <div className="p-6">
//                 <form onSubmit={handleAddMethod} className="space-y-6">
//                   <div className="grid grid-cols-1 gap-6">
//                     <div>
//                       <label htmlFor="methodType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Payment Method Type
//                       </label>
//                       <div className="mt-1">
//                         <select
//                           id="methodType"
//                           name="methodType"
//                           className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                           value={newPaymentMethod.type}
//                           onChange={(e) => setNewPaymentMethod({...newPaymentMethod, type: e.target.value as 'bank' | 'crypto'})}
//                           required
//                         >
//                           <option value="bank">Bank Account</option>
//                           <option value="crypto">Crypto Wallet</option>
//                         </select>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label htmlFor="methodName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Name
//                       </label>
//                       <input
//                         type="text"
//                         id="methodName"
//                         name="methodName"
//                         className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                         placeholder={newPaymentMethod.type === 'bank' ? "e.g., Chase Bank Account" : "e.g., Bitcoin Wallet"}
//                         value={newPaymentMethod.name}
//                         onChange={(e) => setNewPaymentMethod({...newPaymentMethod, name: e.target.value})}
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="methodDetails" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Details
//                       </label>
//                       <input
//                         type="text"
//                         id="methodDetails"
//                         name="methodDetails"
//                         className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                         placeholder={newPaymentMethod.type === 'bank' ? "e.g., Account ending in 1234" : "e.g., Wallet address"}
//                         value={newPaymentMethod.details}
//                         onChange={(e) => setNewPaymentMethod({...newPaymentMethod, details: e.target.value})}
//                         required
//                       />
//                     </div>
                    
//                     <div className="flex items-start">
//                       <div className="flex items-center h-5">
//                         <input
//                           id="isDefault"
//                           name="isDefault"
//                           type="checkbox"
//                           className="focus:ring-primary h-4 w-4 text-primary border-gray-300 dark:border-gray-600 rounded"
//                           checked={newPaymentMethod.isDefault}
//                           onChange={(e) => setNewPaymentMethod({...newPaymentMethod, isDefault: e.target.checked})}
//                         />
//                       </div>
//                       <div className="ml-3 text-sm">
//                         <label htmlFor="isDefault" className="font-medium text-gray-700 dark:text-gray-300">
//                           Set as default payment method
//                         </label>
//                         <p className="text-gray-500 dark:text-gray-400">
//                           This will be your default method for all payments.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Preview of the payment method */}
//                   <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
//                     <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Payment Method Preview</h4>
//                     <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center">
//                       <div className={`p-2 rounded-full ${
//                         newPaymentMethod.type === 'bank' 
//                           ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
//                           : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
//                       } mr-4`}>
//                         {newPaymentMethod.type === 'bank' && <BanknotesIcon className="h-5 w-5" />}
//                         {newPaymentMethod.type === 'crypto' && <CurrencyDollarIcon className="h-5 w-5" />}
//                       </div>
//                       <div>
//                         <div className="flex items-center">
//                           <p className="text-sm font-medium text-gray-900 dark:text-white">
//                             {newPaymentMethod.name || (newPaymentMethod.type === 'bank' ? 'Bank Account' : 'Crypto Wallet')}
//                           </p>
//                           {newPaymentMethod.isDefault && (
//                             <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
//                               Default
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                           {newPaymentMethod.details || 'No details provided'}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-end">
//                     <button
//                       type="button"
//                       className="mr-3 px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                       onClick={() => setIsAddMethodModalOpen(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                     >
//                       Add Payment Method
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Edit Payment Method Modal */}
//       {isEditMethodModalOpen && (
//         <div className="fixed inset-0 overflow-y-auto z-50">
//           <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             {/* Overlay */}
//             <div 
//               className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity animate-fade-in-up" 
//               style={{animationDuration: '0.2s'}}
//               aria-hidden="true"
//               onClick={() => setIsEditMethodModalOpen(false)}
//             ></div>
            
//             {/* Modal */}
//             <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-pop-in" style={{animationDuration: '0.3s'}}>
//               <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">Edit Payment Method</h3>
//                 <button 
//                   onClick={() => setIsEditMethodModalOpen(false)} 
//                   className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
//                 >
//                   <XMarkIcon className="h-6 w-6" />
//                 </button>
//               </div>
              
//               <div className="p-6">
//                 <form onSubmit={handleUpdateMethod} className="space-y-6">
//                   <div className="grid grid-cols-1 gap-6">
//                     <div>
//                       <label htmlFor="editMethodType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Payment Method Type
//                       </label>
//                       <div className="mt-1">
//                         <select
//                           id="editMethodType"
//                           name="editMethodType"
//                           className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                           value={editedPaymentMethod.type}
//                           onChange={(e) => setEditedPaymentMethod({...editedPaymentMethod, type: e.target.value as 'bank' | 'crypto'})}
//                           required
//                         >
//                           <option value="bank">Bank Account</option>
//                           <option value="crypto">Crypto Wallet</option>
//                         </select>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label htmlFor="editMethodName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Name
//                       </label>
//                       <input
//                         type="text"
//                         id="editMethodName"
//                         name="editMethodName"
//                         className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                         placeholder={editedPaymentMethod.type === 'bank' ? "e.g., Chase Bank Account" : "e.g., Bitcoin Wallet"}
//                         value={editedPaymentMethod.name}
//                         onChange={(e) => setEditedPaymentMethod({...editedPaymentMethod, name: e.target.value})}
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="editMethodDetails" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Details
//                       </label>
//                       <input
//                         type="text"
//                         id="editMethodDetails"
//                         name="editMethodDetails"
//                         className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                         placeholder={editedPaymentMethod.type === 'bank' ? "e.g., Account ending in 1234" : "e.g., Wallet address"}
//                         value={editedPaymentMethod.details}
//                         onChange={(e) => setEditedPaymentMethod({...editedPaymentMethod, details: e.target.value})}
//                         required
//                       />
//                     </div>
                    
//                     <div className="flex items-start">
//                       <div className="flex items-center h-5">
//                         <input
//                           id="editIsDefault"
//                           name="editIsDefault"
//                           type="checkbox"
//                           className="focus:ring-primary h-4 w-4 text-primary border-gray-300 dark:border-gray-600 rounded"
//                           checked={editedPaymentMethod.isDefault}
//                           onChange={(e) => setEditedPaymentMethod({...editedPaymentMethod, isDefault: e.target.checked})}
//                         />
//                       </div>
//                       <div className="ml-3 text-sm">
//                         <label htmlFor="editIsDefault" className="font-medium text-gray-700 dark:text-gray-300">
//                           Set as default payment method
//                         </label>
//                         <p className="text-gray-500 dark:text-gray-400">
//                           This will be your default method for all payments.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Preview of the payment method */}
//                   <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
//                     <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Payment Method Preview</h4>
//                     <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center">
//                       <div className={`p-2 rounded-full ${
//                         editedPaymentMethod.type === 'bank' 
//                           ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
//                           : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
//                       } mr-4`}>
//                         {editedPaymentMethod.type === 'bank' && <BanknotesIcon className="h-5 w-5" />}
//                         {editedPaymentMethod.type === 'crypto' && <CurrencyDollarIcon className="h-5 w-5" />}
//                       </div>
//                       <div>
//                         <div className="flex items-center">
//                           <p className="text-sm font-medium text-gray-900 dark:text-white">
//                             {editedPaymentMethod.name || (editedPaymentMethod.type === 'bank' ? 'Bank Account' : 'Crypto Wallet')}
//                           </p>
//                           {editedPaymentMethod.isDefault && (
//                             <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
//                               Default
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                           {editedPaymentMethod.details || 'No details provided'}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-end">
//                     <button
//                       type="button"
//                       className="mr-3 px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                       onClick={() => setIsEditMethodModalOpen(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                     >
//                       Update Payment Method
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Delete Confirmation Modal */}
//       {isDeleteConfirmModalOpen && (
//         <div className="fixed inset-0 overflow-y-auto z-50">
//           <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             {/* Overlay */}
//             <div 
//               className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity animate-fade-in-up" 
//               style={{animationDuration: '0.2s'}}
//               aria-hidden="true"
//               onClick={() => setIsDeleteConfirmModalOpen(false)}
//             ></div>
            
//             {/* Modal */}
//             <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-pop-in" style={{animationDuration: '0.3s'}}>
//               <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">Confirm Deletion</h3>
//                 <button 
//                   onClick={() => setIsDeleteConfirmModalOpen(false)} 
//                   className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
//                 >
//                   <XMarkIcon className="h-6 w-6" />
//                 </button>
//               </div>
              
//               <div className="p-6">
//                 {selectedMethodId && (
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-center">
//                       <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
//                         <TrashIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
//                       </div>
//                     </div>
                    
//                     <div className="text-center">
//                       <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//                         Delete Payment Method
//                       </h3>
//                       <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                         Are you sure you want to delete this payment method? This action cannot be undone.
//                       </p>
//                     </div>
                    
//                     <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
//                       <button
//                         type="button"
//                         className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
//                         onClick={handleConfirmDelete}
//                       >
//                         Delete
//                       </button>
//                       <button
//                         type="button"
//                         className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:w-auto sm:text-sm"
//                         onClick={() => setIsDeleteConfirmModalOpen(false)}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </DashboardLayout>
//   );
// };

// export default Payments; 



























import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { 
  CreditCardIcon, 
  PlusIcon, 
  TrashIcon, 
  PencilIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  BanknotesIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  CurrencyDollarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { URL } from '../../url'




interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'crypto';
  name: string;
  details: string;
  isDefault: boolean;
  expiryDate?: string;
}

interface Transaction {
  id: string;
  date: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  description: string;
  recipient: string;
}

const Payments: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'methods' | 'transactions'>('methods');
  // State for mobile stats carousel
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  // State for payment modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  // State for add payment method modal
  const [isAddMethodModalOpen, setIsAddMethodModalOpen] = useState(false);
  // State for edit payment method modal
  const [isEditMethodModalOpen, setIsEditMethodModalOpen] = useState(false);
  // State for delete confirmation modal
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  // State for method being edited or deleted
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);


  const [walletAddressMessage, setWalletAddressMessage] = useState('');
  const [hasWalletAddress, setHasWalletAddress] = useState(false);
  
  // State for new payment method
  const [newPaymentMethod, setNewPaymentMethod] = useState<{
    type: 'bank' | 'crypto';
    name: string;
    details: string;
    isDefault: boolean;
  }>({
    type: 'bank',
    name: '',
    details: '',
    isDefault: false
  });
  
  // State for edited payment method
  const [editedPaymentMethod, setEditedPaymentMethod] = useState<{
    type: 'bank' | 'crypto';
    name: string;
    details: string;
    isDefault: boolean;
  }>({
    type: 'bank',
    name: '',
    details: '',
    isDefault: false
  });
  
  // State for payment methods
  // const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
  //   {
  //     id: '1',
  //     type: 'bank',
  //     name: 'Chase Bank Account',
  //     details: 'Account ending in 6789',
  //     isDefault: false
  //   },
  //   {
  //     id: '2',
  //     type: 'crypto',
  //     name: 'Bitcoin Wallet',
  //     details: 'Address: 3FZbgi29...8j7',
  //     isDefault: true
  //   }
  // ]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  // State for transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 't1',
      date: '2023-05-28',
      amount: '$75.50',
      status: 'pending',
      method: 'Bitcoin Wallet',
      description: 'Crypto transfer',
      recipient: 'External Wallet'
    },
    {
      id: 't2',
      date: '2023-05-25',
      amount: '$120.00',
      status: 'completed',
      method: 'Chase Bank Account',
      description: 'FIAT Transfer',
      recipient: 'External Wallet'
    },
    {
      id: 't3',
      date: '2023-05-15',
      amount: '$350.00',
      status: 'completed',
      method: 'Bitcoin Wallet',
      description: 'Crypto purchase',
      recipient: 'Crypto Exchange'
    },
    {
      id: 't4',
      date: '2023-05-12',
      amount: '$42.75',
      status: 'failed',
      method: 'Chase Bank Account',
      description: 'Payment attempt',
      recipient: 'Online Store'
    },
    {
      id: 't5',
      date: '2023-05-08',
      amount: '$180.25',
      status: 'completed',
      method: 'Bitcoin Wallet',
      description: 'Crypto exchange',
      recipient: 'Trading Platform'
    },
    {
      id: 't6',
      date: '2023-05-04',
      amount: '$95.00',
      status: 'pending',
      method: 'Chase Bank Account',
      description: 'Monthly subscription',
      recipient: 'Streaming Service'
    },
    {
      id: 't7',
      date: '2023-04-28',
      amount: '$250.00',
      status: 'completed',
      method: 'Bitcoin Wallet',
      description: 'Investment purchase',
      recipient: 'Crypto Fund'
    },
    {
      id: 't8',
      date: '2023-04-22',
      amount: '$68.50',
      status: 'failed',
      method: 'Chase Bank Account',
      description: 'Failed withdrawal',
      recipient: 'ATM Transaction'
    },
    {
      id: 't9',
      date: '2023-04-18',
      amount: '$125.75',
      status: 'completed',
      method: 'Bitcoin Wallet',
      description: 'Token purchase',
      recipient: 'NFT Marketplace'
    },
    {
      id: 't10',
      date: '2023-04-12',
      amount: '$32.99',
      status: 'failed',
      method: 'Chase Bank Account',
      description: 'Declined payment',
      recipient: 'Digital Goods Store'
    },
    {
      id: 't11',
      date: '2023-04-08',
      amount: '$150.00',
      status: 'completed',
      method: 'Bitcoin Wallet',
      description: 'Wallet funding',
      recipient: 'Crypto Exchange'
    },
    {
      id: 't12',
      date: '2023-04-01',
      amount: '$200.00',
      status: 'completed',
      method: 'Chase Bank Account',
      description: 'Fund transfer',
      recipient: 'Savings Account'
    }
  ]);

  // State for new payment
  const [newPayment, setNewPayment] = useState({
    amount: '',
    description: '',
    method: ''
  });

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State for filter dropdown
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // State for filter values
  const [filters, setFilters] = useState({
    method: 'All',
    status: 'All'
  });

  // Payment statistics
  const paymentStats = [
    {
      name: 'Total Payments',
      value: '$1,245.50',
      change: '+8.5%',
      isIncrease: true,
      icon: BanknotesIcon,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-600 dark:text-blue-400',
      iconColor: 'text-blue-500 dark:text-blue-400',
    },
    {
      name: 'Pending',
      value: '$75.50',
      change: '-2.3%',
      isIncrease: false,
      icon: ClockIcon,
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      textColor: 'text-yellow-600 dark:text-yellow-400',
      iconColor: 'text-yellow-500 dark:text-yellow-400',
    },
    {
      name: 'Successful',
      value: '$1,125.00',
      change: '+10.2%',
      isIncrease: true,
      icon: CheckCircleIcon,
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-600 dark:text-green-400',
      iconColor: 'text-green-500 dark:text-green-400',
    },
    {
      name: 'Failed',
      value: '$45.99',
      change: '-15.0%',
      isIncrease: false,
      icon: XCircleIcon,
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      textColor: 'text-red-600 dark:text-red-400',
      iconColor: 'text-red-500 dark:text-red-400',
    },
  ];

  // Filter transactions based on search term and filters
  const filteredTransactions = transactions.filter(transaction => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Method filter
    const matchesMethod = filters.method === 'All' || transaction.method === filters.method;
    
    // Status filter
    const matchesStatus = filters.status === 'All' || 
      transaction.status === filters.status.toLowerCase();
    
    // Return true only if all conditions are met
    return matchesSearch && matchesMethod && matchesStatus;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Navigate to next stat in carousel
  const nextStat = () => {
    setCurrentStatIndex((prevIndex) => (prevIndex === paymentStats.length - 1 ? 0 : prevIndex + 1));
  };

  // Navigate to previous stat in carousel
  const prevStat = () => {
    setCurrentStatIndex((prevIndex) => (prevIndex === 0 ? paymentStats.length - 1 : prevIndex - 1));
  };

  // Handle setting default payment method
  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  // Handle editing payment method
  const handleEditMethod = (id: string) => {
    const methodToEdit = paymentMethods.find(method => method.id === id);
    if (!methodToEdit) return;
    
    setEditedPaymentMethod({
      type: methodToEdit.type as 'bank' | 'crypto',
      name: methodToEdit.name,
      details: methodToEdit.details,
      isDefault: methodToEdit.isDefault
    });
    
    setSelectedMethodId(id);
    setIsEditMethodModalOpen(true);
  };
  
  // Handle updating payment method
  const handleUpdateMethod = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMethodId) return;
    
    // If edited method is being set as default, update other methods
    if (editedPaymentMethod.isDefault) {
      setPaymentMethods(
        paymentMethods.map(method => ({
          ...method,
          isDefault: false
        }))
      );
    }
    
    // Update the method
    setPaymentMethods(
      paymentMethods.map(method => 
        method.id === selectedMethodId
          ? {
              ...method,
              type: editedPaymentMethod.type,
              name: editedPaymentMethod.name,
              details: editedPaymentMethod.details,
              isDefault: editedPaymentMethod.isDefault
            }
          : method
      )
    );
    
    // Reset form and close modal
    setEditedPaymentMethod({
      type: 'bank',
      name: '',
      details: '',
      isDefault: false
    });
    setSelectedMethodId(null);
    setIsEditMethodModalOpen(false);
  };
  
  // Handle opening delete confirmation
  const handleDeleteConfirmation = (id: string) => {
    setSelectedMethodId(id);
    setIsDeleteConfirmModalOpen(true);
  };
  
  // Handle confirming deletion
  const handleConfirmDelete = () => {
    if (selectedMethodId) {
      // Get the method being deleted
      const methodToDelete = paymentMethods.find(method => method.id === selectedMethodId);
      
      // Remove the method
      setPaymentMethods(paymentMethods.filter(method => method.id !== selectedMethodId));
      
      // If the deleted method was default, set the first remaining method as default (if any)
      if (methodToDelete?.isDefault && paymentMethods.length > 1) {
        const remainingMethods = paymentMethods.filter(method => method.id !== selectedMethodId);
        if (remainingMethods.length > 0) {
          setPaymentMethods(
            remainingMethods.map((method, index) => ({
              ...method,
              isDefault: index === 0 // Set the first method as default
            }))
          );
        }
      }
      
      setSelectedMethodId(null);
      setIsDeleteConfirmModalOpen(false);
    }
  };

  // Handle submitting new payment
  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically process the payment
    // For now, we'll just add it to the transactions list
    const newTransaction: Transaction = {
      id: `t${transactions.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      amount: `$${newPayment.amount}`,
      status: 'pending',
      method: newPayment.method,
      description: newPayment.description,
      recipient: 'Wallet Transfer' // Default recipient since we removed the field
    };
    
    setTransactions([newTransaction, ...transactions]);
    
    // Reset form
    setNewPayment({
      amount: '',
      description: '',
      method: ''
    });
    
    // Close the payment modal and switch to transactions tab
    setIsPaymentModalOpen(false);
    setActiveTab('transactions');
  };





// Add this function to your component to manually fetch the wallet address
const fetchWalletAddress = async () => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Get API key and secret from merchant data
    const merchantString = localStorage.getItem('merchant');
    const merchantData = merchantString ? JSON.parse(merchantString) : null;
    
    if (token && merchantData) {
      // Fetch the dashboard data
      const dashboardResponse = await axios.get(`${URL}/api/merchants/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-key': merchantData.apiKey,
          'x-API-Secret': merchantData.apiSecret
        }
      });
      
      // Extract the wallet address from the response
      const walletAddress = dashboardResponse.data?.merchant?.walletAddress;
      
      if (walletAddress) {
        setWalletAddressMessage(`Your current wallet address is: ${walletAddress}`);
        setHasWalletAddress(true); // Set this to true when we have a wallet
      } else {
        setWalletAddressMessage('No wallet address found. Add a crypto wallet to set one.');
        setHasWalletAddress(false); // Set this to false when no wallet
      }
    }
  } catch (error) {
    console.error('Error fetching wallet address:', error);
    setWalletAddressMessage('Error fetching wallet address. Please try again.');
  }
};



// Call this function when the component mounts to check for wallet
useEffect(() => {
  fetchWalletAddress();
}, []);




  
  // Handle adding new payment method
  const handleAddMethod = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWalletAddressMessage('')
    
    // Check if this is a crypto wallet
    if (newPaymentMethod.type === 'crypto') {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        // Get API key and secret from merchant data
        // This assumes you have the merchant data in localStorage
        const merchantString = localStorage.getItem('merchant');
      // Add null check before parsing
      const merchantData = merchantString ? JSON.parse(merchantString) : null;
      
      if (token && merchantData) {
        // Extract wallet address from the details field
        // Assuming format is "Address: wallet_address_here"
        let walletAddress = newPaymentMethod.details;
        if (walletAddress.includes('Address:')) {
          walletAddress = walletAddress.split('Address:')[1].trim();
        }
        
        // Call the API to update the wallet address
        await axios.put(`${URL}/api/merchants/profile`, {
          walletAddress: walletAddress
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'x-api-key': merchantData.apiKey,
            'x-API-Secret': merchantData.apiSecret
          }
        });
          
          console.log('Wallet address updated successfully!');

    // Now fetch the updated wallet address to confirm it was saved
    const dashboardResponse = await axios.get(`${URL}/api/merchants/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-api-key': merchantData.apiKey,
        'x-API-Secret': merchantData.apiSecret
      }
    });
    
    // Extract the wallet address from the response
    const updatedWalletAddress = dashboardResponse.data?.merchant?.walletAddress;
    
    if (updatedWalletAddress) {
      setWalletAddressMessage(`Wallet address ${updatedWalletAddress} has been saved to your profile.`);
    }



        }
      } catch (error) {
        console.error('Error updating wallet address:', error);
      }
    }
    
    // Continue with the original code for adding the payment method locally
    const newMethod = {
      id: `m${paymentMethods.length + 1}`,
      ...newPaymentMethod
    };
    
    // If new method is default, update other methods
    if (newMethod.isDefault) {
      setPaymentMethods(
        paymentMethods.map(method => ({
          ...method,
          isDefault: false
        }))
      );
    }
    
    // Add the new method to the list
    setPaymentMethods([...paymentMethods, newMethod]);
    
    // Reset form and close modal
    setNewPaymentMethod({
      type: 'bank',
      name: '',
      details: '',
      isDefault: false
    });
    setIsAddMethodModalOpen(false);
  };
  



  // Get unique payment methods from transactions for filter dropdown
  const uniqueMethods = ['All', ...Array.from(new Set(transactions.map(t => t.method)))];
  
  // Status options for filter dropdown
  const statusOptions = ['All', 'Completed', 'Pending', 'Failed'];
  
  // Handle filter change
  const handleFilterChange = (filterType: 'method' | 'status', value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      method: 'All',
      status: 'All'
    });
  };

  return (
    <DashboardLayout>
      {/* Add animation keyframes */}
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
        
        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(40px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-pop-in {
          animation: pop-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>

      <div className="space-y-6">
        {/* Header section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 animate-fade-in-up opacity-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center mb-2">
                <CreditCardIcon className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payments</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your payment methods, transactions, and make new payments.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <CurrencyDollarIcon className="-ml-1 mr-2 h-5 w-5" />
                Send Payment
              </button>
            </div>
          </div>
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
                    <div className={`p-3 rounded-full ${paymentStats[currentStatIndex].bgColor} mr-4`}>
                      {(() => {
                        const StatIcon = paymentStats[currentStatIndex].icon;
                        return <StatIcon className={`h-6 w-6 ${paymentStats[currentStatIndex].iconColor}`} />;
                      })()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{paymentStats[currentStatIndex].name}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{paymentStats[currentStatIndex].value}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      paymentStats[currentStatIndex].isIncrease ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {paymentStats[currentStatIndex].isIncrease ? (
                        <ArrowUpIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-3 w-3 mr-1" />
                      )}
                      {paymentStats[currentStatIndex].change}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
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
                {paymentStats.map((_, index) => (
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
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up animation-delay-100 opacity-0">
          {paymentStats.map((stat) => (
            <div 
              key={stat.name} 
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
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
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden animate-fade-in-up animation-delay-200 opacity-0">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('methods')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'methods'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Payment Methods
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'transactions'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Transactions
              </button>
            </nav>
          </div>

          {/* Payment Methods Tab */}
          {activeTab === 'methods' && (
            <div className="p-6">
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4 xs:gap-0 mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Payment Methods</h3>
                <button 
                  onClick={() => setIsAddMethodModalOpen(true)}
                  className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <PlusIcon className="-ml-1 mr-1 h-4 w-4" />
                  Add Method
                </button>
              </div>


{/* Add the View Wallet Address button right here */}
<div className="flex justify-end mb-4">
  <button
    onClick={fetchWalletAddress}
    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
  >
    <CurrencyDollarIcon className="h-5 w-5 mr-2" />
    View Wallet Address
  </button>
</div>



 {/* Display wallet address message if available */}
 {walletAddressMessage && (
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
        <div className="flex">
          <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
          <p className="text-sm text-green-700">{walletAddressMessage}</p>
        </div>
      </div>
    )}


              
              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <div 
                    key={method.id} 
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                  >
                    <div className="flex items-start flex-1">
                      <div className={`p-2 rounded-full flex-shrink-0 ${
                        method.type === 'card' 
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                          : method.type === 'bank' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      } mr-4 mt-1`}>
                        {method.type === 'card' && <CreditCardIcon className="h-5 w-5" />}
                        {method.type === 'bank' && <BanknotesIcon className="h-5 w-5" />}
                        {method.type === 'crypto' && <CurrencyDollarIcon className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{method.name}</p>
                          {method.isDefault && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{method.details}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 justify-end mt-3 sm:mt-0 border-t sm:border-t-0 pt-3 sm:pt-0">
                      {!method.isDefault && (
                        <button 
                          onClick={() => handleSetDefault(method.id)}
                          className="px-2 py-1.5 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          Set Default
                        </button>
                      )}
                      <button 
                        onClick={() => handleEditMethod(method.id)}
                        className="p-1.5 rounded-md bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-indigo-800/30"
                        aria-label="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteConfirmation(method.id)}
                        className="p-1.5 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-800/30"
                        aria-label="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {paymentMethods.length === 0 && !hasWalletAddress && (
                  <div className="text-center py-8 animate-fade-in-up animation-delay-300 opacity-0">
                    <CreditCardIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No payment methods</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Get started by adding a new payment method.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Add Payment Method
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}


{/* Add this new section for when there are no payment methods but a wallet exists */}
{paymentMethods.length === 0 && hasWalletAddress && (
  <div className="text-center py-8 animate-fade-in-up animation-delay-300 opacity-0">
    <CurrencyDollarIcon className="mx-auto h-12 w-12 text-purple-400" />
    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Wallet Address Configured</h3>
    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
      You have a wallet address set up, but no payment methods have been added yet.
    </p>
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setIsAddMethodModalOpen(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Add Payment Method
      </button>
    </div>
  </div>
)}



          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Transactions</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-white sm:text-sm"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {/* Filter Button and Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className={`p-2 border rounded-md flex items-center justify-center ${
                        (filters.method !== 'All' || filters.status !== 'All')
                          ? 'text-primary border-primary bg-primary/10 hover:bg-primary/20'
                          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border-gray-300 dark:border-gray-600'
                      }`}
                      aria-label="Filter transactions"
                    >
                      <FunnelIcon className="h-5 w-5" />
                      {(filters.method !== 'All' || filters.status !== 'All') && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {(filters.method !== 'All' ? 1 : 0) + (filters.status !== 'All' ? 1 : 0)}
                        </span>
                      )}
                    </button>
                    
                    {/* Filter Dropdown */}
                    {isFilterOpen && (
                      <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Filters</h3>
                            <button 
                              onClick={() => setIsFilterOpen(false)} 
                              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                          
                          {/* Method Filter */}
                          <div className="mb-4">
                            <label htmlFor="methodFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Payment Method
                            </label>
                            <select
                              id="methodFilter"
                              className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm"
                              value={filters.method}
                              onChange={(e) => handleFilterChange('method', e.target.value)}
                            >
                              {uniqueMethods.map((method) => (
                                <option key={method} value={method}>{method}</option>
                              ))}
                            </select>
                          </div>
                          
                          {/* Status Filter */}
                          <div className="mb-4">
                            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Status
                            </label>
                            <select
                              id="statusFilter"
                              className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm"
                              value={filters.status}
                              onChange={(e) => handleFilterChange('status', e.target.value)}
                            >
                              {statusOptions.map((status) => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          </div>
                          
                          {/* Filter Actions */}
                          <div className="flex justify-between">
                            <button
                              onClick={clearFilters}
                              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                            >
                              Clear filters
                            </button>
                            <button
                              onClick={() => setIsFilterOpen(false)}
                              className="px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary/90"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md">
                    <ArrowPathIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto animate-fade-in-up animation-delay-300 opacity-0">
                {/* Desktop table - hide on small screens */}
                <table className="hidden sm:table min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Recipient
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Method
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {currentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {transaction.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{transaction.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{transaction.recipient}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{transaction.method}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{transaction.amount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                            transaction.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800' 
                              : transaction.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Mobile stacked cards - only show on small screens */}
                <div className="sm:hidden space-y-4">
                  {currentTransactions.map((transaction) => (
                    <div key={transaction.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</span>
                            <h3 className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{transaction.amount}</h3>
                          </div>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                            transaction.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800' 
                              : transaction.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Description</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Recipient</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{transaction.recipient}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Payment Method</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{transaction.method}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {currentTransactions.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">No transactions found matching your search criteria.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {filteredTransactions.length === 0 && searchTerm && (
                <div className="text-center py-8 hidden sm:block">
                  <p className="text-gray-500 dark:text-gray-400">No transactions found matching your search criteria.</p>
                </div>
              )}
              
              {/* Pagination controls */}
              {filteredTransactions.length > 0 && (
                <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                        <span className="font-medium">
                          {indexOfLastItem > filteredTransactions.length ? filteredTransactions.length : indexOfLastItem}
                        </span>{' '}
                        of <span className="font-medium">{filteredTransactions.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium ${
                            currentPage === 1
                              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        
                        {/* Page numbers */}
                        {Array.from({ length: totalPages }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border ${
                              currentPage === index + 1
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                            } text-sm font-medium`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium ${
                            currentPage === totalPages
                              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </nav>
                    </div>
                  </div>
                  
                  {/* Mobile pagination */}
                  <div className="flex items-center justify-between sm:hidden">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                        currentPage === 1
                          ? 'text-gray-300 dark:text-gray-600 bg-white dark:bg-gray-800 cursor-not-allowed'
                          : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      Previous
                    </button>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <span>Page {currentPage} of {totalPages}</span>
                    </div>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                        currentPage === totalPages
                          ? 'text-gray-300 dark:text-gray-600 bg-white dark:bg-gray-800 cursor-not-allowed'
                          : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Send Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity animate-fade-in-up" 
              style={{animationDuration: '0.2s'}}
              aria-hidden="true"
              onClick={() => setIsPaymentModalOpen(false)}
            ></div>
            
            {/* Modal */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-pop-in" style={{animationDuration: '0.3s'}}>
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Send a Payment</h3>
                <button 
                  onClick={() => setIsPaymentModalOpen(false)} 
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmitPayment} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Amount
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                        </div>
                        <input
                          type="text"
                          name="amount"
                          id="amount"
                          className="block w-full pl-7 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-white sm:text-sm"
                          placeholder="0.00"
                          value={newPayment.amount}
                          onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                          required
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 dark:text-gray-400 sm:text-sm">USD</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        rows={4}
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="What's this payment for?"
                        value={newPayment.description}
                        onChange={(e) => setNewPayment({...newPayment, description: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label htmlFor="method" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Payment Method
                      </label>
                      <select
                        id="method"
                        name="method"
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={newPayment.method}
                        onChange={(e) => setNewPayment({...newPayment, method: e.target.value})}
                        required
                      >
                        <option value="">Select a payment method</option>
                        {paymentMethods.map(method => (
                          <option key={method.id} value={method.name}>
                            {method.name}
                          </option>
                        ))}
                      </select>
                      
                      {/* Display selected payment method details */}
                      {newPayment.method && (
                        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-md">
                          {(() => {
                            const selectedMethod = paymentMethods.find(m => m.name === newPayment.method);
                            if (!selectedMethod) return null;
                            
                            return (
                              <div className="flex items-start">
                                <div className={`p-2 rounded-full ${
                                  selectedMethod.type === 'card' 
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                                    : selectedMethod.type === 'bank' 
                                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                                } mr-3 mt-0.5 flex-shrink-0`}>
                                  {selectedMethod.type === 'card' && <CreditCardIcon className="h-4 w-4" />}
                                  {selectedMethod.type === 'bank' && <BanknotesIcon className="h-4 w-4" />}
                                  {selectedMethod.type === 'crypto' && <CurrencyDollarIcon className="h-4 w-4" />}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                                    {selectedMethod.name}
                                    {selectedMethod.isDefault && (
                                      <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
                                        Default
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{selectedMethod.details}</p>
                                  {selectedMethod.expiryDate && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                      Expires: {selectedMethod.expiryDate}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Payment Summary */}
                  {newPayment.amount && newPayment.method && (
                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Payment Summary</h4>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-md p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                          <span className="text-gray-900 dark:text-white font-medium">${newPayment.amount || '0.00'}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Network Fee:</span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            $
                            {(() => {
                              // Calculate a mock fee based on amount and payment method
                              const amount = parseFloat(newPayment.amount) || 0;
                              const selectedMethod = paymentMethods.find(m => m.name === newPayment.method);
                              let feePercentage = 0;
                              
                              if (selectedMethod) {
                                switch (selectedMethod.type) {
                                  case 'card': feePercentage = 0.029; break;
                                  case 'bank': feePercentage = 0.01; break;
                                  case 'crypto': feePercentage = 0.015; break;
                                  default: feePercentage = 0.02;
                                }
                              }
                              
                              const fee = (amount * feePercentage).toFixed(2);
                              return fee;
                            })()}
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Processing Fee:</span>
                          <span className="text-gray-900 dark:text-white font-medium">$0.30</span>
                        </div>
                        
                        <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                          <div className="flex justify-between font-medium">
                            <span className="text-gray-900 dark:text-white">Total:</span>
                            <span className="text-gray-900 dark:text-white">
                              $
                              {(() => {
                                // Calculate total including fees
                                const amount = parseFloat(newPayment.amount) || 0;
                                const selectedMethod = paymentMethods.find(m => m.name === newPayment.method);
                                let feePercentage = 0;
                                
                                if (selectedMethod) {
                                  switch (selectedMethod.type) {
                                    case 'card': feePercentage = 0.029; break;
                                    case 'bank': feePercentage = 0.01; break;
                                    case 'crypto': feePercentage = 0.015; break;
                                    default: feePercentage = 0.02;
                                  }
                                }
                                
                                const networkFee = amount * feePercentage;
                                const processingFee = 0.30;
                                const total = (amount + networkFee + processingFee).toFixed(2);
                                return total;
                              })()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="mr-3 px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      onClick={() => setIsPaymentModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Send Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Payment Method Modal */}
      {isAddMethodModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity animate-fade-in-up" 
              style={{animationDuration: '0.2s'}}
              aria-hidden="true"
              onClick={() => setIsAddMethodModalOpen(false)}
            ></div>
            
            {/* Modal */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-pop-in" style={{animationDuration: '0.3s'}}>
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add Payment Method</h3>
                <button 
                  onClick={() => setIsAddMethodModalOpen(false)} 
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleAddMethod} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="methodType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Payment Method Type
                      </label>
                      <div className="mt-1">
                        <select
                          id="methodType"
                          name="methodType"
                          className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          value={newPaymentMethod.type}
                          onChange={(e) => setNewPaymentMethod({...newPaymentMethod, type: e.target.value as 'bank' | 'crypto'})}
                          required
                        >
                          <option value="bank">Bank Account</option>
                          <option value="crypto">Crypto Wallet</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="methodName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Name
                      </label>
                      <input
                        type="text"
                        id="methodName"
                        name="methodName"
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder={newPaymentMethod.type === 'bank' ? "e.g., Chase Bank Account" : "e.g., Bitcoin Wallet"}
                        value={newPaymentMethod.name}
                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="methodDetails" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Details
                      </label>
                      <input
                        type="text"
                        id="methodDetails"
                        name="methodDetails"
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder={newPaymentMethod.type === 'bank' ? "e.g., Account ending in 1234" : "e.g., Wallet address"}
                        value={newPaymentMethod.details}
                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, details: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="isDefault"
                          name="isDefault"
                          type="checkbox"
                          className="focus:ring-primary h-4 w-4 text-primary border-gray-300 dark:border-gray-600 rounded"
                          checked={newPaymentMethod.isDefault}
                          onChange={(e) => setNewPaymentMethod({...newPaymentMethod, isDefault: e.target.checked})}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="isDefault" className="font-medium text-gray-700 dark:text-gray-300">
                          Set as default payment method
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          This will be your default method for all payments.
                        </p>
                      </div>
                    </div>
                  </div>

               
                  {/* Preview of the payment method */}
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Payment Method Preview</h4>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center">
                      <div className={`p-2 rounded-full ${
                        newPaymentMethod.type === 'bank' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      } mr-4`}>
                        {newPaymentMethod.type === 'bank' && <BanknotesIcon className="h-5 w-5" />}
                        {newPaymentMethod.type === 'crypto' && <CurrencyDollarIcon className="h-5 w-5" />}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {newPaymentMethod.name || (newPaymentMethod.type === 'bank' ? 'Bank Account' : 'Crypto Wallet')}
                          </p>
                          {newPaymentMethod.isDefault && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {newPaymentMethod.details || 'No details provided'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="mr-3 px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      onClick={() => setIsAddMethodModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Add Payment Method
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Payment Method Modal */}
      {isEditMethodModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity animate-fade-in-up" 
              style={{animationDuration: '0.2s'}}
              aria-hidden="true"
              onClick={() => setIsEditMethodModalOpen(false)}
            ></div>
            
            {/* Modal */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-pop-in" style={{animationDuration: '0.3s'}}>
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Edit Payment Method</h3>
                <button 
                  onClick={() => setIsEditMethodModalOpen(false)} 
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleUpdateMethod} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="editMethodType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Payment Method Type
                      </label>
                      <div className="mt-1">
                        <select
                          id="editMethodType"
                          name="editMethodType"
                          className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          value={editedPaymentMethod.type}
                          onChange={(e) => setEditedPaymentMethod({...editedPaymentMethod, type: e.target.value as 'bank' | 'crypto'})}
                          required
                        >
                          <option value="bank">Bank Account</option>
                          <option value="crypto">Crypto Wallet</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="editMethodName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Name
                      </label>
                      <input
                        type="text"
                        id="editMethodName"
                        name="editMethodName"
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder={editedPaymentMethod.type === 'bank' ? "e.g., Chase Bank Account" : "e.g., Bitcoin Wallet"}
                        value={editedPaymentMethod.name}
                        onChange={(e) => setEditedPaymentMethod({...editedPaymentMethod, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="editMethodDetails" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Details
                      </label>
                      <input
                        type="text"
                        id="editMethodDetails"
                        name="editMethodDetails"
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder={editedPaymentMethod.type === 'bank' ? "e.g., Account ending in 1234" : "e.g., Wallet address"}
                        value={editedPaymentMethod.details}
                        onChange={(e) => setEditedPaymentMethod({...editedPaymentMethod, details: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="editIsDefault"
                          name="editIsDefault"
                          type="checkbox"
                          className="focus:ring-primary h-4 w-4 text-primary border-gray-300 dark:border-gray-600 rounded"
                          checked={editedPaymentMethod.isDefault}
                          onChange={(e) => setEditedPaymentMethod({...editedPaymentMethod, isDefault: e.target.checked})}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="editIsDefault" className="font-medium text-gray-700 dark:text-gray-300">
                          Set as default payment method
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                          This will be your default method for all payments.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview of the payment method */}
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Payment Method Preview</h4>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center">
                      <div className={`p-2 rounded-full ${
                        editedPaymentMethod.type === 'bank' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      } mr-4`}>
                        {editedPaymentMethod.type === 'bank' && <BanknotesIcon className="h-5 w-5" />}
                        {editedPaymentMethod.type === 'crypto' && <CurrencyDollarIcon className="h-5 w-5" />}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {editedPaymentMethod.name || (editedPaymentMethod.type === 'bank' ? 'Bank Account' : 'Crypto Wallet')}
                          </p>
                          {editedPaymentMethod.isDefault && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {editedPaymentMethod.details || 'No details provided'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="mr-3 px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      onClick={() => setIsEditMethodModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Update Payment Method
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {isDeleteConfirmModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity animate-fade-in-up" 
              style={{animationDuration: '0.2s'}}
              aria-hidden="true"
              onClick={() => setIsDeleteConfirmModalOpen(false)}
            ></div>
            
            {/* Modal */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-pop-in" style={{animationDuration: '0.3s'}}>
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Confirm Deletion</h3>
                <button 
                  onClick={() => setIsDeleteConfirmModalOpen(false)} 
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                {selectedMethodId && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <TrashIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Delete Payment Method
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this payment method? This action cannot be undone.
                      </p>
                    </div>
                    
                    <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={handleConfirmDelete}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setIsDeleteConfirmModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Payments; 