import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  appointmentService, 
  serviceService, 
  userService, 
  authService,
  type CreateAppointmentRequest,
  type Appointment,
  type Service,
  type User,
  type TimeSlot
} from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// Query Keys
export const queryKeys = {
  appointments: ['appointments'] as const,
  appointment: (id: string) => ['appointment', id] as const,
  services: ['services'] as const,
  service: (id: string) => ['service', id] as const,
  user: ['user'] as const,
  availableSlots: (date: string, serviceId?: string) => ['availableSlots', date, serviceId] as const,
} as const;

// Appointment Hooks
export const useAppointments = () => {
  return useQuery({
    queryKey: queryKeys.appointments,
    queryFn: appointmentService.getAppointments,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAppointment = (id: string) => {
  return useQuery({
    queryKey: queryKeys.appointment(id),
    queryFn: () => appointmentService.getAppointment(id),
    enabled: !!id,
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateAppointmentRequest) => appointmentService.createAppointment(data),
    onSuccess: (newAppointment) => {
      // Invalidate and refetch appointments
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments });
      
      // Add the new appointment to the cache
      queryClient.setQueryData(queryKeys.appointments, (old: Appointment[] = []) => [
        ...old,
        newAppointment,
      ]);

      toast({
        title: 'Appointment Created!',
        description: 'Your appointment has been successfully scheduled.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create appointment',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateAppointmentRequest> }) =>
      appointmentService.updateAppointment(id, data),
    onSuccess: (updatedAppointment) => {
      // Update the specific appointment in cache
      queryClient.setQueryData(
        queryKeys.appointment(updatedAppointment.id),
        updatedAppointment
      );
      
      // Invalidate appointments list
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments });

      toast({
        title: 'Appointment Updated!',
        description: 'Your appointment has been successfully updated.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update appointment',
        variant: 'destructive',
      });
    },
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => appointmentService.cancelAppointment(id),
    onSuccess: (cancelledAppointment) => {
      // Update the specific appointment in cache
      queryClient.setQueryData(
        queryKeys.appointment(cancelledAppointment.id),
        cancelledAppointment
      );
      
      // Invalidate appointments list
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments });

      toast({
        title: 'Appointment Cancelled',
        description: 'Your appointment has been successfully cancelled.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to cancel appointment',
        variant: 'destructive',
      });
    },
  });
};

export const useAvailableSlots = (date: string, serviceId?: string) => {
  return useQuery({
    queryKey: queryKeys.availableSlots(date, serviceId),
    queryFn: () => appointmentService.getAvailableSlots(date, serviceId),
    enabled: !!date,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Service Hooks
export const useServices = () => {
  return useQuery({
    queryKey: queryKeys.services,
    queryFn: serviceService.getServices,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useService = (id: string) => {
  return useQuery({
    queryKey: queryKeys.service(id),
    queryFn: () => serviceService.getService(id),
    enabled: !!id,
  });
};

// User Hooks
export const useUser = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: userService.getProfile,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: Partial<User>) => userService.updateProfile(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.user, updatedUser);
      
      toast({
        title: 'Profile Updated!',
        description: 'Your profile has been successfully updated.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update profile',
        variant: 'destructive',
      });
    },
  });
};

// Auth Hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: ({ token, user }) => {
      // Store token
      localStorage.setItem('authToken', token);
      
      // Set user data in cache
      queryClient.setQueryData(queryKeys.user, user);
      
      toast({
        title: 'Welcome back!',
        description: 'You have been successfully logged in.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Login Failed',
        description: error.response?.data?.message || 'Invalid email or password',
        variant: 'destructive',
      });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      authService.register(name, email, password),
    onSuccess: ({ token, user }) => {
      // Store token
      localStorage.setItem('authToken', token);
      
      // Set user data in cache
      queryClient.setQueryData(queryKeys.user, user);
      
      toast({
        title: 'Account Created!',
        description: 'Your account has been successfully created.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Registration Failed',
        description: error.response?.data?.message || 'Failed to create account',
        variant: 'destructive',
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => {
      authService.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
    },
  });
}; 