import React, { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../../context/ThemeContext';

interface Step {
  id: number;
  name: string;
  href: string;
  status: 'complete' | 'current' | 'upcoming';
}

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children, currentStep }) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const businessType = location.state?.businessType || 'personal';
  
  // Define steps based on account type
  const steps: Step[] = businessType === 'personal' 
    ? [
        { 
          id: 1, 
          name: 'API & Integration', 
          href: '/onboarding/api-integration', 
          status: currentStep > 1 ? 'complete' : currentStep === 1 ? 'current' : 'upcoming' 
        },
        { 
          id: 2, 
          name: 'Review & Submit', 
          href: '/onboarding/review', 
          status: currentStep === 2 ? 'current' : 'upcoming' 
        },
      ]
    : [
        { 
          id: 1, 
          name: 'Business Information', 
          href: '/onboarding/business-info', 
          status: currentStep > 1 ? 'complete' : currentStep === 1 ? 'current' : 'upcoming' 
        },
        { 
          id: 2, 
          name: 'API & Integration', 
          href: '/onboarding/api-integration', 
          status: currentStep > 2 ? 'complete' : currentStep === 2 ? 'current' : 'upcoming' 
        },
        { 
          id: 3, 
          name: 'Review & Submit', 
          href: '/onboarding/review', 
          status: currentStep === 3 ? 'current' : 'upcoming' 
        },
      ];

  const handleStepClick = (step: Step) => {
    // Only allow navigation to completed steps or the current step
    if (step.status === 'complete' || step.status === 'current') {
      // Preserve all existing state data when navigating
      const currentState = location.state || {};
      navigate(step.href, { state: currentState });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <img 
              src={isDarkMode 
                ? "https://nativebrands.co/coinley-logo-light.svg" 
                : "https://nativebrands.co/coinley-logo-dark.svg"} 
              alt="Coinley Logo" 
              className="h-8"
            />
          </div>
          <Link to="/dashboard" className="text-sm text-primary hover:text-primary/80">
            Skip for now
          </Link>
        </div>
      </header>

      {/* Progress Steps - Desktop */}
      <div className="hidden md:block bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav aria-label="Progress">
            <ol className="flex items-center">
              {steps.map((step, stepIdx) => {
                const isClickable = step.status === 'complete' || step.status === 'current';
                return (
                  <li key={step.name} className="relative flex-1">
                    <div 
                      className={`flex flex-col items-center ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                      onClick={() => handleStepClick(step)}
                    >
                      {/* Connector line */}
                      {stepIdx !== 0 && (
                        <div 
                          className={`absolute top-5 left-0 w-1/2 h-1 -ml-px ${
                            steps[stepIdx - 1].status === 'complete' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                          }`} 
                          aria-hidden="true" 
                        />
                      )}
                      {stepIdx !== steps.length - 1 && (
                        <div 
                          className={`absolute top-5 right-0 w-1/2 h-1 -mr-px ${
                            step.status === 'complete' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                          }`} 
                          aria-hidden="true" 
                        />
                      )}
                      
                      {/* Step indicator */}
                      {step.status === 'complete' ? (
                        <div className="relative z-10">
                          <span className="w-10 h-10 flex items-center justify-center bg-primary rounded-full transition-all duration-200 ease-in-out group-hover:bg-primary/90">
                            <CheckIcon className="w-6 h-6 text-white" aria-hidden="true" />
                          </span>
                        </div>
                      ) : step.status === 'current' ? (
                        <div className="relative z-10">
                          <span className="w-10 h-10 flex items-center justify-center border-2 border-primary rounded-full bg-white dark:bg-gray-800 transition-all duration-200 ease-in-out">
                            <span className="text-sm font-semibold text-primary">{step.id}</span>
                          </span>
                        </div>
                      ) : (
                        <div className="relative z-10">
                          <span className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 transition-all duration-200 ease-in-out">
                            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">{step.id}</span>
                          </span>
                        </div>
                      )}
                      
                      {/* Step name */}
                      <span 
                        className={`mt-2 text-sm font-medium ${
                          step.status === 'complete' ? 'text-gray-900 dark:text-white' : 
                          step.status === 'current' ? 'text-primary' : 
                          'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {step.name}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>

      {/* Progress Steps - Mobile */}
      <div className="md:hidden bg-white dark:bg-gray-800 shadow">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Step {currentStep} of {steps.length}
            </p>
            <p className="text-sm font-medium text-primary">
              {steps[currentStep - 1].name}
            </p>
          </div>
          
          <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <div 
                key={step.id}
                onClick={() => handleStepClick(step)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium transition-all duration-200 ease-in-out ${
                  step.status === 'complete' ? 'bg-primary text-white cursor-pointer' :
                  step.status === 'current' ? 'border-2 border-primary bg-white dark:bg-gray-800 text-primary cursor-pointer' :
                  'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {step.status === 'complete' ? <CheckIcon className="w-4 h-4" /> : step.id}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Coinley. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/contact" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Contact
              </Link>
              <Link to="/privacy-policy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                About
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingLayout; 