import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Clock, User, Mail, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface TimeSlot {
  time: string;
  available: boolean;
}

const timeSlots: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '09:30', available: true },
  { time: '10:00', available: false },
  { time: '10:30', available: true },
  { time: '11:00', available: true },
  { time: '11:30', available: false },
  { time: '12:00', available: true },
  { time: '12:30', available: true },
  { time: '13:00', available: false },
  { time: '13:30', available: true },
  { time: '14:00', available: true },
  { time: '14:30', available: true },
  { time: '15:00', available: true },
  { time: '15:30', available: false },
  { time: '16:00', available: true },
  { time: '16:30', available: true },
];

export default function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState<'date' | 'time' | 'details' | 'confirmation'>('date');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setStep('time');
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('details');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
  };

  const handleBackToStart = () => {
    setStep('date');
    setSelectedDate(new Date());
    setSelectedTime('');
    setFormData({ name: '', email: '', message: '' });
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
        {/* Background effects */}
        <div className="absolute inset-0 aurora-bg floating"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-primary rounded-full opacity-20 blur-xl floating"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent rounded-full opacity-30 blur-xl floating" style={{ animationDelay: '2s' }}></div>
        
        <div className="glass-card w-full max-w-md animate-scale-in glow-effect rounded-3xl border border-primary/20">
          <CardContent className="p-10 text-center">
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 glow-effect">
              <CalendarIcon className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-3 gradient-text">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Your appointment has been successfully scheduled.
            </p>
            <div className="space-y-4 text-left glass-card rounded-xl p-6 mb-8 border border-primary/20">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">
                  {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">{selectedTime}</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">{formData.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">{formData.email}</span>
              </div>
            </div>
            <Button onClick={handleBackToStart} variant="gradient" className="w-full py-4 text-lg font-semibold">
              Book Another Appointment
            </Button>
          </CardContent>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden p-4">
      {/* Background effects */}
      <div className="absolute inset-0 aurora-bg floating"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-primary rounded-full opacity-10 blur-xl floating"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent rounded-full opacity-20 blur-xl floating" style={{ animationDelay: '3s' }}></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Schedule Your Appointment</h1>
          <p className="text-muted-foreground text-xl">
            Choose a convenient time for your consultation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div className="glass-card rounded-3xl border border-primary/20 glow-effect animate-fade-in">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <CalendarIcon className="w-6 h-6 text-primary" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                className="w-full"
              />
            </CardContent>
          </div>

          {/* Time Selection or Form */}
          <div className="space-y-6">
            {step === 'time' && (
              <div className="glass-card rounded-3xl border border-primary/20 glow-effect animate-scale-in">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Clock className="w-6 h-6 text-primary" />
                    Available Times
                  </CardTitle>
                  <p className="text-muted-foreground text-lg">
                    {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={slot.available ? "glass" : "ghost"}
                        disabled={!slot.available}
                        onClick={() => slot.available && handleTimeSelect(slot.time)}
                        className="text-base py-3 font-medium hover:scale-105 transition-all duration-200"
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </div>
            )}

            {step === 'details' && (
              <div className="glass-card rounded-3xl border border-primary/20 glow-effect animate-scale-in">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <User className="w-6 h-6 text-primary" />
                    Your Details
                  </CardTitle>
                  <p className="text-muted-foreground text-lg">
                    {selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-semibold text-foreground">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="mt-2 glass-card border-primary/20 text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-base font-semibold text-foreground">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="mt-2 glass-card border-primary/20 text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-base font-semibold text-foreground">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what you'd like to discuss..."
                        rows={3}
                        className="mt-2 glass-card border-primary/20 text-foreground"
                      />
                    </div>
                    <div className="flex gap-4 pt-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setStep('time')}
                        className="flex-1 py-3 text-base"
                      >
                        Back
                      </Button>
                      <Button type="submit" variant="gradient" className="flex-1 py-3 text-base font-semibold">
                        Confirm Booking
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}