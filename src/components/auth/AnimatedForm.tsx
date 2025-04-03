import React, { ReactNode, useEffect, useState } from 'react';

interface AnimatedFormProps {
  children: ReactNode;
  delay?: number;
}

const AnimatedForm: React.FC<AnimatedFormProps> = ({ children, delay = 100 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedForm; 