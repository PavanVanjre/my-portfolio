import { useTheme } from '@/contexts/ThemeContext';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const borderColor = theme === 'light' 
    ? 'border-gray-300 border-t-blue-600' 
    : 'border-gray-600 border-t-blue-400';

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-solid rounded-full animate-spin ${borderColor}`}
      />
    </div>
  );
};

export default Spinner; 