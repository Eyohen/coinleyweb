import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Cog6ToothIcon, BuildingOfficeIcon, ShieldCheckIcon, CommandLineIcon, LockClosedIcon, GlobeAltIcon, PhoneIcon, EnvelopeIcon, DocumentTextIcon, ExclamationCircleIcon, ClipboardIcon, CheckIcon, ArrowPathIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import InputField from '../../components/form/InputField';
import SelectField from '../../components/form/SelectField';
import TextAreaField from '../../components/form/TextAreaField';
import axios from 'axios';
import { URL } from '../../url'
import { useAuth } from '../../context/AuthContext';



// Tab content components
const BusinessInformation: React.FC = () => {

  const { token, merchant, updateMerchant } = useAuth();

  const [formData, setFormData] = useState({

    businessName: '',
    businessType: '',
    website: '',
    industry: '',
    country: '',
    address: '',
    city: '',
    state: '',
    postal: '',
    phoneNumber: '',
    email: '',
  });


  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  // Load existing merchant data on component mount
  useEffect(() => {
    // Initialize form data from the merchant context
    if (merchant) {
      setFormData(prevData => ({
        ...prevData,
        businessName: merchant.businessName || '',
        email: merchant.email || '',
        // businessType: merchant.businessType || '',
        // industry: merchant.industry || '',
        // state: merchant.state || '',
        // country: merchant.country || '',
        // phoneNumber: merchant.phone || '',
        // Try to fill in other fields that might come from dashboard API
      }));
    }

    // If we need additional data not in the auth context, fetch it
    const fetchAdditionalMerchantData = async () => {
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        setIsLoading(true);

        // Extract API credentials from merchant context
        // Extract API credentials with null check
        const apiKey = merchant?.apiKey;
        const apiSecret = merchant?.apiSecret;

        if (!apiKey || !apiSecret) {
          console.error('API credentials not found');
          setErrorMessage('API credentials not found. Cannot load data.');
          return;
        }

        // Make request to the dashboard endpoint to get complete merchant data
        const response = await axios.get(`${URL}/api/merchants/dashboard`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'x-api-key': apiKey,
            'x-API-Secret': apiSecret

          }
        });

        if (response.data && response.data.merchant) {
          const merchantData = response.data.merchant;

          // Update form with existing data from merchant object
          setFormData(prevData => ({
            ...prevData,
            businessName: merchantData.businessName || '',
            businessType: merchantData.businessType || '',
            industry: merchantData.industry || '',
            state: merchantData.state || '',
            country: merchantData.country || '',
            phoneNumber: merchantData.phone || '',
            email: merchantData.email || '',
            position: merchantData.position || '',
            city: merchantData.city || '',
            website: merchantData.website || '',
            address: merchantData.address || '',
            postal: merchantData.postal || '',
          }));
        }
      } catch (error) {
        console.error('Error fetching additional merchant data:', error);
        setErrorMessage('Failed to load your business information');
      } finally {
        setIsLoading(false);
        setInitialLoad(false);
      }
    };

    fetchAdditionalMerchantData();
  }, [token, merchant]);


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
    if (formData.state && initialLoad === false) {
      setFormData(prev => ({ ...prev, state: '', city: '' }));
    }
  }, [formData.country, initialLoad]);

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
      if (formData.city && initialLoad === false) {
        setFormData(prev => ({ ...prev, city: '' }));
      }
    } else {
      setCityOptions([
        { value: '', label: 'Select a city' }
      ]);
    }
  }, [formData.state, initialLoad]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear success/error messages when user makes changes
    if (successMessage) setSuccessMessage('');
    if (errorMessage) setErrorMessage('');
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {

      if (!token || !merchant) {
        setErrorMessage('You must be logged in to update your information');
        setIsLoading(false)
        return;
      }

      // Extract API credentials with null check
      const apiKey = merchant?.apiKey;
      const apiSecret = merchant?.apiSecret;

      if (!apiKey || !apiSecret) {
        console.error('API credentials not found');
        setErrorMessage('API credentials not found. Cannot update profile.');
        setIsLoading(false);
        return;
      }

      // Map the form data to match the API's expected format based on what we saw in updateProfile
      const dataToSend = {

        businessName: formData.businessName,
        businessType: formData.businessType,
        phone: formData.phoneNumber,
        industry: formData.industry,
        state: formData.state,
        country: formData.country,
        address: formData.address,
        city: formData.city,
        postal: formData.postal,
        website: formData.website,
      };

      // Call the updateProfile endpoint
      const response = await axios.put(`${URL}/api/merchants/profile`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-api-key': apiKey,
          'x-API-Secret': apiSecret
        }
      });

      if (response.data && response.data.success) {
        setSuccessMessage('Business information updated successfully');



        // Update the merchant data in the auth context if needed
        updateMerchant({
          businessName: formData.businessName,
          // Include other updated fields as needed
        });

      } else {
        setErrorMessage('Failed to update business information');
      }
    } catch (error) {
      console.error('Error updating business information:', error);
      const err = error as any; // Type assertion for the error object
      setErrorMessage(err.response?.data?.error || 'Failed to update business information');
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="space-y-4 animate-fade-in-up opacity-0">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Business Information</h3>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errorMessage}
          </div>
        )}


        <form onSubmit={handleSubmit} className="space-y-6">
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
                id="postal"
                name="postal"
                type="text"
                label="ZIP / Postal Code *"
                required
                value={formData.postal}
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
              className={`btn btn-primary flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : 'Save Information'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const KYCAMLCompliance: React.FC = () => {
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
    <div className="space-y-4 animate-fade-in-up opacity-0">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">KYC/AML Compliance</h3>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-fade-in-up animation-delay-100 opacity-0">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">Business Legal Information</h4>
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
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">Required Documents</h4>
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

          <div className="flex justify-end animate-fade-in-up animation-delay-350 opacity-0">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Submit Documents
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const APIIntegration: React.FC = () => {
  const [formData, setFormData] = useState({
    integrationMethod: '',
    platformType: '',
    callbackUrl: '',
    webhookUrl: '',
    testMode: true,
  });

  const [copied, setCopied] = useState({
    apiKey: false,
    secretKey: false,
  });

  // Mock API credentials
  const apiCredentials = {
    apiKey: 'pk_test_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    secretKey: 'sk_test_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save this data to your state management or API
    console.log('API Integration Info:', formData);
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
    <div className="space-y-4 animate-fade-in-up opacity-0">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">API & Integration Setup</h3>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-fade-in-up animation-delay-100 opacity-0">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">Integration Method</h4>
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

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="integrationMethod-hosted"
                  name="integrationMethod"
                  type="radio"
                  value="hosted"
                  checked={formData.integrationMethod === 'hosted'}
                  onChange={handleChange}
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="integrationMethod-hosted" className="font-medium text-gray-700 dark:text-gray-300">
                  Hosted Checkout
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Use our hosted payment page with minimal integration effort.
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

          {(formData.integrationMethod === 'api' || formData.integrationMethod === 'hosted') && (
            <div className="mt-6 space-y-6 animate-fade-in-up animation-delay-200 opacity-0">
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">API Credentials</h4>
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
                    <input
                      type="text"
                      readOnly
                      value={apiCredentials.apiKey}
                      className="input-field font-mono flex-1 min-w-0 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
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
                    <input
                      type="text"
                      readOnly
                      value={apiCredentials.secretKey}
                      className="input-field font-mono flex-1 min-w-0 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
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
                  className="btn btn-outline flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <ArrowPathIcon className="h-5 w-5 mr-2" />
                  Regenerate Keys
                </button>
              </div>
            </div>
          )}

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

          <div className="flex justify-end pt-5 animate-fade-in-up animation-delay-350 opacity-0">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Integration Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SecuritySettings: React.FC = () => {
  const [formData, setFormData] = useState({
    twoFactorAuth: 'none',
    phoneNumber: '',
    withdrawalConfirmation: true,
    loginNotifications: true,
    paymentNotifications: true,
    ipWhitelist: '',
    passwordStrength: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    phoneNumber: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));

      // Clear errors when field is changed
      if (name in errors) {
        setErrors(prev => ({ ...prev, [name]: false }));
      }

      // Check password strength
      if (name === 'password') {
        const strength = checkPasswordStrength(value);
        setFormData(prev => ({ ...prev, passwordStrength: strength }));
      }
    }
  };

  const checkPasswordStrength = (password: string): string => {
    if (!password) return '';

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    const score = [hasLowercase, hasUppercase, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length;

    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
  };

  const getPasswordStrengthColor = (): string => {
    switch (formData.passwordStrength) {
      case 'weak': return 'text-red-500 dark:text-red-400';
      case 'medium': return 'text-yellow-500 dark:text-yellow-400';
      case 'strong': return 'text-green-500 dark:text-green-400';
      default: return '';
    }
  };

  const validateForm = () => {
    const newErrors = {
      phoneNumber: formData.twoFactorAuth === 'sms' && !formData.phoneNumber,
      password: !!formData.password && formData.passwordStrength === 'weak',
      confirmPassword: !!formData.password && formData.password !== formData.confirmPassword,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // In a real app, you would save this data to your state management or API
    console.log('Security Settings:', formData);
  };

  return (
    <div className="space-y-4 animate-fade-in-up opacity-0">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Security Settings</h3>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-fade-in-up animation-delay-100 opacity-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
          </div>

          <div className="space-y-4 animate-fade-in-up animation-delay-150 opacity-0">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="twoFactorAuth-none"
                  name="twoFactorAuth"
                  type="radio"
                  value="none"
                  checked={formData.twoFactorAuth === 'none'}
                  onChange={handleChange}
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="twoFactorAuth-none" className="font-medium text-gray-700 dark:text-gray-300">
                  No Two-Factor Authentication
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Not recommended. Your account will be less secure.
                </p>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="twoFactorAuth-app"
                  name="twoFactorAuth"
                  type="radio"
                  value="app"
                  checked={formData.twoFactorAuth === 'app'}
                  onChange={handleChange}
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="twoFactorAuth-app" className="font-medium text-gray-700 dark:text-gray-300">
                  Authenticator App
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Use an authenticator app like Google Authenticator or Authy.
                </p>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="twoFactorAuth-sms"
                  name="twoFactorAuth"
                  type="radio"
                  value="sms"
                  checked={formData.twoFactorAuth === 'sms'}
                  onChange={handleChange}
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="twoFactorAuth-sms" className="font-medium text-gray-700 dark:text-gray-300">
                  SMS Authentication
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive verification codes via SMS.
                </p>
              </div>
            </div>
          </div>

          {formData.twoFactorAuth === 'app' && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Setup Instructions</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                You'll need to scan a QR code with your authenticator app.
              </p>
              <div className="flex items-center">
                <DevicePhoneMobileIcon className="h-10 w-10 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Download an authenticator app
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    We recommend Google Authenticator or Authy
                  </p>
                </div>
              </div>
            </div>
          )}

          {formData.twoFactorAuth === 'sms' && (
            <div className="mt-6">
              <InputField
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                label="Phone Number *"
                icon={<PhoneIcon className="h-5 w-5" />}
                required={formData.twoFactorAuth === 'sms'}
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 (555) 987-6543"
                error={errors.phoneNumber ? "Phone number is required for SMS authentication" : undefined}
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Standard message and data rates may apply.
              </p>
            </div>
          )}

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-200 opacity-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Account Security</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Configure additional security settings to protect your account.
            </p>
          </div>

          <div className="space-y-4 animate-fade-in-up animation-delay-250 opacity-0">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="withdrawalConfirmation"
                  name="withdrawalConfirmation"
                  type="checkbox"
                  checked={formData.withdrawalConfirmation}
                  onChange={handleChange}
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="withdrawalConfirmation" className="font-medium text-gray-700 dark:text-gray-300">
                  Require confirmation for withdrawals
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive an email confirmation before processing withdrawals.
                </p>
              </div>
            </div>

            <div className="sm:col-span-6">
              <InputField
                id="ipWhitelist"
                name="ipWhitelist"
                type="text"
                label="IP Whitelist (Optional)"
                icon={<GlobeAltIcon className="h-5 w-5" />}
                value={formData.ipWhitelist}
                onChange={handleChange}
                placeholder="192.168.1.1, 10.0.0.1"
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Restrict API access to specific IP addresses. Separate multiple IPs with commas.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-300 opacity-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notifications</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Configure security notifications for your account.
            </p>
          </div>

          <div className="space-y-4 animate-fade-in-up animation-delay-350 opacity-0">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="loginNotifications"
                  name="loginNotifications"
                  type="checkbox"
                  checked={formData.loginNotifications}
                  onChange={handleChange}
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="loginNotifications" className="font-medium text-gray-700 dark:text-gray-300">
                  Login notifications
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive email notifications when someone logs into your account.
                </p>
              </div>
            </div>

            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="paymentNotifications"
                  name="paymentNotifications"
                  type="checkbox"
                  checked={formData.paymentNotifications}
                  onChange={handleChange}
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="paymentNotifications" className="font-medium text-gray-700 dark:text-gray-300">
                  Payment notifications
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive email notifications for all payment activities.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-400 opacity-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Change Password</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              It's a good idea to use a strong password that you don't use elsewhere.
            </p>
          </div>

          <div className="space-y-4 animate-fade-in-up animation-delay-450 opacity-0">
            <div className="sm:col-span-3">
              <InputField
                id="password"
                name="password"
                type="password"
                label="New Password"
                icon={<LockClosedIcon className="h-5 w-5" />}
                value={formData.password}
                onChange={handleChange}
                error={errors.password ? "Password is too weak" : undefined}
              />
              {formData.password && (
                <p className={`mt-2 text-sm ${getPasswordStrengthColor()}`}>
                  Password strength: {formData.passwordStrength}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <InputField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm New Password"
                icon={<LockClosedIcon className="h-5 w-5" />}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword ? "Passwords do not match" : undefined}
              />
            </div>
          </div>

          <div className="flex justify-end pt-5 animate-fade-in-up animation-delay-500 opacity-0">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Security Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Tab interface
interface TabProps {
  icon: React.ReactElement;
  title: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ icon, title, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out
      ${active
        ? 'bg-primary text-white'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
      }`}
  >
    <span className={`${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'}`}>
      {icon}
    </span>
    <span>{title}</span>
  </button>
);

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    {
      title: 'Business Information',
      icon: <BuildingOfficeIcon className="h-5 w-5" />,
      content: <BusinessInformation />
    },
    {
      title: 'KYC/AML Compliance',
      icon: <ShieldCheckIcon className="h-5 w-5" />,
      content: <KYCAMLCompliance />
    },
    {
      title: 'API & Integration',
      icon: <CommandLineIcon className="h-5 w-5" />,
      content: <APIIntegration />
    },
    {
      title: 'Security Settings',
      icon: <LockClosedIcon className="h-5 w-5" />,
      content: <SecuritySettings />
    }
  ];

  return (
    <DashboardLayout>
      {/* Animation keyframes definitions */}
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
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 animate-fade-in-up opacity-0">
          <div className="flex items-center mb-4">
            <Cog6ToothIcon className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Manage your account settings and preferences.
          </p>

          {/* Tabs - Desktop */}
          <div className="hidden md:flex space-x-2 mb-6 animate-fade-in-up animation-delay-100 opacity-0">
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                title={tab.title}
                active={activeTab === index}
                onClick={() => setActiveTab(index)}
              />
            ))}
          </div>

          {/* Tabs - Mobile */}
          <div className="md:hidden mb-6 animate-fade-in-up animation-delay-100 opacity-0">
            <label htmlFor="selectedTab" className="sr-only">Select a tab</label>
            <select
              id="selectedTab"
              className="block w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900 dark:text-white"
              value={activeTab}
              onChange={(e) => setActiveTab(Number(e.target.value))}
            >
              {tabs.map((tab, index) => (
                <option key={index} value={index}>{tab.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg animate-fade-in-up animation-delay-200 opacity-0">
          {tabs[activeTab].content}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings; 