import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import AuthLayout from '../../components/auth/AuthLayout';
import AnimatedForm from '../../components/auth/AnimatedForm';
import Toast from '../../components/common/Toast';

const OtpVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';
  const fromSignUp = location.state?.fromSignUp || false;
  const businessType = location.state?.businessType || 'personal';
  const [showToast, setShowToast] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    setIsResending(true);
    // Simulate API call for resending verification email
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Resending verification email to:', email);
    setShowToast(true);
    setIsResending(false);
  };

  return (
    <AuthLayout 
      title="Check your email" 
      subtitle={`We've sent a verification link to ${email}`}
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
            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className="text-sm text-primary hover:text-primary/80 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? 'Sending...' : "Didn't receive the email? Click to resend"}
            </button>

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
                    navigate('/reset-password');
                  }
                }}
                className="btn btn-primary w-full"
              >
                Continue
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
          message="Verification email has been resent"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </AuthLayout>
  );
};

export default OtpVerification; 