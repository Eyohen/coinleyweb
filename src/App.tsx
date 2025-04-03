import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import OtpVerification from './pages/auth/OtpVerification';
import ResetPassword from './pages/auth/ResetPassword';
// Import onboarding pages
import BusinessInfo from './pages/onboarding/BusinessInfo';
import KycAml from './pages/onboarding/KycAml';
import Security from './pages/onboarding/Security';
import ApiIntegration from './pages/onboarding/ApiIntegration';
import Review from './pages/onboarding/Review';
// Import dashboard pages
import Dashboard from './pages/dashboard/Dashboard';
import Payments from './pages/dashboard/Payments';
import Transactions from './pages/dashboard/Transactions';
import Analytics from './pages/dashboard/Analytics';
import Settings from './pages/dashboard/Settings';
import Administrators from './pages/dashboard/Administrators';
import Profile from './pages/dashboard/Profile';
import Customers from './pages/dashboard/Customers';
import Notifications from './pages/dashboard/Notifications';
import VerifyEmail from './pages/auth/VerifyEmail';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Onboarding Routes */}
          <Route path="/onboarding/business-info" element={<BusinessInfo />} />
          <Route path="/onboarding/kyc-aml" element={<KycAml />} />
          <Route path="/onboarding/security" element={<Security />} />
          <Route path="/onboarding/api-integration" element={<ApiIntegration />} />
          <Route path="/onboarding/review" element={<Review />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/payments" element={<Payments />} />
          <Route path="/dashboard/transactions" element={<Transactions />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/customers" element={<Customers />} />
          <Route path="/dashboard/administrators" element={<Administrators />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          
          {/* Redirect to login by default */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
