import React, { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckCircleIcon,
  KeyIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UsersIcon,
  EnvelopeOpenIcon,
  UserPlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

// Add/Edit Customer Modal Component
interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Invited';
}

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CustomerFormData, customerId?: number) => void;
  editMode: boolean;
  customerData?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
  } | null;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editMode = false, 
  customerData = null 
}) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 'Active'
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Initialize form data when editing an existing customer
  useEffect(() => {
    if (editMode && customerData) {
      const nameParts = customerData.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      setFormData({
        firstName,
        lastName,
        email: customerData.email,
        phone: customerData.phone,
        status: customerData.status as 'Active' | 'Inactive' | 'Pending' | 'Invited'
      });
    } else {
      // Reset form when not in edit mode
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        status: 'Active'
      });
    }
  }, [editMode, customerData, isOpen]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData, editMode && customerData ? customerData.id : undefined);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-600 bg-opacity-75 animate-fade-in-up" style={{animationDuration: '0.2s'}}></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block w-full align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all px-4 sm:px-0 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative animate-pop-in" style={{animationDuration: '0.3s'}}>
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 sm:mx-0 sm:h-10 sm:w-10">
                <UserIcon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div className="mt-3 text-left w-full sm:mt-0 sm:ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  {editMode ? 'Edit Customer' : 'Add New Customer'}
                </h3>
                
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                      {/* First Name field */}
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`block w-full pl-10 border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                              errors.firstName
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                : 'border-gray-300 dark:border-gray-600'
                            } dark:bg-gray-700 dark:text-white`}
                            placeholder="John"
                          />
                          {errors.firstName && <p className="mt-1 text-sm text-left text-red-600 dark:text-red-400">{errors.firstName}</p>}
                        </div>
                      </div>

                      {/* Last Name field */}
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`block w-full pl-10 border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                              errors.lastName
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                : 'border-gray-300 dark:border-gray-600'
                            } dark:bg-gray-700 dark:text-white`}
                            placeholder="Doe"
                          />
                          {errors.lastName && <p className="mt-1 text-sm text-left text-red-600 dark:text-red-400">{errors.lastName}</p>}
                        </div>
                      </div>
                    </div>
                    
                    {/* Email field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full pl-10 border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                            errors.email
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                              : 'border-gray-300 dark:border-gray-600'
                          } dark:bg-gray-700 dark:text-white`}
                          placeholder="john.doe@example.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-left text-red-600 dark:text-red-400">{errors.email}</p>}
                      </div>
                    </div>
                    
                    {/* Phone field */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                        Phone Number
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`block w-full pl-10 border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${
                            errors.phone
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                              : 'border-gray-300 dark:border-gray-600'
                          } dark:bg-gray-700 dark:text-white`}
                          placeholder="+1 (123) 456-7890"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-left text-red-600 dark:text-red-400">{errors.phone}</p>}
                      </div>
                    </div>
                    
                    {/* Status field */}
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                        Status
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CheckCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <select
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="block w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                        >
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Invited">Invited</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    {/* Footnote about login credentials */}
                    {!editMode && (
                      <div className="mt-4 flex items-center space-x-2 text-sm text-left text-blue-600 dark:text-blue-400">
                        <KeyIcon className="h-4 w-4 flex-shrink-0" />
                        <span>Login credentials will be sent to {formData.email || "the customer's email"}.</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 flex flex-col space-y-3 sm:flex-row-reverse sm:space-y-0">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {editMode ? 'Update Customer' : 'Add Customer'}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Delete Customer Modal Component
interface DeleteCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customer: {
    id: number;
    name: string;
    email: string;
  } | null;
}

const DeleteCustomerModal: React.FC<DeleteCustomerModalProps> = ({ isOpen, onClose, onConfirm, customer }) => {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-600 bg-opacity-75 animate-fade-in-up" style={{animationDuration: '0.3s'}}></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block w-full align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all px-4 sm:px-0 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative animate-fade-in-up" style={{animationDuration: '0.4s', animationDelay: '0.1s', opacity: '0'}}>
          {/* Close button */}
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary z-10"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                  Delete Customer
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this customer? This action cannot be undone.
                  </p>
                  <div className="mt-4 bg-gray-50 dark:bg-gray-700 rounded-md p-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-white">Customer Details</div>
                      <div className="mt-1 text-gray-500 dark:text-gray-400">
                        <p>Name: {customer.name}</p>
                        <p>Email: {customer.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Delete
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Customer Details Drawer Component
interface CustomerDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  customer: {
    id: number;
    name: string;
    email: string;
    phone: string;
    totalSpent: string;
    lastTransaction: string;
    status: string;
    statusColor: string;
  } | null;
  onEdit: (id: number) => void;
}

const CustomerDetailsDrawer: React.FC<CustomerDetailsDrawerProps> = ({ isOpen, onClose, customer, onEdit }) => {
  const [showMoreActivity, setShowMoreActivity] = useState(false);
  
  if (!isOpen || !customer) return null;

  const initials = customer.name.split(' ').map(n => n[0]).join('');

  // Sample activities - in a real app, these would come from an API
  const recentActivities = [
    {
      id: 1,
      type: 'purchase',
      title: 'Made a purchase',
      date: customer.lastTransaction,
      description: `Purchased items worth ${customer.totalSpent}`,
      icon: <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    },
    {
      id: 2,
      type: 'login',
      title: 'Logged in',
      date: '2023-05-28',
      description: 'Customer logged into their account',
      icon: <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    },
    {
      id: 3,
      type: 'account_created',
      title: 'Account created',
      date: '2023-05-15',
      description: 'Customer account was created',
      icon: <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    }
  ];

  // Extended activities (shown when "Load More" is clicked)
  const extendedActivities = [
    {
      id: 4,
      type: 'support',
      title: 'Contacted support',
      date: '2023-05-20',
      description: 'Customer inquired about product features',
      icon: <EnvelopeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    },
    {
      id: 5,
      type: 'cart',
      title: 'Added items to cart',
      date: '2023-05-19',
      description: 'Added 3 items to shopping cart',
      icon: <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    },
    {
      id: 6,
      type: 'viewed',
      title: 'Viewed products',
      date: '2023-05-18',
      description: 'Browsed through 12 products',
      icon: <EyeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    },
    {
      id: 7,
      type: 'newsletter',
      title: 'Subscribed to newsletter',
      date: '2023-05-16',
      description: 'Customer opted in to marketing emails',
      icon: <EnvelopeOpenIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    }
  ];

  // Determine which activities to show
  const visibleActivities = showMoreActivity 
    ? [...recentActivities, ...extendedActivities] 
    : recentActivities;

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className="absolute inset-0 overflow-hidden">
        {/* Background overlay */}
        <div 
          className={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}
          style={{animationDuration: '0.2s'}}
          onClick={onClose}
          aria-hidden="true"
        ></div>
        
        {/* Drawer panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div 
            className={`relative w-screen max-w-md transform transition ease-in-out duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} animate-slide-in-right`}
            style={{animationDuration: '0.3s'}}
          >
            <div className="h-full flex flex-col py-6 bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
              {/* Header */}
              <div className="px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Customer Details
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      type="button"
                      className="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Customer details content */}
              <div className="mt-6 relative flex-1 px-4 sm:px-6">
                <div className="flex flex-col h-full">
                  {/* Customer profile header */}
                  <div className="pb-5 border-b border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-50 opacity-0" style={{animationDuration: '0.3s'}}>
                    <div className="flex items-center">
                      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-medium">
                        {initials}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">{customer.name}</h3>
                        <div className="mt-1 flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${customer.statusColor}`}>
                            {customer.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact information */}
                  <div className="py-5 border-b border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-100 opacity-0" style={{animationDuration: '0.3s'}}>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact Information</h4>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                        <span className="ml-3 text-sm text-gray-900 dark:text-white">{customer.email}</span>
                      </div>
                      <div className="flex items-center">
                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                        <span className="ml-3 text-sm text-gray-900 dark:text-white">{customer.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Purchase information */}
                  <div className="py-5 border-b border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-100 opacity-0" style={{animationDuration: '0.3s'}}>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Purchase Information</h4>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center">
                        <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                        <span className="ml-3 text-sm text-gray-900 dark:text-white">Total Spent: {customer.totalSpent}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                        <span className="ml-3 text-sm text-gray-900 dark:text-white">Last Transaction: {customer.lastTransaction}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Activity timeline */}
                  <div className="py-5 animate-fade-in-up animation-delay-200 opacity-0" style={{animationDuration: '0.3s'}}>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recent Activity</h4>
                    <div className="mt-3 flow-root">
                      <ul className="-mb-8">
                        {visibleActivities.map((activity, activityIdx) => (
                          <li key={activity.id}>
                            <div className="relative pb-8">
                              {activityIdx !== visibleActivities.length - 1 ? (
                                <span 
                                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" 
                                  aria-hidden="true"
                                />
                              ) : null}
                              <div className="relative flex items-start space-x-3">
                                <div className="relative">
                                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    {activity.icon}
                                  </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div>
                                    <div className="text-sm text-gray-900 dark:text-white">{activity.title}</div>
                                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                                      {activity.date}
                                    </p>
                                  </div>
                                  <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                    <p>{activity.description}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Load more button */}
                      {!showMoreActivity && extendedActivities.length > 0 && (
                        <div className="mt-2 text-center">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            onClick={() => setShowMoreActivity(true)}
                          >
                            <span>Load More</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="mt-auto pt-5 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-300 opacity-0" style={{animationDuration: '0.3s'}}>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        onClick={() => {
                          onClose();
                          // Call the edit function passed as prop
                          if (customer) {
                            onEdit(customer.id);
                          }
                        }}
                      >
                        <PencilIcon className="h-4 w-4 mr-2" />
                        Edit Customer
                      </button>
                      <button
                        type="button"
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        onClick={onClose}
                      >
                        <XMarkIcon className="h-4 w-4 mr-2" />
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<{
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
  } | null>(null);
  
  // Filter state
  const [filters, setFilters] = useState({
    status: "",
    sortBy: "name"
  });
  
  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<{
    id: number;
    name: string;
    email: string;
  } | null>(null);

  // Details drawer state
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [customerToView, setCustomerToView] = useState<{
    id: number;
    name: string;
    email: string;
    phone: string;
    totalSpent: string;
    lastTransaction: string;
    status: string;
    statusColor: string;
  } | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Add the currentStatIndex state
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (123) 456-7890',
      totalSpent: '$1,250.00',
      lastTransaction: '2023-06-01',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (234) 567-8901',
      totalSpent: '$875.50',
      lastTransaction: '2023-05-28',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '+1 (345) 678-9012',
      totalSpent: '$0.00',
      lastTransaction: 'N/A',
      status: 'Invited',
      statusColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '+1 (456) 789-0123',
      totalSpent: '$150.25',
      lastTransaction: '2023-05-15',
      status: 'Inactive',
      statusColor: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    },
    {
      id: 5,
      name: 'Michael Wilson',
      email: 'michael.wilson@example.com',
      phone: '+1 (567) 890-1234',
      totalSpent: '$3,205.60',
      lastTransaction: '2023-06-02',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
    {
      id: 6,
      name: 'Sarah Brown',
      email: 'sarah.brown@example.com',
      phone: '+1 (678) 901-2345',
      totalSpent: '$765.30',
      lastTransaction: '2023-05-10',
      status: 'Inactive',
      statusColor: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    },
    {
      id: 7,
      name: 'David Miller',
      email: 'david.miller@example.com',
      phone: '+1 (789) 012-3456',
      totalSpent: '$1,890.45',
      lastTransaction: '2023-05-30',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    }
  ]);

  // Calculate statistics
  const totalCustomers = customers.length;
  // For this example, we'll assume customers with no transaction history are "invited"
  const invitedCustomers = customers.filter(c => c.lastTransaction === 'N/A').length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const inactiveCustomers = customers.filter(c => c.status === 'Inactive').length;

  // Stats data for mobile carousel
  const statsData = [
    {
      name: 'All Customers',
      value: totalCustomers.toString(),
      icon: UsersIcon,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      name: 'Invited Customers',
      value: invitedCustomers.toString(),
      icon: EnvelopeOpenIcon,
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      name: 'Active Customers',
      value: activeCustomers.toString(),
      icon: UserPlusIcon,
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    {
      name: 'Inactive Customers',
      value: inactiveCustomers.toString(),
      icon: UserIcon,
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400',
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

  // Filter customers based on search term and status filter
  const filteredCustomers = customers.filter(customer => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    // Status filter
    const matchesStatus = filters.status === "" || 
      customer.status.toLowerCase() === filters.status.toLowerCase();
    
    // Return true if both conditions are met
    return matchesSearch && matchesStatus;
  });

  // Sort customers based on sort filter
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (filters.sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'email':
        return a.email.localeCompare(b.email);
      case 'total':
        // Remove currency symbol and commas, then parse as float
        const totalA = parseFloat(a.totalSpent.replace(/[$,]/g, ''));
        const totalB = parseFloat(b.totalSpent.replace(/[$,]/g, ''));
        return totalB - totalA; // Sort by highest total first
      case 'recent':
        // Handle N/A values by placing them at the end
        if (a.lastTransaction === 'N/A') return 1;
        if (b.lastTransaction === 'N/A') return -1;
        // Otherwise, sort by date (most recent first)
        return new Date(b.lastTransaction).getTime() - new Date(a.lastTransaction).getTime();
      default:
        return 0;
    }
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = sortedCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Handle add new customer
  const handleAddCustomer = () => {
    setIsEditMode(false);
    setCustomerToEdit(null);
    setIsCustomerModalOpen(true);
  };

  // Handle edit customer
  const handleEditCustomer = (id: number) => {
    const customer = customers.find(c => c.id === id);
    if (customer) {
      setCustomerToEdit(customer);
      setIsEditMode(true);
      setIsCustomerModalOpen(true);
    }
  };

  // Handle view customer details
  const handleViewCustomerDetails = (id: number) => {
    const customer = customers.find(c => c.id === id);
    if (customer) {
      setCustomerToView(customer);
      setIsDetailsDrawerOpen(true);
    }
  };

  // Handle customer form submission (both add and edit)
  const handleCustomerSubmit = (data: CustomerFormData, customerId?: number) => {
    if (customerId) {
      // Update existing customer
      setCustomers(customers.map(customer => 
        customer.id === customerId ? {
          ...customer,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          status: data.status,
          // If status changes to Invited, reset spending data
          totalSpent: data.status === 'Invited' ? '$0.00' : customer.totalSpent,
          lastTransaction: data.status === 'Invited' ? 'N/A' : customer.lastTransaction,
          statusColor: 
            data.status === 'Active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : data.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
              : data.status === 'Invited'
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        } : customer
      ));
    } else {
      // Add new customer
      const newCustomer = {
        id: customers.length + 1,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        totalSpent: '$0.00',
        lastTransaction: 'N/A',
        status: data.status,
        statusColor: 
          data.status === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
          : data.status === 'Pending'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
          : data.status === 'Invited'
            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      };
      
      setCustomers([...customers, newCustomer]);
    }
  };

  // Handle open delete modal
  const handleDeleteClick = (customer: { id: number; name: string; email: string; }) => {
    setCustomerToDelete(customer);
    setIsDeleteModalOpen(true);
  };

  // Handle confirm delete
  const handleDeleteConfirm = () => {
    if (customerToDelete) {
      setCustomers(customers.filter(customer => customer.id !== customerToDelete.id));
    }
  };

  // Handle export customers (placeholder function)
  const handleExportCustomers = () => {
    alert('Export customers functionality will be implemented here');
  };

  // Helper function to get status badge details
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return {
          icon: CheckCircleIcon,
          colorClass: 'bg-green-100 border-green-500 text-green-800 dark:bg-green-800/30 dark:border-green-500 dark:text-green-400',
          iconColorClass: 'text-green-600 dark:text-green-400'
        };
      case 'Pending':
        return {
          icon: ClockIcon,
          colorClass: 'bg-yellow-100 border-yellow-500 text-yellow-800 dark:bg-yellow-800/30 dark:border-yellow-500 dark:text-yellow-400',
          iconColorClass: 'text-yellow-600 dark:text-yellow-400'
        };
      case 'Invited':
        return {
          icon: EnvelopeOpenIcon,
          colorClass: 'bg-indigo-100 border-indigo-500 text-indigo-800 dark:bg-indigo-800/30 dark:border-indigo-500 dark:text-indigo-400',
          iconColorClass: 'text-indigo-600 dark:text-indigo-400'
        };
      case 'Inactive':
        return {
          icon: XMarkIcon,
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

  // Handle filter change
  const handleFilterChange = (filterType: 'status' | 'sortBy', value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: "",
      sortBy: "name"
    });
  };

  // Get active filter count
  const activeFilterCount = [
    filters.status !== "",
  ].filter(Boolean).length;

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
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>

      {/* Main content */}
      <div className="space-y-6">
        {/* Header section - animate first */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 animate-fade-in-up opacity-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h2>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Manage and view all your customers in one place.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={handleAddCustomer}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Customer
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats section - animate second */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up animation-delay-100 opacity-0">
          {/* All Customers */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <UsersIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      All Customers
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {totalCustomers}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Invited Customers */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                  <EnvelopeOpenIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Invited Customers
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {invitedCustomers}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Active Customers */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <UserPlusIcon className="h-6 w-6 text-green-600 dark:text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Active Customers
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {activeCustomers}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Inactive Customers */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                  <UserIcon className="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Inactive Customers
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {inactiveCustomers}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Stats - Only visible on small screens */}
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
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{statsData[currentStatIndex].name}</p>
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
        
        {/* Customers table section - animate third */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden animate-fade-in-up animation-delay-200 opacity-0">
          {/* Search and filter section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="relative rounded-md w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="form-input block w-full pl-10 py-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-primary focus:border-primary"
                  placeholder="Search customers..."
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
                  onClick={handleExportCustomers}
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
                          value={filters.status}
                          onChange={(e) => handleFilterChange('status', e.target.value)}
                        >
                          <option value="">All</option>
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="invited">Invited</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                      <div className="px-3 py-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sort By</label>
                        <select 
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                          value={filters.sortBy}
                          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        >
                          <option value="name">Name</option>
                          <option value="email">Email</option>
                          <option value="total">Total Spent</option>
                          <option value="recent">Last Transaction</option>
                        </select>
                      </div>
                      <div className="px-3 py-2 flex justify-between">
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        >
                          Clear filters
                        </button>
                        <button
                          type="button"
                          onClick={() => setFilterOpen(false)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
          
          {/* Desktop Table - Hidden on mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Transaction
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentCustomers.length > 0 ? (
                  currentCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{customer.email}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{customer.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{customer.totalSpent}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {customer.lastTransaction}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {(() => {
                          const badge = getStatusBadge(customer.status);
                          const BadgeIcon = badge.icon;
                          return (
                            <span className={`px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full border ${badge.colorClass}`}>
                              <BadgeIcon className={`h-3.5 w-3.5 mr-1 ${badge.iconColorClass}`} />
                              {customer.status}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleViewCustomerDetails(customer.id)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            title="View customer details"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleEditCustomer(customer.id)}
                            className="text-primary hover:text-primary/80"
                            title="Edit customer"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick({
                              id: customer.id,
                              name: customer.name,
                              email: customer.email
                            })}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            title="Delete customer"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No customers found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Mobile Card Layout - Visible only on mobile */}
          <div className="block md:hidden">
            {currentCustomers.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {currentCustomers.map((customer) => (
                  <div key={customer.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</h3>
                          {(() => {
                            const badge = getStatusBadge(customer.status);
                            const BadgeIcon = badge.icon;
                            return (
                              <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full border ${badge.colorClass}`}>
                                <BadgeIcon className={`h-3.5 w-3.5 mr-1 ${badge.iconColorClass}`} />
                                {customer.status}
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleViewCustomerDetails(customer.id)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                          title="View customer details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditCustomer(customer.id)}
                          className="text-primary hover:text-primary/80 p-1"
                          title="Edit customer"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick({
                            id: customer.id,
                            name: customer.name,
                            email: customer.email
                          })}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1"
                          title="Delete customer"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-1 text-sm">
                      <div className="flex items-start">
                        <EnvelopeIcon className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                        <span className="text-gray-900 dark:text-white">{customer.email}</span>
                      </div>
                      <div className="flex items-start">
                        <PhoneIcon className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                        <span className="text-gray-900 dark:text-white">{customer.phone}</span>
                      </div>
                      <div className="flex items-start">
                        <CurrencyDollarIcon className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                        <span className="text-gray-900 dark:text-white">Total Spent: {customer.totalSpent}</span>
                      </div>
                      <div className="flex items-start">
                        <CalendarIcon className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                        <span className="text-gray-900 dark:text-white">Last Transaction: {customer.lastTransaction}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                No customers found matching your search criteria.
              </div>
            )}
          </div>
          
          {/* Pagination controls */}
          {filteredCustomers.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
              {/* Mobile pagination - simple Previous/Next buttons */}
              <div className="flex justify-between sm:hidden">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Previous
                </button>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Next
                </button>
              </div>
              
              {/* Desktop pagination controls - visible on sm screens and up */}
              <div className="hidden sm:flex sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Showing
                    <span className="font-medium mx-1">{indexOfFirstItem + 1}</span>
                    to
                    <span className="font-medium mx-1">
                      {Math.min(indexOfLastItem, filteredCustomers.length)}
                    </span>
                    of
                    <span className="font-medium mx-1">{filteredCustomers.length}</span>
                    customers
                  </span>
                  
                  <div className="ml-4">
                    <label htmlFor="itemsPerPage" className="sr-only">Items Per Page</label>
                    <select
                      id="itemsPerPage"
                      name="itemsPerPage"
                      className="block w-full pl-3 pr-10 py-1 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                    >
                      <option value={5}>5 per page</option>
                      <option value={10}>10 per page</option>
                      <option value={20}>20 per page</option>
                      <option value={50}>50 per page</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-md border ${
                      currentPage === 1
                        ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-300 dark:text-gray-600'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  
                  <div className="hidden md:flex">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`relative inline-flex items-center px-4 py-2 border ${
                          currentPage === number
                            ? 'bg-primary border-primary text-white'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                  
                  <div className="md:hidden">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                  
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-md border ${
                      currentPage === totalPages
                        ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-300 dark:text-gray-600'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Modal (used for both Add and Edit) */}
      <CustomerModal 
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onSubmit={handleCustomerSubmit}
        editMode={isEditMode}
        customerData={customerToEdit}
      />

      {/* Delete Customer Modal */}
      <DeleteCustomerModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        customer={customerToDelete}
      />

      {/* Customer Details Drawer */}
      <CustomerDetailsDrawer
        isOpen={isDetailsDrawerOpen}
        onClose={() => setIsDetailsDrawerOpen(false)}
        customer={customerToView}
        onEdit={handleEditCustomer}
      />
    </DashboardLayout>
  );
};

export default Customers; 