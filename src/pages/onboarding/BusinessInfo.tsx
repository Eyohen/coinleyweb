import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import { BuildingOfficeIcon, GlobeAltIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import InputField from '../../components/form/InputField';
import SelectField from '../../components/form/SelectField';
import TextAreaField from '../../components/form/TextAreaField';

const BusinessInfo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const businessType = location.state?.businessType || 'personal';
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    website: '',
    industry: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    email: '',
  });

  const [stateOptions, setStateOptions] = useState<{ value: string; label: string }[]>([
    { value: '', label: 'Select a state/province' }
  ]);

  const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>([
    { value: '', label: 'Select a city' }
  ]);

  // Update state options based on selected country
  useEffect(() => {
    if (formData.country === 'US') {
      setStateOptions([
        { value: '', label: 'Select a state' },
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' },
        { value: 'CO', label: 'Colorado' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'DE', label: 'Delaware' },
        { value: 'FL', label: 'Florida' },
        { value: 'GA', label: 'Georgia' },
        { value: 'HI', label: 'Hawaii' },
        { value: 'ID', label: 'Idaho' },
        { value: 'IL', label: 'Illinois' },
        { value: 'IN', label: 'Indiana' },
        { value: 'IA', label: 'Iowa' },
        { value: 'KS', label: 'Kansas' },
        { value: 'KY', label: 'Kentucky' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'ME', label: 'Maine' },
        { value: 'MD', label: 'Maryland' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'MI', label: 'Michigan' },
        { value: 'MN', label: 'Minnesota' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'MO', label: 'Missouri' },
        { value: 'MT', label: 'Montana' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'NV', label: 'Nevada' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'NY', label: 'New York' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'OH', label: 'Ohio' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'OR', label: 'Oregon' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'SD', label: 'South Dakota' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'TX', label: 'Texas' },
        { value: 'UT', label: 'Utah' },
        { value: 'VT', label: 'Vermont' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WA', label: 'Washington' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'WI', label: 'Wisconsin' },
        { value: 'WY', label: 'Wyoming' },
        { value: 'DC', label: 'District of Columbia' }
      ]);
    } else if (formData.country === 'CA') {
      setStateOptions([
        { value: '', label: 'Select a province' },
        { value: 'AB', label: 'Alberta' },
        { value: 'BC', label: 'British Columbia' },
        { value: 'MB', label: 'Manitoba' },
        { value: 'NB', label: 'New Brunswick' },
        { value: 'NL', label: 'Newfoundland and Labrador' },
        { value: 'NS', label: 'Nova Scotia' },
        { value: 'ON', label: 'Ontario' },
        { value: 'PE', label: 'Prince Edward Island' },
        { value: 'QC', label: 'Quebec' },
        { value: 'SK', label: 'Saskatchewan' },
        { value: 'NT', label: 'Northwest Territories' },
        { value: 'NU', label: 'Nunavut' },
        { value: 'YT', label: 'Yukon' }
      ]);
    } else if (formData.country === 'UK') {
      setStateOptions([
        { value: '', label: 'Select a region' },
        { value: 'ENG', label: 'England' },
        { value: 'SCT', label: 'Scotland' },
        { value: 'WLS', label: 'Wales' },
        { value: 'NIR', label: 'Northern Ireland' }
      ]);
    } else {
      setStateOptions([
        { value: '', label: 'Select a state/province' }
      ]);
    }
    
    // Reset state and city when country changes
    if (formData.state) {
      setFormData(prev => ({ ...prev, state: '', city: '' }));
    }
  }, [formData.country]);

  // Update city options based on selected state
  useEffect(() => {
    // This is a simplified example. In a real app, you would fetch cities based on the state
    if (formData.state) {
      // For demo purposes, just showing some example cities
      if (formData.state === 'CA') {
        setCityOptions([
          { value: '', label: 'Select a city' },
          { value: 'LA', label: 'Los Angeles' },
          { value: 'SF', label: 'San Francisco' },
          { value: 'SD', label: 'San Diego' },
          { value: 'SJ', label: 'San Jose' },
          { value: 'OAK', label: 'Oakland' }
        ]);
      } else if (formData.state === 'NY') {
        setCityOptions([
          { value: '', label: 'Select a city' },
          { value: 'NYC', label: 'New York City' },
          { value: 'BUF', label: 'Buffalo' },
          { value: 'ROC', label: 'Rochester' },
          { value: 'SYR', label: 'Syracuse' },
          { value: 'ALB', label: 'Albany' }
        ]);
      } else if (formData.state === 'TX') {
        setCityOptions([
          { value: '', label: 'Select a city' },
          { value: 'HOU', label: 'Houston' },
          { value: 'AUS', label: 'Austin' },
          { value: 'DAL', label: 'Dallas' },
          { value: 'SA', label: 'San Antonio' },
          { value: 'FW', label: 'Fort Worth' }
        ]);
      } else {
        setCityOptions([
          { value: '', label: 'Select a city' },
          { value: 'other', label: 'Other' }
        ]);
      }
      
      // Reset city when state changes
      if (formData.city) {
        setFormData(prev => ({ ...prev, city: '' }));
      }
    } else {
      setCityOptions([
        { value: '', label: 'Select a city' }
      ]);
    }
  }, [formData.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save this data to your state management or API
    console.log('Business Info:', formData);
    
    // Get any existing state data
    const existingState = location.state || {};
    
    // Navigate to the next step based on business type with the form data
    navigate(businessType === 'personal' ? '/onboarding/api-integration' : '/onboarding/api-integration', { 
      state: { 
        ...existingState,
        businessType,
        businessInfo: formData
      } 
    });
  };

  const businessTypeOptions = [
    { value: '', label: 'Select a business type' },
    { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'llc', label: 'Limited Liability Company (LLC)' },
    { value: 'corporation', label: 'Corporation' },
    { value: 'nonprofit', label: 'Nonprofit Organization' },
    { value: 'other', label: 'Other' }
  ];

  const industryOptions = [
    { value: '', label: 'Select an industry' },
    { value: 'retail', label: 'Retail' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'hospitality', label: 'Hospitality' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'other', label: 'Other' }
  ];

  const countryOptions = [
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
    <OnboardingLayout currentStep={1}>
      <style>{animationStyles}</style>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden animate-fade-in-up opacity-0">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Business Information</h2>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Tell us about your business to help us customize your experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 animate-fade-in-up animation-delay-100 opacity-0">
            <div className="sm:col-span-3">
              <InputField
                id="businessName"
                name="businessName"
                type="text"
                label="Business Name *"
                required
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Enter your business name"
              />
            </div>

            <div className="sm:col-span-3">
              <SelectField
                id="businessType"
                name="businessType"
                label="Business Type *"
                required
                value={formData.businessType}
                onChange={handleChange}
                options={businessTypeOptions}
              />
            </div>

            <div className="sm:col-span-3">
              <InputField
                id="website"
                name="website"
                type="url"
                label="Website"
                icon={<GlobeAltIcon className="h-5 w-5" />}
                value={formData.website}
                onChange={handleChange}
                placeholder="www.example.com"
              />
            </div>

            <div className="sm:col-span-3">
              <SelectField
                id="industry"
                name="industry"
                label="Industry *"
                required
                value={formData.industry}
                onChange={handleChange}
                options={industryOptions}
              />
            </div>

            <div className="sm:col-span-3">
              <SelectField
                id="country"
                name="country"
                label="Country *"
                required
                value={formData.country}
                onChange={handleChange}
                options={countryOptions}
              />
            </div>

            <div className="sm:col-span-3">
              <SelectField
                id="state"
                name="state"
                label="State / Province *"
                required
                value={formData.state}
                onChange={handleChange}
                options={stateOptions}
              />
            </div>

            <div className="sm:col-span-3">
              <SelectField
                id="city"
                name="city"
                label="City *"
                required
                value={formData.city}
                onChange={handleChange}
                options={cityOptions}
              />
            </div>

            <div className="sm:col-span-3">
              <InputField
                id="zipCode"
                name="zipCode"
                type="text"
                label="ZIP / Postal Code *"
                required
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-6">
              <TextAreaField
                id="address"
                name="address"
                label="Street Address *"
                required
                value={formData.address}
                onChange={handleChange}
                rows={3}
                placeholder="Enter your complete street address"
              />
            </div>

            <div className="sm:col-span-3">
              <InputField
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                label="Phone Number *"
                icon={<PhoneIcon className="h-5 w-5" />}
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 (555) 987-6543"
              />
            </div>

            <div className="sm:col-span-3">
              <InputField
                id="email"
                name="email"
                type="email"
                label="Email Address *"
                icon={<EnvelopeIcon className="h-5 w-5" />}
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="business@example.com"
              />
            </div>
          </div>

          <div className="flex justify-end pt-5 animate-fade-in-up animation-delay-200 opacity-0">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Continue to {businessType === 'personal' ? 'KYC/AML' : 'API Integration'}
            </button>
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default BusinessInfo; 