import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={`w-10 h-10 p-2 ${className}`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
}
