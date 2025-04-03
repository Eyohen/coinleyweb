// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
// import AuthLayout from '../../components/auth/AuthLayout';
// import InputField from '../../components/form/InputField';
// import CheckboxRadio from '../../components/form/CheckboxRadio';
// import AnimatedForm from '../../components/auth/AnimatedForm';
// import { validateEmail } from '../../utils/validation';
// import axios, { AxiosError } from 'axios';
// import { URL } from '../../url';
// import { useAuth } from '../../context/AuthContext';

// // Define interfaces for our response types
// interface MerchantData {
//   id: string;
//   businessName: string;
//   email: string;
//   apiKey: string;
//   apiSecret: string;
//   status: string;
// }

// interface LoginResponse {
//   token: string;
//   merchant: MerchantData;
// }

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login, loading: authLoading } = useAuth();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [emailError, setEmailError] = useState<string | undefined>(undefined);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   // Check for verification status in URL params
//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const verified = queryParams.get('verified');
    
//     if (verified === 'true') {
//       setSuccessMessage('Email verification successful! You can now log in.');
//     }
//   }, [location.search]);

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newEmail = e.target.value;
//     setEmail(newEmail);
//     const validation = validateEmail(newEmail);
//     setEmailError(validation.isValid ? undefined : validation.message);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccessMessage(null);
    
//     // Validate email before submission
//     const emailValidation = validateEmail(email);
//     if (!emailValidation.isValid) {
//       setEmailError(emailValidation.message);
//       return;
//     }

//     if (!password) {
//       setError('Password is required');
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       // Make API call to the login endpoint
//       const response = await axios.post<LoginResponse>(`${URL}/api/merchants/login`, {
//         email,
//         password
//       });
      
//       // Handle successful login
//       const { token, merchant } = response.data;
      
//       // Store token and merchant data in localStorage or sessionStorage
//       if (rememberMe) {
//         localStorage.setItem('token', token);
//         localStorage.setItem('merchant', JSON.stringify(merchant));
//       } else {
//         sessionStorage.setItem('token', token);
//         sessionStorage.setItem('merchant', JSON.stringify(merchant));
//       }
      
//       // Redirect to Dashboard after successful login
//       navigate('/dashboard');
//     } catch (err) {
//       console.error('Login error:', err);
      
//       if (axios.isAxiosError(err)) {
//         const axiosError = err as AxiosError<{ msg?: string }>;
//         // Check if we have a specific error message from the API
//         if (axiosError.response?.data?.msg) {
//           setError(axiosError.response.data.msg);
//         } else if (axiosError.response?.status === 401) {
//           setError('Invalid email or password. Please try again.');
//         } else if (axiosError.response?.status === 403) {
//           setError('Your email is not verified. Please check your email for verification link.');
//         } else {
//           setError('An error occurred during login. Please try again later.');
//         }
//       } else {
//         setError('An unexpected error occurred. Please try again.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <AuthLayout 
//       title="Welcome back" 
//       subtitle="Sign in to your account to continue"
//     >
//       <AnimatedForm>
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
//             {error}
//           </div>
//         )}
        
//         {successMessage && (
//           <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm">
//             {successMessage}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <InputField
//             id="email"
//             name="email"
//             type="email"
//             label="Email address"
//             icon={<EnvelopeIcon className="h-5 w-5" />}
//             autoComplete="email"
//             required
//             value={email}
//             onChange={handleEmailChange}
//             placeholder="Enter your email"
//             error={emailError}
//           />

//           <div>
//             <div className="flex items-center justify-between mb-1">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Password
//               </label>
//               <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80">
//                 Forgot password?
//               </Link>
//             </div>
//             <InputField
//               id="password"
//               name="password"
//               type="password"
//               label=""
//               icon={<LockClosedIcon className="h-5 w-5" />}
//               autoComplete="current-password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <CheckboxRadio
//               id="remember-me"
//               name="remember-me"
//               type="checkbox"
//               checked={rememberMe}
//               onChange={(e) => setRememberMe(e.target.checked)}
//               label="Remember me"
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading || authLoading}
//               className="btn btn-primary w-full flex justify-center items-center"
//             >
//               {(isLoading || authLoading) ? (
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               ) : null}
//               Sign in
//             </button>
//           </div>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Don't have an account?{' '}
//             <Link to="/signup" className="font-medium text-primary hover:text-primary/80">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </AnimatedForm>
//     </AuthLayout>
//   );
// };

// export default Login;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import AuthLayout from '../../components/auth/AuthLayout';
import InputField from '../../components/form/InputField';
import CheckboxRadio from '../../components/form/CheckboxRadio';
import AnimatedForm from '../../components/auth/AnimatedForm';
import { validateEmail } from '../../utils/validation';
import axios, { AxiosError } from 'axios';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading: authLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Check for verification status in URL params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const verified = queryParams.get('verified');
    
    if (verified === 'true') {
      setSuccessMessage('Email verification successful! You can now log in.');
    }
  }, [location.search]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const validation = validateEmail(newEmail);
    setEmailError(validation.isValid ? undefined : validation.message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    
    // Validate email before submission
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.message);
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    setIsLoading(true);
    
    try {
      // Use the login function from AuthContext
      await login(email, password, rememberMe);
      
      // Redirect to Dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ msg?: string }>;
        // Check if we have a specific error message from the API
        if (axiosError.response?.data?.msg) {
          setError(axiosError.response.data.msg);
        } else if (axiosError.response?.status === 401) {
          setError('Invalid email or password. Please try again.');
        } else if (axiosError.response?.status === 403) {
          setError('Your email is not verified. Please check your email for verification link.');
        } else {
          setError('An error occurred during login. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to your account to continue"
    >
      <AnimatedForm>
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email address"
            icon={<EnvelopeIcon className="h-5 w-5" />}
            autoComplete="email"
            required
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            error={emailError}
          />

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80">
                Forgot password?
              </Link>
            </div>
            <InputField
              id="password"
              name="password"
              type="password"
              label=""
              icon={<LockClosedIcon className="h-5 w-5" />}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <CheckboxRadio
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              label="Remember me"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || authLoading}
              className="btn btn-primary w-full flex justify-center items-center"
            >
              {(isLoading || authLoading) ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-primary/80">
              Sign up
            </Link>
          </p>
        </div>
      </AnimatedForm>
    </AuthLayout>
  );
};

export default Login;