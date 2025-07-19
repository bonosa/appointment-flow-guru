import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, Users, Zap } from 'lucide-react';

interface HeroSectionProps {
  onBookNow: () => void;
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Scheduling
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Made Simple</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in max-w-2xl mx-auto">
            Book appointments effortlessly with our intuitive scheduling platform. 
            No more back-and-forth emails or missed opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              variant="hero" 
              onClick={onBookNow}
              className="shadow-glow hover:scale-105 transition-transform duration-300"
            >
              <CalendarIcon className="mr-2" />
              Book Now
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 animate-fade-in hover:shadow-elegant transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Availability</h3>
            <p className="text-muted-foreground">
              See available slots instantly and book without delays
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 animate-fade-in hover:shadow-elegant transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy for Everyone</h3>
            <p className="text-muted-foreground">
              Simple interface that works for both you and your clients
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 animate-fade-in hover:shadow-elegant transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Confirmation</h3>
            <p className="text-muted-foreground">
              Get immediate booking confirmations and reminders
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                10k+
              </div>
              <p className="text-muted-foreground">Appointments Scheduled</p>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                99%
              </div>
              <p className="text-muted-foreground">Customer Satisfaction</p>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <p className="text-muted-foreground">Available Booking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}