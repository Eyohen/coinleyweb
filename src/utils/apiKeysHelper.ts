// src/utils/apiKeysHelper.ts

// Define types for the dashboard response
interface Merchant {
  apiKey?: string;
  apiSecret?: string;
  [key: string]: any; // For other merchant properties
}

interface DashboardData {
  merchant?: Merchant;
  [key: string]: any; // For other dashboard data properties
}

interface AuthHeaders {
  Authorization?: string;
  'x-api-key'?: string;
  'x-API-Secret'?: string;
  [key: string]: string | undefined;
}

/**
 * Helper function to get API keys from localStorage
 * This should be used when the dashboard loads to store keys for future requests
 */
export const storeApiKeysFromDashboard = (dashboardData: DashboardData): void => {
  if (dashboardData && dashboardData.merchant) {
    const { apiKey, apiSecret } = dashboardData.merchant;
    
    if (apiKey) {
      localStorage.setItem('apiKey', apiKey);
    }
    
    if (apiSecret) {
      localStorage.setItem('apiSecret', apiSecret);
    }
  }
};

/**
 * Helper function to get authentication headers
 */
export const getAuthHeaders = (): AuthHeaders => {
  const token = localStorage.getItem('token');
  const apiKey = localStorage.getItem('apiKey');
  const apiSecret = localStorage.getItem('apiSecret');
  
  const headers: AuthHeaders = {};
  
  if (token) {
    headers['Authorization'] = token;
  }
  
  if (apiKey) {
    headers['x-api-key'] = apiKey;
  }
  
  if (apiSecret) {
    headers['x-API-Secret'] = apiSecret;
  }
  
  return headers;
};