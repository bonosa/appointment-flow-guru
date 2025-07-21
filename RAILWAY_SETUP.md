# 🚀 Railway Backend Integration Setup

This guide will help you connect your React frontend to your Railway backend.

## 📋 Prerequisites

- Your Railway backend is deployed and running
- You have the Railway backend URL
- Node.js and npm installed

## 🔧 Step 1: Get Your Railway Backend URL

1. Go to your Railway dashboard
2. Select your backend project
3. Copy the deployment URL (e.g., `https://your-app-name.railway.app`)

## 🔧 Step 2: Set Environment Variables

Create a `.env` file in your project root:

```bash
# API Configuration
VITE_API_URL=https://your-railway-app.railway.app

# Optional: API Timeout (in milliseconds)
VITE_API_TIMEOUT=10000

# Optional: Enable API logging in development
VITE_API_LOGGING=true
```

**Replace `https://your-railway-app.railway.app` with your actual Railway URL.**

## 🔧 Step 3: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:8080/api-test`

3. Click "Test Backend Connection" to verify the connection

## 🔧 Step 4: Verify Backend Endpoints

Your Railway backend should have these endpoints:

### Health Check
- `GET /health` - Returns 200 OK if backend is running

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile

### Appointments
- `GET /appointments` - Get user appointments
- `POST /appointments` - Create appointment
- `GET /appointments/:id` - Get specific appointment
- `PUT /appointments/:id` - Update appointment
- `PATCH /appointments/:id/cancel` - Cancel appointment
- `GET /appointments/available-slots` - Get available time slots

### Services
- `GET /services` - Get all services
- `GET /services/:id` - Get specific service

## 🔧 Step 5: Backend Response Format

Your backend should return responses in this format:

```json
{
  "success": true,
  "data": {
    // Your data here
  },
  "message": "Optional message"
}
```

## 🔧 Step 6: CORS Configuration

Make sure your Railway backend has CORS configured to allow requests from your frontend domain:

```javascript
// In your backend
app.use(cors({
  origin: ['http://localhost:8080', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

## 🔧 Step 7: Authentication Setup

If your backend uses JWT authentication:

1. The frontend will automatically send the token in the Authorization header
2. Store the token in localStorage when user logs in
3. The token will be included in all API requests

## 🧪 Testing the Integration

### Test Health Check
```bash
curl https://your-railway-app.railway.app/health
```

### Test Appointment Creation
```bash
curl -X POST https://your-railway-app.railway.app/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "serviceId": "service-123",
    "date": "2024-01-15",
    "time": "14:00",
    "notes": "Test appointment"
  }'
```

## 🚨 Troubleshooting

### Connection Failed
- Check if your Railway backend is running
- Verify the URL in your `.env` file
- Check CORS configuration
- Ensure the `/health` endpoint exists

### CORS Errors
- Add your frontend domain to CORS origins
- Check if credentials are properly configured

### 404 Errors
- Verify all required endpoints exist on your backend
- Check the API routes match the frontend expectations

### Authentication Issues
- Ensure JWT tokens are properly formatted
- Check if the Authorization header is being sent
- Verify token expiration handling

## 📱 Using the App

Once connected:

1. **Service Selection**: Choose from available services
2. **Date Selection**: Pick an available date
3. **Time Selection**: Select from available time slots
4. **Details**: Fill in your information
5. **Confirmation**: Review and confirm your booking

## 🔄 API Hooks Available

The frontend includes these React Query hooks:

- `useServices()` - Fetch available services
- `useAvailableSlots(date, serviceId)` - Get available time slots
- `useCreateAppointment()` - Create new appointment
- `useAppointments()` - Get user appointments
- `useLogin()` - User authentication
- `useRegister()` - User registration

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify your Railway backend logs
3. Test individual endpoints with curl or Postman
4. Ensure all environment variables are set correctly

---

**Happy coding! 🎉** 