import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://smart-booking-backend-production.up.railway.app';

// Create axios instance with default configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login or clear token
      localStorage.removeItem('authToken');
    }
    
    return Promise.reject(error);
  }
);

// API Endpoints
export const API_ENDPOINTS = {
  // Appointment endpoints
  APPOINTMENTS: '/appointments',
  APPOINTMENT: (id: string) => `/appointments/${id}`,
  AVAILABLE_SLOTS: '/appointments/available-slots',
  
  // User endpoints
  USERS: '/users',
  USER: (id: string) => `/users/${id}`,
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: '/auth/profile',
  
  // Service endpoints
  SERVICES: '/services',
  SERVICE: (id: string) => `/services/${id}`,
  
  // Health check
  HEALTH: '/health',
} as const;

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentRequest {
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  appointmentId?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// API Service functions
export const appointmentService = {
  // Get all appointments for a user
  getAppointments: async (): Promise<Appointment[]> => {
    const response = await api.get<ApiResponse<Appointment[]>>(API_ENDPOINTS.APPOINTMENTS);
    return response.data.data;
  },

  // Get a specific appointment
  getAppointment: async (id: string): Promise<Appointment> => {
    const response = await api.get<ApiResponse<Appointment>>(API_ENDPOINTS.APPOINTMENT(id));
    return response.data.data;
  },

  // Create a new appointment
  createAppointment: async (data: CreateAppointmentRequest): Promise<Appointment> => {
    const response = await api.post<ApiResponse<Appointment>>(API_ENDPOINTS.APPOINTMENTS, data);
    return response.data.data;
  },

  // Update an appointment
  updateAppointment: async (id: string, data: Partial<CreateAppointmentRequest>): Promise<Appointment> => {
    const response = await api.put<ApiResponse<Appointment>>(API_ENDPOINTS.APPOINTMENT(id), data);
    return response.data.data;
  },

  // Cancel an appointment
  cancelAppointment: async (id: string): Promise<Appointment> => {
    const response = await api.patch<ApiResponse<Appointment>>(`${API_ENDPOINTS.APPOINTMENT(id)}/cancel`);
    return response.data.data;
  },

  // Get available time slots for a date
  getAvailableSlots: async (date: string, serviceId?: string): Promise<TimeSlot[]> => {
    const params = new URLSearchParams({ date });
    if (serviceId) params.append('serviceId', serviceId);
    
    const response = await api.get<ApiResponse<TimeSlot[]>>(`${API_ENDPOINTS.AVAILABLE_SLOTS}?${params}`);
    return response.data.data;
  },
};

export const serviceService = {
  // Get all services
  getServices: async (): Promise<Service[]> => {
    const response = await api.get<ApiResponse<Service[]>>(API_ENDPOINTS.SERVICES);
    return response.data.data;
  },

  // Get a specific service
  getService: async (id: string): Promise<Service> => {
    const response = await api.get<ApiResponse<Service>>(API_ENDPOINTS.SERVICE(id));
    return response.data.data;
  },
};

export const userService = {
  // Get user profile
  getProfile: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(API_ENDPOINTS.PROFILE);
    return response.data.data;
  },

  // Update user profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put<ApiResponse<User>>(API_ENDPOINTS.PROFILE, data);
    return response.data.data;
  },
};

export const authService = {
  // Login user
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    const response = await api.post<ApiResponse<{ token: string; user: User }>>(API_ENDPOINTS.LOGIN, {
      email,
      password,
    });
    return response.data.data;
  },

  // Register user
  register: async (name: string, email: string, password: string): Promise<{ token: string; user: User }> => {
    const response = await api.post<ApiResponse<{ token: string; user: User }>>(API_ENDPOINTS.REGISTER, {
      name,
      email,
      password,
    });
    return response.data.data;
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('authToken');
  },
};

// Health check function
export const healthCheck = async (): Promise<boolean> => {
  try {
    await api.get(API_ENDPOINTS.HEALTH);
    return true;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}; 