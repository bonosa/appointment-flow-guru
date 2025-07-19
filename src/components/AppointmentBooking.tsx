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
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="w-full max-w-md animate-scale-in">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-6">
              Your appointment has been successfully scheduled.
            </p>
            <div className="space-y-3 text-left bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-primary" />
                <span className="font-medium">
                  {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="font-medium">{formData.email}</span>
              </div>
            </div>
            <Button onClick={handleBackToStart} variant="gradient" className="w-full">
              Book Another Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Schedule Your Appointment</h1>
          <p className="text-muted-foreground text-lg">
            Choose a convenient time for your consultation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
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
          </Card>

          {/* Time Selection or Form */}
          <div className="space-y-6">
            {step === 'time' && (
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Available Times
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={slot.available ? "outline" : "ghost"}
                        disabled={!slot.available}
                        onClick={() => slot.available && handleTimeSelect(slot.time)}
                        className="text-sm"
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 'details' && (
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Your Details
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what you'd like to discuss..."
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setStep('time')}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button type="submit" variant="gradient" className="flex-1">
                        Confirm Booking
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}