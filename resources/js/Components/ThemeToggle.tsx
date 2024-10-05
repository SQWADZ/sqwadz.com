import React from 'react';
import { useTheme } from '@/Components/ThemeProvider';
import { Button } from '@/Components/ui/button';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} variant="secondary" size="icon">
      {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
};

export default ThemeToggle;
