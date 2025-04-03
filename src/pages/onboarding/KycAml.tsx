import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import { ShieldCheckIcon, DocumentTextIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import InputField from '../../components/form/InputField';
import SelectField from '../../components/form/SelectField';

const KycAml: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const businessType = location.state?.businessType || 'personal';
  const [formData, setFormData] = useState({
    legalName: '',
    taxId: '',
    registrationNumber: '',
    incorporationDate: '',
    incorporationCountry: '',
    businessOwnership: '',
    hasAcceptedTerms: false,
  });
  
  const [files, setFiles] = useState({
    businessRegistration: null as File | null,
    proofOfAddress: null as File | null,
    identificationDocument: null as File | null,
  });

  const [errors, setErrors] = useState({
    businessRegistration: false,
    proofOfAddress: false,
    identificationDocument: false,
  });

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof typeof files) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [fileType]: e.target.files![0] }));
      setErrors(prev => ({ ...prev, [fileType]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      businessRegistration: !files.businessRegistration,
      proofOfAddress: !files.proofOfAddress,
      identificationDocument: !files.identificationDocument,
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // In a real app, you would upload files and save data to your API
    console.log('KYC/AML Info:', formData);
    console.log('Files:', files);
    
    // Navigate to the next step
    navigate('/onboarding/api-integration', { state: { businessType } });
  };

  const incorporationCountryOptions = [
    { value: '', label: 'Select a country' },
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'JP', label: 'Japan' },
    { value: 'SG', label: 'Singapore' }
  ];

  const businessOwnershipOptions = [
    { value: '', label: 'Select ownership structure' },
    { value: 'sole_proprietor', label: 'Sole Proprietor' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'llc', label: 'Limited Liability Company' },
    { value: 'corporation', label: 'Corporation' },
    { value: 'nonprofit', label: 'Nonprofit' },
    { value: 'public_company', label: 'Public Company' }
  ];

  return (
    <OnboardingLayout currentStep={businessType === 'personal' ? 1 : 2}>
      <style>{animationStyles}</style>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden animate-fade-in-up opacity-0">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">KYC/AML Compliance</h2>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            We need to verify your business identity to comply with regulations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="animate-fade-in-up animation-delay-100 opacity-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Business Legal Information</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              This information will be used for compliance and verification purposes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 animate-fade-in-up animation-delay-150 opacity-0">
            <div className="sm:col-span-3">
              <InputField
                id="legalName"
                name="legalName"
                type="text"
                label="Legal Business Name *"
                required
                value={formData.legalName}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-3">
              <InputField
                id="taxId"
                name="taxId"
                type="text"
                label="Tax ID / EIN *"
                required
                value={formData.taxId}
                onChange={handleChange}
                placeholder="XX-XXXXXXX"
              />
            </div>

            <div className="sm:col-span-3">
              <InputField
                id="registrationNumber"
                name="registrationNumber"
                type="text"
                label="Business Registration Number *"
                required
                value={formData.registrationNumber}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-3">
              <InputField
                id="incorporationDate"
                name="incorporationDate"
                type="date"
                label="Date of Incorporation *"
                required
                value={formData.incorporationDate}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-3">
              <SelectField
                id="incorporationCountry"
                name="incorporationCountry"
                label="Country of Incorporation *"
                required
                value={formData.incorporationCountry}
                onChange={handleChange}
                options={incorporationCountryOptions}
              />
            </div>

            <div className="sm:col-span-3">
              <SelectField
                id="businessOwnership"
                name="businessOwnership"
                label="Business Ownership Structure *"
                required
                value={formData.businessOwnership}
                onChange={handleChange}
                options={businessOwnershipOptions}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-200 opacity-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Required Documents</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Please upload the following documents for verification. Accepted formats: PDF, JPG, PNG (max 5MB each).
            </p>
          </div>

          <div className="space-y-6 animate-fade-in-up animation-delay-250 opacity-0">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Business Registration Document *
              </label>
              <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.businessRegistration ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} border-dashed rounded-md`}>
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label htmlFor="businessRegistration" className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input
                        id="businessRegistration"
                        name="businessRegistration"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'businessRegistration')}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Certificate of Incorporation, Business License, etc.
                  </p>
                  {files.businessRegistration && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      <DocumentTextIcon className="h-4 w-4 inline mr-1" />
                      {files.businessRegistration.name}
                    </p>
                  )}
                  {errors.businessRegistration && (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                      <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                      This document is required
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Proof of Business Address *
              </label>
              <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.proofOfAddress ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} border-dashed rounded-md`}>
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label htmlFor="proofOfAddress" className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input
                        id="proofOfAddress"
                        name="proofOfAddress"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'proofOfAddress')}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Utility bill, bank statement, or lease agreement (less than 3 months old)
                  </p>
                  {files.proofOfAddress && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      <DocumentTextIcon className="h-4 w-4 inline mr-1" />
                      {files.proofOfAddress.name}
                    </p>
                  )}
                  {errors.proofOfAddress && (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                      <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                      This document is required
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Identification Document (Owner/Director) *
              </label>
              <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.identificationDocument ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} border-dashed rounded-md`}>
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label htmlFor="identificationDocument" className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input
                        id="identificationDocument"
                        name="identificationDocument"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'identificationDocument')}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Passport, Driver's License, or Government-issued ID
                  </p>
                  {files.identificationDocument && (
                    <p className="text-sm text-gray-900 dark:text-white">
                      <DocumentTextIcon className="h-4 w-4 inline mr-1" />
                      {files.identificationDocument.name}
                    </p>
                  )}
                  {errors.identificationDocument && (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                      <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                      This document is required
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-300 opacity-0">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="hasAcceptedTerms"
                  name="hasAcceptedTerms"
                  type="checkbox"
                  checked={formData.hasAcceptedTerms}
                  onChange={handleChange}
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="hasAcceptedTerms" className="font-medium text-gray-700 dark:text-gray-300">
                  I certify that all information provided is accurate and complete *
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  By checking this box, you confirm that you have the authority to provide this information.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-5 animate-fade-in-up animation-delay-500 opacity-0">
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
              Continue to API Integration
            </button>
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default KycAml; 