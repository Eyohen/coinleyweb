import React, { useState } from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const Analytics: React.FC = () => {
  const [] = useState('30d');

  // Mock data for metrics
  const metrics = [
    {
      id: 1,
      name: 'Total Volume',
      value: '$12,543.00',
      change: '+12.5%',
      trend: 'up',
      icon: CurrencyDollarIcon,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      id: 2,
      name: 'Transaction Count',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: ChartBarIcon,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      id: 3,
      name: 'Average Transaction',
      value: '$80.40',
      change: '+3.7%',
      trend: 'up',
      icon: ArrowTrendingUpIcon,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      id: 4,
      name: 'Conversion Rate',
      value: '3.2%',
      change: '-0.5%',
      trend: 'down',
      icon: ArrowTrendingDownIcon,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
    },
  ];

  // Mock data for currency distribution

  return (
    <DashboardLayout>
      {/* Animation keyframes definition */}
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
          <div className="flex items-center mb-4">
            <ChartBarIcon className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            View detailed analytics and insights about your crypto payments.
          </p>
        </div>

        {/* Metrics/Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up animation-delay-100 opacity-0">
          {metrics.map((metric, index) => (
            <div 
              key={metric.id} 
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
              style={{ animationDelay: `${0.15 + index * 0.05}s`, opacity: 0, animation: 'fade-in-up 0.5s ease-out forwards' }}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${metric.bgColor} mr-4`}>
                  <metric.icon className={`h-6 w-6 ${metric.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  metric.trend === 'up' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3 mr-1" />
                  )}
                  {metric.change}
                </div>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">vs last month</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up animation-delay-300 opacity-0">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Revenue Overview</h3>
            <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">Revenue chart will be displayed here</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Transaction Volume</h3>
            <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">Transaction chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics; 