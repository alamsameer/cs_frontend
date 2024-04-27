let backendUrl;

// Check if the app is running in development mode
if (process.env.NODE_ENV === 'development') {
  // Use localhost URL for development
  backendUrl = 'http://localhost:4000';
} else {
  // Use production URL for other environments
  backendUrl = 'https://coldstorage-backend.vercel.app';
}

export const BACKEND_URL = backendUrl;