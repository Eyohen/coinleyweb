// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { EnvelopeIcon } from '@heroicons/react/24/outline';
// import AuthLayout from '../../components/auth/AuthLayout';
// import AnimatedForm from '../../components/auth/AnimatedForm';
// import Toast from '../../components/common/Toast';
// import axios from 'axios';
// import {URL} from '../../url'

// const VerifyEmail: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email || 'your email';
//   const fromSignUp = location.state?.fromSignUp || false;
//   const businessType = location.state?.businessType || 'personal';
//   const [showToast, setShowToast] = useState(false);
//   const [isResending, setIsResending] = useState(false);

//   const handleResendEmail = async () => {
//     setIsResending(true);
//     // Simulate API call for resending verification email
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     console.log('Resending verification email to:', email);
//     setShowToast(true);
//     setIsResending(false);
//   };

//   return (
//     <AuthLayout 
//       title="Check your email" 
//       subtitle={`We've sent a verification link to ${email}`}
//       showProgress={true}
//       currentStep={2}
//       totalSteps={2}
//     >
//       <AnimatedForm>
//         <div className="text-center space-y-6">
//           <div className="flex justify-center">
//             <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
//               <EnvelopeIcon className="w-8 h-8 text-primary" />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//               Verify your email address
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Click the link in the email we sent to verify your account and continue with the registration process.
//             </p>
//           </div>

//           <div className="space-y-4">
//             <button
//               onClick={handleResendEmail}
//               disabled={isResending}
//               className="text-sm text-primary hover:text-primary/80 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isResending ? 'Sending...' : "Didn't receive the email? Click to resend"}
//             </button>

//             <div className="pt-4">
//               <button
//                 onClick={() => {
//                   if (fromSignUp) {
//                     if (businessType === 'personal') {
//                       navigate('/onboarding/api-integration', { state: { businessType } });
//                     } else {
//                       navigate('/onboarding/business-info', { state: { businessType } });
//                     }
//                   } else {
//                     navigate('/reset-password');
//                   }
//                 }}
//                 className="btn btn-primary w-full"
//               >
//                 Continue
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             <Link to="/login" className="font-medium text-primary hover:text-primary/80">
//               Back to Sign in
//             </Link>
//           </p>
//         </div>
//       </AnimatedForm>

//       {showToast && (
//         <Toast
//           message="Verification email has been resent"
//           type="success"
//           onClose={() => setShowToast(false)}
//         />
//       )}
//     </AuthLayout>
//   );
// };

// export default VerifyEmail; 



import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import AuthLayout from '../../components/auth/AuthLayout';
import AnimatedForm from '../../components/auth/AnimatedForm';
import Toast from '../../components/common/Toast';
import axios from 'axios';
import { URL } from '../../url';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const email = location.state?.email || '';
  const fromSignUp = location.state?.fromSignUp || false;
  const businessType = location.state?.businessType || 'personal';
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isResending, setIsResending] = useState(false);
  const [_isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  
  // Check if there's a token in the URL for verification
  const token = searchParams.get('token');

  // Handle automatic verification when token is present in URL
  useEffect(() => {
    const verifyEmailWithToken = async () => {
      if (!token) return;
      
      setIsVerifying(true);
      try {
        // Call the verification endpoint with the token
        const response = await axios.get(`${URL}/api/merchants/verify-email`, {
          params: { token }
        });
        
        if (response.data.success) {
          setVerificationStatus('success');
          setToastMessage('Email verified successfully! You can now log in.');
          setToastType('success');
          setShowToast(true);
          
          // Redirect to login after successful verification
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      } catch (error: any) {
        setVerificationStatus('error');
        setToastMessage(error.response?.data?.error || 'Verification failed. Please try again.');
        setToastType('error');
        setShowToast(true);
      } finally {
        setIsVerifying(false);
      }
    };
    
    verifyEmailWithToken();
  }, [token, navigate]);

  const handleResendEmail = async () => {
    if (!email) {
      setToastMessage('Email address is missing. Please go back to signup.');
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    setIsResending(true);
    try {
      // Call the API to resend verification email
      const response = await axios.post(`${URL}/api/merchants/resend-verification`, {
        email
      });
      
      if (response.data.success) {
        setToastMessage('Verification email has been resent.');
        setToastType('success');
      } else {
        setToastMessage('Failed to resend verification email.');
        setToastType('error');
      }
    } catch (error: any) {
      setToastMessage(error.response?.data?.error || 'Failed to resend verification email.');
      setToastType('error');
    } finally {
      setShowToast(true);
      setIsResending(false);
    }
  };

  // If token is present but no email in state, show appropriate UI
  if (token && !email && verificationStatus === 'pending') {
    return (
      <AuthLayout
        title="Verifying your email"
        subtitle="Please wait while we verify your email address"
        showProgress={false}
        currentStep={2}
        totalSteps={2}
      >
        <AnimatedForm>
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <EnvelopeIcon className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Verifying...
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We're verifying your email address. This may take a moment.
              </p>
            </div>
          </div>
        </AnimatedForm>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Check your email"
      subtitle={email ? `We've sent a verification link to ${email}` : "Please check your email"}
      showProgress={true}
      currentStep={2}
      totalSteps={2}
    >
      <AnimatedForm>
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
              <EnvelopeIcon className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Verify your email address
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click the link in the email we sent to verify your account and continue with the registration process.
            </p>
          </div>
          
          <div className="space-y-4">
            {email && (
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="text-sm text-primary hover:text-primary/80 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending ? 'Sending...' : "Didn't receive the email? Click to resend"}
              </button>
            )}
            
            <div className="pt-4">
              <button
                onClick={() => {
                  if (fromSignUp) {
                    if (businessType === 'personal') {
                      navigate('/onboarding/api-integration', { state: { businessType } });
                    } else {
                      navigate('/onboarding/business-info', { state: { businessType } });
                    }
                  } else {
                    navigate('/login');
                  }
                }}
                className="btn btn-primary w-full"
              >
                {fromSignUp ? 'Continue' : 'Back to Sign in'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <Link to="/login" className="font-medium text-primary hover:text-primary/80">
              Back to Sign in
            </Link>
          </p>
        </div>
      </AnimatedForm>
      
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </AuthLayout>
  );
};

export default VerifyEmail;