import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Clock, User, Mail, MessageSquare, ArrowLeft, Loader2, Send } from 'lucide-react';
import { format } from 'date-fns';


interface TimeSlot {
  time: string;
  available: boolean;
}

export default function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [step, setStep] = useState<'service' | 'date' | 'time' | 'details' | 'confirmation'>('service');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Mock services for immediate display (no API delay)
  const mockServices = [
    {
      id: 'consultation',
      name: 'Initial Consultation',
      description: 'Comprehensive first-time consultation and assessment',
      duration: 60,
      price: 150
    },
    {
      id: 'follow-up',
      name: 'Follow-up Session',
      description: 'Regular check-in and progress review',
      duration: 30,
      price: 75
    },
    {
      id: 'emergency',
      name: 'Emergency Appointment',
      description: 'Urgent care and immediate attention',
      duration: 45,
      price: 200
    }
  ];
  
  // Mock time slots for immediate display
  const mockTimeSlots = [
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
  
  // Use mock data for now (no API calls)
  const displayServices = mockServices;
  const availableSlots = mockTimeSlots;
  const servicesLoading = false;
  const slotsLoading = false;

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep('date');
  };

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



  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !selectedService) {
      alert('Please select a date, time, and service.');
      return;
    }

    setIsSendingEmail(true);

    try {
      // Step 1: Analyze the message with AI
      const analysisResponse = await fetch('https://smart-booking-backend-production.up.railway.app/api/analyze-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: formData.message || 'General consultation appointment',
          userEmail: formData.email
        })
      });

      const analysis = analysisResponse.ok ? await analysisResponse.json() : null;

      // Step 2: Generate email content with AI
      const emailResponse = await fetch('https://smart-booking-backend-production.up.railway.app/api/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          date: selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : '',
          time: selectedTime,
          message: formData.message,
          analysis: analysis
        })
      });

      const emailData = emailResponse.ok ? await emailResponse.json() : null;

      // Step 3: Create booking and send email
      const bookingResponse = await fetch('https://smart-booking-backend-production.up.railway.app/api/create-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          appointmentDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
          appointmentTime: selectedTime,
          message: formData.message,
          aiAnalysis: analysis,
          emailContent: emailData?.emailContent || 'Appointment confirmed!'
        })
      });

      if (bookingResponse.ok) {
        const bookingResult = await bookingResponse.json();
        alert(`Booking confirmed! Booking ID: #${bookingResult.bookingId}\nConfirmation email sent to ${formData.email}`);
        setStep('confirmation');
      } else {
        const errorData = await bookingResponse.json();
        console.error('Booking error details:', errorData);
        alert(`Booking failed: ${errorData.error || 'Unknown error'}\n\nCheck browser console for details.`);
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleBackToStart = () => {
    setStep('service');
    setSelectedService('');
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
            <div className="flex gap-3">
              <Button onClick={handleBackToStart} variant="outline" className="flex-1">
                Book Another
              </Button>
              <Button onClick={handleBackToStart} variant="gradient" className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Send Email Again
              </Button>
            </div>
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
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Schedule Your Appointment</h1>
          <p className="text-muted-foreground text-xl">
            Choose a convenient time for your consultation
          </p>
        </div>

        {/* Service Selection */}
        {step === 'service' && (
          <div className="glass-card rounded-3xl border border-primary/20 glow-effect animate-fade-in mb-8">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <MessageSquare className="w-6 h-6 text-primary" />
                Choose Your Service
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                Select the service you'd like to book
              </p>
            </CardHeader>
            <CardContent>
              {servicesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Loading services...</span>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {displayServices.map((service) => (
                    <Button
                      key={service.id}
                      variant="glass"
                      onClick={() => handleServiceSelect(service.id)}
                      className="p-8 h-auto flex flex-col items-start gap-4 text-left hover:scale-105 transition-all duration-200"
                    >
                      <div className="w-full">
                        <h3 className="font-semibold text-xl text-foreground mb-2">{service.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-primary font-bold text-lg">${service.price}</span>
                          <span className="text-muted-foreground text-sm">{service.duration} min</span>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </div>
        )}

        {/* Calendar and Time Selection - Made Much Bigger */}
        {step !== 'service' && (
          <div className="grid xl:grid-cols-2 gap-16">
            {/* Calendar Section - Much Bigger */}
            <div className="glass-card rounded-3xl border border-primary/20 glow-effect animate-fade-in">
              <CardHeader className="pb-10">
                <CardTitle className="flex items-center gap-3 text-3xl">
                  <CalendarIcon className="w-10 h-10 text-primary" />
                  Select Date
                </CardTitle>
                <p className="text-muted-foreground text-xl">
                  Choose your preferred appointment date
                </p>
              </CardHeader>
              <CardContent className="p-16 flex justify-center">
                <div className="scale-175 transform">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    className="w-full"
                  />
                </div>
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
                    {slotsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <span className="ml-2 text-muted-foreground">Loading time slots...</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-4">
                        {availableSlots.map((slot) => (
                          <Button
                            key={slot.time}
                            variant={slot.available ? "glass" : "ghost"}
                            disabled={!slot.available}
                            onClick={() => slot.available && handleTimeSelect(slot.time)}
                            className="text-lg py-6 font-medium hover:scale-105 transition-all duration-200"
                          >
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                    )}
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
                      <div className="flex gap-4 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep('time')}
                          className="flex-1"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back
                        </Button>
                        <Button 
                          type="submit" 
                          variant="gradient" 
                          className="flex-1"
                          disabled={isSendingEmail}
                        >
                          {isSendingEmail ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sending Email...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Confirm & Send Email
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}