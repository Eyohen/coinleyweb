export const validateEmail = (email: string): { isValid: boolean; message: string } => {
  // Basic email format check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }

  if (email.length > 254) {
    return { isValid: false, message: 'Email is too long' };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  // Check for consecutive dots
  if (email.includes('..')) {
    return { isValid: false, message: 'Email cannot contain consecutive dots' };
  }

  // Check for valid characters
  const invalidChars = /[<>()[\]\\,;:{}|"]/;
  if (invalidChars.test(email)) {
    return { isValid: false, message: 'Email contains invalid characters' };
  }

  return { isValid: true, message: '' };
}; 