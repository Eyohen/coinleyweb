import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { 
  UserIcon, 
  PencilIcon, 
  TrashIcon, 
  PlusIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  KeyIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface Administrator {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface NewAdministrator {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  sex: 'male' | 'female' | 'other';
  role: string;
  status: 'active' | 'inactive';
}

const Administrators: React.FC = () => {
  // Mock data for administrators
  const [administrators, setAdministrators] = useState<Administrator[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Super Admin',
      status: 'active',
      lastLogin: '2023-06-01 09:30 AM'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2023-06-02 10:15 AM'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      role: 'Support',
      status: 'inactive',
      lastLogin: '2023-05-28 02:45 PM'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'Finance',
      status: 'active',
      lastLogin: '2023-06-01 11:20 AM'
    },
    {
      id: 5,
      name: 'Michael Wilson',
      email: 'michael.wilson@example.com',
      role: 'Support',
      status: 'active',
      lastLogin: '2023-05-31 03:10 PM'
    },
    // Adding more mock data to demonstrate pagination
    {
      id: 6,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2023-06-03 08:45 AM'
    },
    {
      id: 7,
      name: 'David Brown',
      email: 'david.brown@example.com',
      role: 'Finance',
      status: 'active',
      lastLogin: '2023-06-02 01:30 PM'
    },
    {
      id: 8,
      name: 'Lisa Taylor',
      email: 'lisa.taylor@example.com',
      role: 'Support',
      status: 'inactive',
      lastLogin: '2023-05-29 10:20 AM'
    },
    {
      id: 9,
      name: 'James Anderson',
      email: 'james.anderson@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2023-06-01 03:15 PM'
    },
    {
      id: 10,
      name: 'Patricia Martinez',
      email: 'patricia.martinez@example.com',
      role: 'Super Admin',
      status: 'active',
      lastLogin: '2023-06-03 09:10 AM'
    },
    {
      id: 11,
      name: 'Thomas White',
      email: 'thomas.white@example.com',
      role: 'Support',
      status: 'active',
      lastLogin: '2023-06-02 11:45 AM'
    },
    {
      id: 12,
      name: 'Jennifer Garcia',
      email: 'jennifer.garcia@example.com',
      role: 'Finance',
      status: 'inactive',
      lastLogin: '2023-05-30 02:20 PM'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Administrator | null>(null);
  const [newAdmin, setNewAdmin] = useState<NewAdministrator>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    sex: 'male',
    role: 'Admin',
    status: 'active'
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedRole, setSelectedRole] = useState('all');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<Administrator | null>(null);

  // Filter administrators based on search term and selected role
  const filteredAdministrators = administrators.filter(admin => {
    const matchesSearch = 
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || 
      admin.role.toLowerCase().replace(' ', '-') === selectedRole;
    
    return matchesSearch && (selectedRole === 'all' || matchesRole);
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAdministrators = filteredAdministrators.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAdministrators.length / itemsPerPage);

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

  // Handle edit click
  const handleEditClick = (admin: Administrator) => {
    const [firstName, lastName] = admin.name.split(' ');
    setEditingAdmin(admin);
    setNewAdmin({
      firstName: firstName || '',
      lastName: lastName || '',
      email: admin.email,
      phoneNumber: '', // You might want to add this to your Administrator interface
      sex: 'male', // You might want to add this to your Administrator interface
      role: admin.role,
      status: admin.status
    });
    setIsEditing(true);
    setShowAddModal(true);
  };

  // Handle adding/updating an administrator
  const handleAddAdmin = () => {
    if (newAdmin.firstName && newAdmin.lastName && newAdmin.email) {
      if (isEditing && editingAdmin) {
        // Update existing administrator
        setAdministrators(administrators.map(admin => 
          admin.id === editingAdmin.id
            ? {
                ...admin,
                name: `${newAdmin.firstName} ${newAdmin.lastName}`,
                email: newAdmin.email,
                role: newAdmin.role,
                status: newAdmin.status
              }
            : admin
        ));
      } else {
        // Add new administrator
        setAdministrators([
          ...administrators,
          {
            id: administrators.length + 1,
            name: `${newAdmin.firstName} ${newAdmin.lastName}`,
            email: newAdmin.email,
            role: newAdmin.role,
            status: newAdmin.status,
            lastLogin: 'Never'
          }
        ]);
      }
      // Reset form
      setNewAdmin({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        sex: 'male',
        role: 'Admin',
        status: 'active'
      });
      setEditingAdmin(null);
      setIsEditing(false);
      setShowAddModal(false);
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (admin: Administrator) => {
    setAdminToDelete(admin);
    setShowDeleteModal(true);
  };

  // Handle actual deletion
  const handleDeleteConfirm = () => {
    if (adminToDelete) {
      setAdministrators(administrators.filter(admin => admin.id !== adminToDelete.id));
      setShowDeleteModal(false);
      setAdminToDelete(null);
    }
  };

  // Handle role filter change
  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Handle Escape key press to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showAddModal) {
        setShowAddModal(false);
      }
    };

    // Add event listener when modal is shown
    if (showAddModal) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showAddModal]);

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Helper function to get status badge style and icon
  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return {
        icon: <CheckCircleIcon className="h-4 w-4 mr-1" />,
        bgClass: 'bg-green-100 dark:bg-green-900/30',
        textClass: 'text-green-800 dark:text-green-400',
        borderClass: 'border border-green-200 dark:border-green-800/30'
      };
    } else {
      return {
        icon: <XMarkIcon className="h-4 w-4 mr-1" />,
        bgClass: 'bg-red-100 dark:bg-red-900/30',
        textClass: 'text-red-800 dark:text-red-400',
        borderClass: 'border border-red-200 dark:border-red-800/30'
      };
    }
  };

  return (
    <DashboardLayout>
      {/* Animation keyframes and classes */}
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
      `}</style>

      <div className="space-y-6">
        {/* Header section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 animate-fade-in-up opacity-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Administrators</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your organization's administrators and their access levels.
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Add Administrator
            </button>
          </div>
        </div>

        {/* Administrators table */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden animate-fade-in-up animation-delay-100 opacity-0">
          {/* Search and filter section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-white sm:text-sm"
                  placeholder="Search administrators..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when search term changes
                  }}
                />
              </div>
              <div className="flex-shrink-0">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={selectedRole}
                  onChange={handleRoleFilterChange}
                >
                  <option value="all">All Roles</option>
                  <option value="super-admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="support">Support</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table - Hidden on mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentAdministrators.map((admin, index) => (
                  <tr 
                    key={admin.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${0.15 + index * 0.05}s` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary font-medium">
                          {getInitials(admin.name)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{admin.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{admin.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{admin.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getStatusBadge(admin.status).bgClass
                      } ${getStatusBadge(admin.status).textClass} ${getStatusBadge(admin.status).borderClass}`}>
                        {getStatusBadge(admin.status).icon}
                        {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {admin.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          onClick={() => handleEditClick(admin)}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => handleDeleteClick(admin)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout - Visible only on mobile */}
          <div className="block md:hidden">
            {currentAdministrators.map((admin, index) => (
              <div 
                key={admin.id} 
                className="p-4 border-b border-gray-200 dark:border-gray-700 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.15 + index * 0.05}s` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary font-medium">
                      {getInitials(admin.name)}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{admin.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{admin.role}</div>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getStatusBadge(admin.status).bgClass
                        } ${getStatusBadge(admin.status).textClass} ${getStatusBadge(admin.status).borderClass}`}>
                          {getStatusBadge(admin.status).icon}
                          {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      onClick={() => handleEditClick(admin)}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => handleDeleteClick(admin)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center text-sm">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                    <span className="text-gray-900 dark:text-white">{admin.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                    <span className="text-gray-500 dark:text-gray-400">Last login: {admin.lastLogin}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredAdministrators.length === 0 && (
            <div className="px-6 py-10 text-center">
              <p className="text-gray-500 dark:text-gray-400">No administrators found matching your search criteria.</p>
            </div>
          )}
          
          {/* Pagination controls */}
          {filteredAdministrators.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 animate-fade-in-up animation-delay-300 opacity-0">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                {/* Desktop pagination controls */}
                <div className="hidden sm:flex items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Showing
                    <span className="font-medium mx-1">{indexOfFirstItem + 1}</span>
                    to
                    <span className="font-medium mx-1">
                      {Math.min(indexOfLastItem, filteredAdministrators.length)}
                    </span>
                    of
                    <span className="font-medium mx-1">{filteredAdministrators.length}</span>
                    results
                  </span>
                  
                  <div className="ml-4">
                    <label htmlFor="itemsPerPage" className="sr-only">Items Per Page</label>
                    <select
                      id="itemsPerPage"
                      name="itemsPerPage"
                      className="block w-full pl-3 pr-10 py-1 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                
                {/* Desktop pagination buttons */}
                <div className="hidden sm:flex items-center space-x-2">
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
                
                {/* Mobile pagination - simple Previous/Next only */}
                <div className="flex items-center justify-between w-full sm:hidden">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                      currentPage === 1
                        ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-300 dark:text-gray-600'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <ChevronLeftIcon className="h-5 w-5 mr-1" />
                    Previous
                  </button>
                  
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                      currentPage === totalPages
                        ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-300 dark:text-gray-600'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Next
                    <ChevronRightIcon className="h-5 w-5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Administrator Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity animate-fade-in-up" style={{animationDuration: '0.2s'}}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block w-full align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative animate-pop-in" style={{animationDuration: '0.3s'}}>
              {/* Close button */}
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary z-10"
                onClick={() => setShowAddModal(false)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 sm:mx-0 sm:h-10 sm:w-10">
                    <UserGroupIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-left sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                      {isEditing ? 'Edit Administrator' : 'Add New Administrator'}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                            First Name *
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                              type="text"
                              name="firstName"
                              id="firstName"
                              className="block w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="Enter first name"
                              value={newAdmin.firstName}
                              onChange={(e) => setNewAdmin({...newAdmin, firstName: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                            Last Name *
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              className="block w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="Enter last name"
                              value={newAdmin.lastName}
                              onChange={(e) => setNewAdmin({...newAdmin, lastName: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                          Email Address *
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Enter email address"
                            value={newAdmin.email}
                            onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                          Phone Number
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          <input
                            type="tel"
                            name="phoneNumber"
                            id="phoneNumber"
                            className="block w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Enter phone number"
                            value={newAdmin.phoneNumber}
                            onChange={(e) => setNewAdmin({...newAdmin, phoneNumber: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="sex" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                          Sex
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          <select
                            id="sex"
                            name="sex"
                            className="block w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            value={newAdmin.sex}
                            onChange={(e) => {
                              const value = e.target.value as 'male' | 'female' | 'other';
                              setNewAdmin({...newAdmin, sex: value});
                            }}
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                          Role *
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ShieldCheckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          <select
                            id="role"
                            name="role"
                            className="block w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            value={newAdmin.role}
                            onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                            required
                          >
                            <option value="Super Admin">Super Admin</option>
                            <option value="Admin">Admin</option>
                            <option value="Support">Support</option>
                            <option value="Finance">Finance</option>
                          </select>
                        </div>
                        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-left">
                          {newAdmin.role === 'Super Admin' && (
                            <p>Has full access to all system features and can manage other administrators.</p>
                          )}
                          {newAdmin.role === 'Admin' && (
                            <p>Can manage users, view reports, and access most system features.</p>
                          )}
                          {newAdmin.role === 'Support' && (
                            <p>Can view user information, handle support tickets, and access basic features.</p>
                          )}
                          {newAdmin.role === 'Finance' && (
                            <p>Can access financial reports, manage transactions, and view payment information.</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                          Status *
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CheckCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          <select
                            id="status"
                            name="status"
                            className="block w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            value={newAdmin.status}
                            onChange={(e) => {
                              const value = e.target.value as 'active' | 'inactive';
                              setNewAdmin({...newAdmin, status: value});
                            }}
                            required
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 text-left">
                        <KeyIcon className="h-4 w-4 flex-shrink-0" />
                        <span>Login credentials will be sent to {newAdmin.email || "the administrator's email"}.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse space-y-3 sm:space-y-0">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddAdmin}
                >
                  {isEditing ? 'Update Administrator' : 'Add Administrator'}
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && adminToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity animate-fade-in-up" style={{animationDuration: '0.2s'}}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative animate-pop-in" style={{animationDuration: '0.3s'}}>
              {/* Close button */}
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary z-10"
                onClick={() => setShowDeleteModal(false)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 sm:mx-0 sm:h-10 sm:w-10">
                    <TrashIcon className="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                      Delete Administrator
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete {adminToDelete.name}? This action cannot be undone.
                      </p>
                      <div className="mt-4 bg-gray-50 dark:bg-gray-700 rounded-md p-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-white">Administrator Details</div>
                          <div className="mt-1 text-gray-500 dark:text-gray-400">
                            <p>Name: {adminToDelete.name}</p>
                            <p>Email: {adminToDelete.email}</p>
                            <p>Role: {adminToDelete.role}</p>
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
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Administrators; 