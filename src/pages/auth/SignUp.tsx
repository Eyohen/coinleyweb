// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { EnvelopeIcon, LockClosedIcon, UserIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
// import AuthLayout from '../../components/auth/AuthLayout';
// import InputField from '../../components/form/InputField';
// import CheckboxRadio from '../../components/form/CheckboxRadio';
// import AnimatedForm from '../../components/auth/AnimatedForm';
// import { validateEmail } from '../../utils/validation';
// import axios from 'axios';
// import {URL} from '../../url'

// const SignUp: React.FC = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     businessName:'',
//     agreeToTerms: false,
//     businessType: 'personal'
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [termsError, setTermsError] = useState<string | undefined>(undefined);
//   const [emailError, setEmailError] = useState<string | undefined>(undefined);




//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
    
//     // Clear terms error when checkbox is checked
//     if (name === 'agreeToTerms' && checked) {
//       setTermsError(undefined);
//     }

//     // Validate email when it changes
//     if (name === 'email') {
//       const validation = validateEmail(value);
//       setEmailError(validation.isValid ? undefined : validation.message);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setTermsError(undefined);

//     // Validate email before submission
//     const emailValidation = validateEmail(formData.email);
//     if (!emailValidation.isValid) {
//       setEmailError(emailValidation.message);
//       return;
//     }

//     // Validate terms agreement
//     if (!formData.agreeToTerms) {
//       setTermsError('You must agree to the terms and conditions');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       // Simulate API call
//       const res = await axios.post(`${URL}/api/merchants/register`, formData);
      
//       // For demo purposes only - in a real app, you would call your registration API
//       console.log('Sign up attempt with:', formData);
      
//       // Redirect to OTP verification page with email and business type
//       navigate('/verify-email', { 
//         state: { 
//           email: formData.email, 
//           fromSignUp: true,
//           businessType: formData.businessType 
//         } 
//       });
//     } catch (err) {
//       setError('An error occurred during registration. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <AuthLayout 
//       title="Create your account" 
//       subtitle="Start accepting crypto payments for your business"
//       showProgress={true}
//       currentStep={1}
//       totalSteps={2}
//     >
//       <AnimatedForm>
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
//             {error}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Business Type Selection */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Account Type
//             </label>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto">
//               <label className={`relative flex items-center p-2.5 bg-white dark:bg-gray-800 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
//                 formData.businessType === 'personal'
//                   ? 'border-primary bg-primary/5 dark:bg-primary/10'
//                   : 'border-gray-200 dark:border-gray-700 hover:border-primary/30'
//               }`}>
//                 <input
//                   type="radio"
//                   name="businessType"
//                   value="personal"
//                   checked={formData.businessType === 'personal'}
//                   onChange={handleChange}
//                   className="sr-only"
//                 />
//                 <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
//                   formData.businessType === 'personal' 
//                     ? 'bg-primary text-white' 
//                     : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
//                 }`}>
//                   <UserIcon className="w-4 h-4" />
//                 </div>
//                 <div className="flex flex-col">
//                   <span className={`text-sm font-medium ${
//                     formData.businessType === 'personal'
//                       ? 'text-primary dark:text-primary'
//                       : 'text-gray-900 dark:text-white'
//                   }`}>Personal</span>
//                   <span className="text-xs text-gray-500 dark:text-gray-400">For individual users</span>
//                 </div>
//               </label>

//               <label className={`relative flex items-center p-2.5 bg-white dark:bg-gray-800 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
//                 formData.businessType === 'business'
//                   ? 'border-primary bg-primary/5 dark:bg-primary/10'
//                   : 'border-gray-200 dark:border-gray-700 hover:border-primary/30'
//               }`}>
//                 <input
//                   type="radio"
//                   name="businessType"
//                   value="business"
//                   checked={formData.businessType === 'business'}
//                   onChange={handleChange}
//                   className="sr-only"
//                 />
//                 <div className={`flex items-center justify-center w-8 h-8 aspect-square rounded-full mr-3 ${
//                   formData.businessType === 'business' 
//                     ? 'bg-primary text-white' 
//                     : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
//                 }`}>
//                   <BuildingOfficeIcon className="w-4 h-4" />
//                 </div>
//                 <div className="flex flex-col">
//                   <span className={`text-sm font-medium ${
//                     formData.businessType === 'business'
//                       ? 'text-primary dark:text-primary'
//                       : 'text-gray-900 dark:text-white'
//                   }`}>Business</span>
//                   <span className="text-xs text-gray-500 dark:text-gray-400">For companies and organizations</span>
//                 </div>
//               </label>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <InputField
//               id="firstName"
//               name="firstName"
//               type="text"
//               label="First Name"
//               icon={<UserIcon className="h-5 w-5" />}
//               required
//               value={formData.firstName}
//               onChange={handleChange}
//               placeholder="Enter your first name"
//             />

//             <InputField
//               id="lastName"
//               name="lastName"
//               type="text"
//               label="Last Name"
//               icon={<UserIcon className="h-5 w-5" />}
//               required
//               value={formData.lastName}
//               onChange={handleChange}
//               placeholder="Enter your last name"
//             />
//           </div>

//           <InputField
//             id="businessName"
//             name="businessName"
//             type="text"
//             label="Business Name"
//             icon={<EnvelopeIcon className="h-5 w-5" />}
//             required
//             value={formData.businessName}
//             onChange={handleChange}
//             placeholder="Enter your business name"
         
//           />

//           <InputField
//             id="email"
//             name="email"
//             type="email"
//             label="Email address"
//             icon={<EnvelopeIcon className="h-5 w-5" />}
//             autoComplete="email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             error={emailError}
//           />

//           <InputField
//             id="password"
//             name="password"
//             type="password"
//             label="Password"
//             icon={<LockClosedIcon className="h-5 w-5" />}
//             autoComplete="new-password"
//             required
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Create a password"
//           />

//           <CheckboxRadio
//             id="agreeToTerms"
//             name="agreeToTerms"
//             type="checkbox"
//             checked={formData.agreeToTerms}
//             onChange={handleChange}
//             error={termsError}
//             label={
//               <>
//                 I agree to the{' '}
//                 <a href="#" className="text-primary hover:text-primary/80">
//                   Terms of Service
//                 </a>{' '}
//                 and{' '}
//                 <a href="#" className="text-primary hover:text-primary/80">
//                   Privacy Policy
//                 </a>
//               </>
//             }
//           />

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="btn btn-primary w-full flex justify-center items-center"
//             >
//               {isLoading ? (
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               ) : null}
//               Create Account
//             </button>
//           </div>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Already have an account?{' '}
//             <Link to="/login" className="font-medium text-primary hover:text-primary/80">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </AnimatedForm>
//     </AuthLayout>
//   );
// };

// export default SignUp; 


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon, UserIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import AuthLayout from '../../components/auth/AuthLayout';
import InputField from '../../components/form/InputField';
import CheckboxRadio from '../../components/form/CheckboxRadio';
import AnimatedForm from '../../components/auth/AnimatedForm';
import { validateEmail } from '../../utils/validation';
import axios from 'axios';
import {URL} from '../../url'

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    businessName:'',
    agreeToTerms: false,
    businessType: 'personal'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear terms error when checkbox is checked
    if (name === 'agreeToTerms' && checked) {
      setTermsError(undefined);
    }

    // Validate email when it changes
    if (name === 'email') {
      const validation = validateEmail(value);
      setEmailError(validation.isValid ? undefined : validation.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTermsError(undefined);

    // Validate email before submission
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.message);
      return;
    }

    // Validate terms agreement
    if (!formData.agreeToTerms) {
      setTermsError('You must agree to the terms and conditions');
      return;
    }

    setIsLoading(true);
    
    try {
      // Make the actual API call to register the merchant
      const res = await axios.post(`${URL}/api/merchants/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        businessName: formData.businessName
      });
      
      // Store the token in localStorage for later use
      localStorage.setItem('token', res.data.token);
      
      // Store merchant data in localStorage (optional, based on your app's needs)
      localStorage.setItem('merchant', JSON.stringify(res.data.merchant));
      
      // Redirect to OTP verification page with email and business type
      navigate('/verify-email', { 
        state: { 
          email: formData.email, 
          fromSignUp: true,
          businessType: formData.businessType,
          verified: res.data.merchant.verified
        } 
      });
    } catch (err: any) {
      // Handle API errors
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create your account" 
      subtitle="Start accepting crypto payments for your business"
      showProgress={true}
      currentStep={1}
      totalSteps={2}
    >
      <AnimatedForm>
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Type Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Account Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto">
              <label className={`relative flex items-center p-2.5 bg-white dark:bg-gray-800 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                formData.businessType === 'personal'
                  ? 'border-primary bg-primary/5 dark:bg-primary/10'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary/30'
              }`}>
                <input
                  type="radio"
                  name="businessType"
                  value="personal"
                  checked={formData.businessType === 'personal'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                  formData.businessType === 'personal' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                }`}>
                  <UserIcon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-medium ${
                    formData.businessType === 'personal'
                      ? 'text-primary dark:text-primary'
                      : 'text-gray-900 dark:text-white'
                  }`}>Personal</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">For individual users</span>
                </div>
              </label>

              <label className={`relative flex items-center p-2.5 bg-white dark:bg-gray-800 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                formData.businessType === 'business'
                  ? 'border-primary bg-primary/5 dark:bg-primary/10'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary/30'
              }`}>
                <input
                  type="radio"
                  name="businessType"
                  value="business"
                  checked={formData.businessType === 'business'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`flex items-center justify-center w-8 h-8 aspect-square rounded-full mr-3 ${
                  formData.businessType === 'business' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                }`}>
                  <BuildingOfficeIcon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-medium ${
                    formData.businessType === 'business'
                      ? 'text-primary dark:text-primary'
                      : 'text-gray-900 dark:text-white'
                  }`}>Business</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">For companies and organizations</span>
                </div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="firstName"
              name="firstName"
              type="text"
              label="First Name"
              icon={<UserIcon className="h-5 w-5" />}
              required
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />

            <InputField
              id="lastName"
              name="lastName"
              type="text"
              label="Last Name"
              icon={<UserIcon className="h-5 w-5" />}
              required
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </div>

          <InputField
            id="businessName"
            name="businessName"
            type="text"
            label="Business Name"
            icon={<BuildingOfficeIcon className="h-5 w-5" />}
            required
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Enter your business name"
          />

          <InputField
            id="email"
            name="email"
            type="email"
            label="Email address"
            icon={<EnvelopeIcon className="h-5 w-5" />}
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={emailError}
          />

          <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            icon={<LockClosedIcon className="h-5 w-5" />}
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
          />

          <CheckboxRadio
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            error={termsError}
            label={
              <>
                I agree to the{' '}
                <a href="#" className="text-primary hover:text-primary/80">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:text-primary/80">
                  Privacy Policy
                </a>
              </>
            }
          />

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full flex justify-center items-center"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              Create Account
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary/80">
              Sign in
            </Link>
          </p>
        </div>
      </AnimatedForm>
    </AuthLayout>
  );
};

export default SignUp;