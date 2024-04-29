let backendUrl;

// Check if the app is running in development mode
if (process.env.NODE_ENV === 'development') {
  // Use localhost URL for development
  backendUrl = 'http://localhost:4000/api';
} else {
  // Use production URL for other environments
  backendUrl = 'https://coldstorage-backend.vercel.app/api';
}

export const BACKEND_URL = backendUrl;