import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  showProgress = false,
  currentStep = 1,
  totalSteps = 2
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-900">
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
        <div 
          className="w-full h-[calc(100vh-4rem)] rounded-3xl overflow-hidden relative"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-105"
            style={{
              backgroundImage: 'url("/public/coinley-auth-bg.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 p-12 text-white animate-fade-in-up">
            <h1 className="text-4xl font-bold mb-4 opacity-0 animate-fade-in-up [animation-delay:200ms]">Welcome to Coinley</h1>
            <p className="text-xl max-w-md opacity-0 animate-fade-in-up [animation-delay:400ms]">
              Crypto payments made simple.<br />Just connect and get paid.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth Form */}
      <div className="flex flex-col w-full md:w-1/2 bg-white dark:bg-gray-900 overflow-auto">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        
        <div className="flex flex-col min-h-screen">
          {/* Main content area with vertical centering */}
          <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-8 md:px-12">
            <div className="w-full max-w-md">
              {/* Logo above title */}
              <div className="flex justify-center mb-8">
                <img 
                  src={isDarkMode 
                    ? "https://nativebrands.co/coinley-logo-light.svg" 
                    : "https://nativebrands.co/coinley-logo-dark.svg"} 
                  alt="Coinley Logo" 
                  className="h-12"
                />
              </div>
              
              <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {title}
              </h2>
              
              {subtitle && (
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                  {subtitle}
                </p>
              )}
              
              {/* Progress Bar */}
              {showProgress && (
                <div className="w-full mb-6">
                  <div className="max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Step {currentStep} of {totalSteps}</span>
                      <span className="text-sm font-medium text-primary">{currentStep === 1 ? 'Sign Up' : 'Verify Email'}</span>
                    </div>
                    <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500 ease-in-out"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
                {children}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="w-full py-6 px-4 text-center">
            <div className="flex flex-wrap justify-center gap-4 mb-2 text-sm text-gray-600 dark:text-gray-400">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-use" className="hover:text-primary transition-colors">
                Terms of Use
              </Link>
              <Link to="/contact-us" className="hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mb-2 max-w-2xl mx-auto">
              Coinley never holds your funds. Payments go straight to your wallet—secure, simple, and in your control. We're not an exchange or custodian, so it's always good to understand the risks before using crypto.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              &copy; {currentYear} Coinley. All rights reserved.
            </p>
          </footer>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default AuthLayout; 