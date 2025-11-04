import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-[#202534] p-6 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};