import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AppointmentBooking from '@/components/AppointmentBooking';

const Index = () => {
  const [showBooking, setShowBooking] = useState(false);

  const handleBookNow = () => {
    setShowBooking(true);
  };

  const handleBackToHome = () => {
    setShowBooking(false);
  };

  if (showBooking) {
    return <AppointmentBooking />;
  }

  return (
    <div className="min-h-screen">
      <Navigation onBookNow={handleBookNow} />
      <HeroSection onBookNow={handleBookNow} />
    </div>
  );
};

export default Index;
