import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import { CodeBracketIcon, ClipboardIcon, CheckIcon, ArrowPathIcon, GlobeAltIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import InputField from '../../components/form/InputField';
import SelectField from '../../components/form/SelectField';

const ApiIntegration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const businessType = location.state?.businessType || 'personal';
  const [formData, setFormData] = useState({
    integrationMethod: 'api',
    platformType: '',
    callbackUrl: '',
    webhookUrl: '',
    testMode: true,
  });

  const [copied, setCopied] = useState({
    apiKey: false,
    secretKey: false,
  });

  const [showKeys, setShowKeys] = useState({
    apiKey: false,
    secretKey: false,
  });

  // Mock API credentials
  const apiCredentials = {
    apiKey: 'pk_test_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    secretKey: 'sk_test_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCopy = (key: keyof typeof copied, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopied(prev => ({ ...prev, [key]: false }));
      }, 2000);
    });
  };

  const handleToggleVisibility = (key: keyof typeof showKeys) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save this data to your state management or API
    console.log('API Integration Info:', formData);
    // Navigate to the Review page with the form data
    navigate('/onboarding/review', { 
      state: { 
        businessType,
        apiIntegration: formData
      } 
    });
  };

  const platformTypeOptions = [
    { value: '', label: 'Select your platform' },
    { value: 'shopify', label: 'Shopify' },
    { value: 'woocommerce', label: 'WooCommerce' },
    { value: 'magento', label: 'Magento' },
    { value: 'bigcommerce', label: 'BigCommerce' },
    { value: 'prestashop', label: 'PrestaShop' },
    { value: 'opencart', label: 'OpenCart' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <OnboardingLayout currentStep={businessType === 'personal' ? 1 : 2}>
      <style>{animationStyles}</style>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden animate-fade-in-up opacity-0">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <CodeBracketIcon className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">API & Integration Setup</h2>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Configure how you'll integrate Coinley with your business.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="animate-fade-in-up animation-delay-100 opacity-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Integration Method</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Choose how you want to integrate cryptocurrency payments into your business.
            </p>
          </div>

          <div className="space-y-4 animate-fade-in-up animation-delay-150 opacity-0">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="integrationMethod-api"
                  name="integrationMethod"
                  type="radio"
                  value="api"
                  checked={formData.integrationMethod === 'api'}
                  onChange={handleChange}
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="integrationMethod-api" className="font-medium text-gray-700 dark:text-gray-300">
                  Direct API Integration
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Integrate directly with our API for complete control and customization.
                </p>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="integrationMethod-plugin"
                  name="integrationMethod"
                  type="radio"
                  value="plugin"
                  checked={formData.integrationMethod === 'plugin'}
                  onChange={handleChange}
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="integrationMethod-plugin" className="font-medium text-gray-700 dark:text-gray-300">
                  Plugin / Extension
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Use our pre-built plugins for popular e-commerce platforms.
                </p>
              </div>
            </div>
          </div>

          {formData.integrationMethod === 'plugin' && (
            <div className="mt-6 animate-fade-in-up animation-delay-200 opacity-0">
              <SelectField
                id="platformType"
                name="platformType"
                label="Platform Type *"
                required={formData.integrationMethod === 'plugin'}
                value={formData.platformType}
                onChange={handleChange}
                options={platformTypeOptions}
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                We'll provide specific installation instructions for your platform after completing onboarding.
              </p>
            </div>
          )}

          {/* Show API credentials for both plugin and direct API integration */}
          <div className="mt-6 space-y-6 animate-fade-in-up animation-delay-200 opacity-0">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">API Credentials</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Use these credentials to authenticate your API requests.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  API Key (Public)
                </label>
                <div className="flex">
                  <div className="relative flex-1">
                    <input
                      type={showKeys.apiKey ? "text" : "password"}
                      readOnly
                      value={showKeys.apiKey ? apiCredentials.apiKey : '••••••••••••••••'}
                      className="input-field font-mono pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => handleToggleVisibility('apiKey')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      {showKeys.apiKey ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('apiKey', apiCredentials.apiKey)}
                    className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {copied.apiKey ? (
                      <CheckIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <ClipboardIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Secret Key (Private)
                </label>
                <div className="flex">
                  <div className="relative flex-1">
                    <input
                      type={showKeys.secretKey ? "text" : "password"}
                      readOnly
                      value={showKeys.secretKey ? apiCredentials.secretKey : '••••••••••••••••'}
                      className="input-field font-mono pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => handleToggleVisibility('secretKey')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      {showKeys.secretKey ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('secretKey', apiCredentials.secretKey)}
                    className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {copied.secretKey ? (
                      <CheckIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <ClipboardIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  Keep this secret! Never share your secret key or include it in client-side code.
                </p>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="btn btn-outline flex items-center"
              >
                <ArrowPathIcon className="h-5 w-5 mr-2" />
                Regenerate Keys
              </button>
            </div>
          </div>

          {formData.integrationMethod === 'api' && (
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 animate-fade-in-up animation-delay-250 opacity-0">
              <div className="sm:col-span-6">
                <InputField
                  id="callbackUrl"
                  name="callbackUrl"
                  type="url"
                  label="Callback URL"
                  icon={<GlobeAltIcon className="h-5 w-5" />}
                  value={formData.callbackUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/callback"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  The URL we'll redirect users to after completing a payment.
                </p>
              </div>

              <div className="sm:col-span-6">
                <InputField
                  id="webhookUrl"
                  name="webhookUrl"
                  type="url"
                  label="Webhook URL"
                  icon={<GlobeAltIcon className="h-5 w-5" />}
                  value={formData.webhookUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/webhook"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  The URL we'll send payment notifications to.
                </p>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-300 opacity-0">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="testMode"
                  name="testMode"
                  type="checkbox"
                  checked={formData.testMode}
                  onChange={handleChange}
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="testMode" className="font-medium text-gray-700 dark:text-gray-300">
                  Enable Test Mode
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Test your integration without processing real transactions. No fees will be charged in test mode.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-5 animate-fade-in-up animation-delay-350 opacity-0">
            {businessType === 'business' && (
              <button
                type="button"
                onClick={() => navigate('/onboarding/business-info', { state: { businessType } })}
                className="btn btn-outline"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className={`btn btn-primary ${businessType === 'personal' ? 'w-full' : ''}`}
            >
              Continue to Review
            </button>
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default ApiIntegration; 