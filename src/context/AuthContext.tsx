import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { URL } from '../url';

// Define types for merchant data
export interface MerchantData {
  id: string;
  businessName: string;
  email: string;
  apiKey: string;
  apiSecret: string;
  status: string;
}

// Define the context state type
interface AuthContextType {
  isAuthenticated: boolean;
  merchant: MerchantData | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  updateMerchant: (updatedMerchant: Partial<MerchantData>) => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Create a provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [merchant, setMerchant] = useState<MerchantData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for existing auth on mount
  useEffect(() => {
    const initializeAuth = () => {
      // Try to get from localStorage first (for "remember me" option)
      let storedToken = localStorage.getItem('token');
      let storedMerchant = localStorage.getItem('merchant');
      
      // If not in localStorage, try sessionStorage
      if (!storedToken || !storedMerchant) {
        storedToken = sessionStorage.getItem('token');
        storedMerchant = sessionStorage.getItem('merchant');
      }
      
      if (storedToken && storedMerchant) {
        try {
          // Parse the merchant data
          const merchantData = JSON.parse(storedMerchant) as MerchantData;
          
          // Set the auth state
          setToken(storedToken);
          setMerchant(merchantData);
          setIsAuthenticated(true);
          
          // Configure axios global defaults
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        } catch (error) {
          // If there's an error parsing the merchant data, clear the storage
          console.error('Error initializing auth state:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('merchant');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('merchant');
        }
      }
      
      setLoading(false);
    };
    
    initializeAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string, rememberMe: boolean) => {
    setLoading(true);
    try {
      const response = await axios.post(`${URL}/api/merchants/login`, {
        email,
        password
      });
      
      const { token: newToken, merchant: merchantData } = response.data;
      
      // Store in state
      setToken(newToken);
      setMerchant(merchantData);
      setIsAuthenticated(true);
      
      // Store in storage based on remember me preference
      if (rememberMe) {
        localStorage.setItem('token', newToken);
        localStorage.setItem('merchant', JSON.stringify(merchantData));
      } else {
        sessionStorage.setItem('token', newToken);
        sessionStorage.setItem('merchant', JSON.stringify(merchantData));
      }
      
      // Set default axios auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Re-throw to let the component handle the error
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear state
    setToken(null);
    setMerchant(null);
    setIsAuthenticated(false);
    
    // Clear storage
    localStorage.removeItem('token');
    localStorage.removeItem('merchant');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('merchant');
    
    // Clear Authorization header
    delete axios.defaults.headers.common['Authorization'];
  };

  // Update merchant data
  const updateMerchant = (updatedMerchant: Partial<MerchantData>) => {
    if (merchant) {
      const newMerchantData = { ...merchant, ...updatedMerchant };
      setMerchant(newMerchantData);
      
      // Update storage
      if (localStorage.getItem('token')) {
        localStorage.setItem('merchant', JSON.stringify(newMerchantData));
      }
      if (sessionStorage.getItem('token')) {
        sessionStorage.setItem('merchant', JSON.stringify(newMerchantData));
      }
    }
  };

  // Create the context value
  const contextValue: AuthContextType = {
    isAuthenticated,
    merchant,
    token,
    loading,
    login,
    logout,
    updateMerchant
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};