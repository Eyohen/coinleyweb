import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import { 
  ShieldExclamationIcon, 
  LockClosedIcon, 
  DevicePhoneMobileIcon, 
  GlobeAltIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import InputField from '../../components/form/InputField';

const Security: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const businessType = location.state?.businessType || 'personal';
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
    
    // Navigate to the next step
    navigate('/onboarding/review', { state: { businessType } });
  };

  return (
    <OnboardingLayout currentStep={businessType === 'personal' ? 3 : 4}>
      <style>{animationStyles}</style>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden animate-fade-in-up opacity-0">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <ShieldExclamationIcon className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security Settings</h2>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Configure security settings to protect your account and transactions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md animate-fade-in-up animation-delay-200 opacity-0">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Setup Instructions</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                You'll need to scan a QR code with your authenticator app. This will be available after completing onboarding.
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
            <div className="mt-6 animate-fade-in-up animation-delay-200 opacity-0">
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

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-250 opacity-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Transaction Security</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Configure additional security measures for your transactions.
            </p>
          </div>

          <div className="space-y-4 animate-fade-in-up animation-delay-300 opacity-0">
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

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-350 opacity-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notifications</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Configure security notifications for your account.
            </p>
          </div>

          <div className="space-y-4 animate-fade-in-up animation-delay-400 opacity-0">
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

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-450 opacity-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Account Password</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Set a strong password for your account. Leave blank to keep your current password.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 animate-fade-in-up animation-delay-500 opacity-0">
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

          <div className="flex justify-between pt-5 animate-fade-in-up animation-delay-500 opacity-0">
            <button
              type="button"
              onClick={() => navigate('/onboarding/api-integration', { state: { businessType } })}
              className="btn btn-outline"
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Continue to Review
            </button>
          </div>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default Security; 