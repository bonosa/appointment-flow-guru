import { Button } from '@/components/ui/button';
import { CalendarIcon, Menu } from 'lucide-react';

interface NavigationProps {
  onBookNow: () => void;
}

export default function Navigation({ onBookNow }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center glow-effect">
              <CalendarIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold gradient-text">ScheduleFlow</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105">
              Pricing
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105">
              About
            </a>
            <Button variant="gradient" onClick={onBookNow} className="font-semibold">
              Book Now
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}