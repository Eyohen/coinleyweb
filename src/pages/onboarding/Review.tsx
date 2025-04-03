import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import { 
  CheckCircleIcon, 
  ClipboardDocumentCheckIcon, 
  BuildingOfficeIcon, 
  CodeBracketIcon, 
  BeakerIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

const Review: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const businessType = location.state?.businessType || 'personal';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Get form data from location state
  const businessInfo = location.state?.businessInfo || {};
  const apiIntegration = location.state?.apiIntegration || {};

  // Format business type for display
  const formatBusinessType = (type: string) => {
    const types: { [key: string]: string } = {
      'sole_proprietorship': 'Sole Proprietorship',
      'partnership': 'Partnership',
      'llc': 'Limited Liability Company (LLC)',
      'corporation': 'Corporation',
      'nonprofit': 'Nonprofit Organization',
      'other': 'Other'
    };
    return types[type] || type;
  };

  // Format industry for display
  const formatIndustry = (industry: string) => {
    const industries: { [key: string]: string } = {
      'retail': 'Retail',
      'ecommerce': 'E-commerce',
      'technology': 'Technology',
      'finance': 'Finance',
      'healthcare': 'Healthcare',
      'education': 'Education',
      'hospitality': 'Hospitality',
      'manufacturing': 'Manufacturing',
      'other': 'Other'
    };
    return industries[industry] || industry;
  };

  // Format country for display
  const formatCountry = (country: string) => {
    const countries: { [key: string]: string } = {
      'US': 'United States',
      'CA': 'Canada',
      'UK': 'United Kingdom',
      'AU': 'Australia',
      'DE': 'Germany',
      'FR': 'France',
      'JP': 'Japan',
      'SG': 'Singapore'
    };
    return countries[country] || country;
  };

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
    
    @keyframes scale-in {
      0% {
        opacity: 0;
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .animate-fade-in-up {
      animation: fade-in-up 0.6s ease-out forwards;
    }
    
    .animate-pop-in {
      animation: pop-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    .animate-scale-in {
      animation: scale-in 0.5s ease-out forwards;
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsComplete(true);
      
      // In a real app, you would submit all data to your API
      console.log('Onboarding complete!');
      
      // Redirect to dashboard after a delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      console.error('Error submitting onboarding data:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <OnboardingLayout currentStep={businessType === 'personal' ? 2 : 3}>
      <style>{animationStyles}</style>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden animate-fade-in-up opacity-0">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <ClipboardDocumentCheckIcon className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Review & Submit</h2>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Review your information before finalizing your account setup.
          </p>
        </div>

        {isComplete ? (
          <div className="p-6 text-center animate-scale-in opacity-0">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Onboarding Complete!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your account has been successfully set up. You will be redirected to your dashboard shortly.
            </p>
            <div className="animate-pulse">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Redirecting to dashboard...
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Business Information (for business accounts only) */}
            {businessType === 'business' && (
              <div className="animate-fade-in-up animation-delay-100 opacity-0">
                <div className="flex items-center mb-4">
                  <BuildingOfficeIcon className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Business Information</h3>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Business Name</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{businessInfo.businessName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Business Type</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatBusinessType(businessInfo.businessType)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Industry</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatIndustry(businessInfo.industry)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{businessInfo.website || 'Not provided'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formatCountry(businessInfo.country)}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                        {businessInfo.address}<br />
                        {businessInfo.city}, {businessInfo.state} {businessInfo.zipCode}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{businessInfo.phoneNumber}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{businessInfo.email}</dd>
                    </div>
                  </dl>
                  <div className="mt-4 text-right">
                    <button
                      type="button"
                      onClick={() => navigate('/onboarding/business-info', { state: { businessType } })}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* API & Integration */}
            <div className="animate-fade-in-up animation-delay-150 opacity-0">
              <div className="flex items-center mb-4">
                <CodeBracketIcon className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">API & Integration</h3>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Integration Method</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white capitalize">
                      {apiIntegration.integrationMethod === 'api' ? 'Direct API Integration' : 
                       apiIntegration.integrationMethod === 'plugin' ? 'Plugin / Extension' : 
                       'Hosted Checkout'}
                    </dd>
                  </div>
                  {apiIntegration.integrationMethod === 'plugin' && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Platform</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white capitalize">
                        {apiIntegration.platformType}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Mode</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {apiIntegration.testMode ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          <BeakerIcon className="h-4 w-4 mr-1" />
                          Test Mode
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <BoltIcon className="h-4 w-4 mr-1" />
                          Live Mode
                        </span>
                      )}
                    </dd>
                  </div>
                  {apiIntegration.integrationMethod === 'api' && (
                    <>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Callback URL</dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">{apiIntegration.callbackUrl}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Webhook URL</dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">{apiIntegration.webhookUrl}</dd>
                      </div>
                    </>
                  )}
                </dl>
                <div className="mt-4 text-right">
                  <button
                    type="button"
                    onClick={() => navigate('/onboarding/api-integration', { 
                      state: { 
                        businessType,
                        businessInfo,
                        apiIntegration
                      } 
                    })}
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-200 opacity-0">
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => navigate('/onboarding/api-integration', { state: { businessType } })}
                  className="btn btn-outline"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Complete Setup'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </OnboardingLayout>
  );
};

export default Review; 