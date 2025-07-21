import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, Users, Zap, Star, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onBookNow: () => void;
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 aurora-bg floating"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-primary rounded-full opacity-20 blur-xl floating"></div>
      <div className="absolute top-60 right-32 w-24 h-24 bg-gradient-primary rounded-full opacity-30 blur-xl floating" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-accent rounded-full opacity-25 blur-lg floating" style={{ animationDelay: '4s' }}></div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Floating sparkles */}
          <div className="absolute -top-10 left-1/4 animate-pulse">
            <Sparkles className="w-6 h-6 text-primary opacity-60" />
          </div>
          <div className="absolute top-5 right-1/4 animate-pulse" style={{ animationDelay: '1s' }}>
            <Star className="w-4 h-4 text-accent opacity-70" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in leading-tight">
            Scheduling
            <span className="gradient-text block"> Reimagined</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in max-w-2xl mx-auto leading-relaxed">
            Experience the future of appointment booking with our 
            <span className="text-primary font-semibold"> AI-powered platform</span>. 
            Effortless, intuitive, and beautifully designed.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
            <Button 
              variant="hero" 
              onClick={onBookNow}
              className="group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CalendarIcon className="mr-2 z-10 relative" />
              <span className="z-10 relative">Book Now</span>
            </Button>
            <Button variant="glass" size="lg" className="text-lg px-8 py-4 font-semibold">
              <Sparkles className="mr-2" />
              Explore Features
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-8 rounded-2xl glass-card glow-effect group hover:scale-105 transition-all duration-500">
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-neon transition-all duration-300">
              <Clock className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Real-time Availability</h3>
            <p className="text-muted-foreground leading-relaxed">
              See available slots instantly and book without delays
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl glass-card glow-effect group hover:scale-105 transition-all duration-500" style={{ animationDelay: '0.2s' }}>
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-neon transition-all duration-300">
              <Users className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Easy for Everyone</h3>
            <p className="text-muted-foreground leading-relaxed">
              Simple interface that works for both you and your clients
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl glass-card glow-effect group hover:scale-105 transition-all duration-500" style={{ animationDelay: '0.4s' }}>
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-neon transition-all duration-300">
              <Zap className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Instant Confirmation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Get immediate booking confirmations and reminders
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32 text-center">
          <div className="glass-card p-12 rounded-3xl mx-auto max-w-5xl glow-effect">
            <h2 className="text-3xl font-bold mb-8 gradient-text">Trusted by Thousands</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group hover:scale-110 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-black gradient-text mb-3 group-hover:shadow-neon transition-all duration-300">
                  10k+
                </div>
                <p className="text-muted-foreground text-lg">Appointments Scheduled</p>
              </div>
              <div className="group hover:scale-110 transition-all duration-300" style={{ animationDelay: '0.2s' }}>
                <div className="text-5xl md:text-6xl font-black gradient-text mb-3 group-hover:shadow-neon transition-all duration-300">
                  99%
                </div>
                <p className="text-muted-foreground text-lg">Customer Satisfaction</p>
              </div>
              <div className="group hover:scale-110 transition-all duration-300" style={{ animationDelay: '0.4s' }}>
                <div className="text-5xl md:text-6xl font-black gradient-text mb-3 group-hover:shadow-neon transition-all duration-300">
                  24/7
                </div>
                <p className="text-muted-foreground text-lg">Available Booking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}