import React, { FC, useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
//   const [error, setError] = useState<Error | null>(null);
//   const [errorInfo, setErrorInfo] = useState<ErrorEvent | null>(null);

  useEffect(() => {

    setHasError(true);

    // Cleanup when component unmounts to avoid memory leaks
    return () => {};
  }, [])

  return hasError ? (
    <div>
      <h2>Something went wrong.</h2>
      {/* <p>Error: {error && error.toString()}</p> */}
      {/* Optionally provide more detailed error information for debugging */}
    </div>
  ) : (
    children
  );
};

export default ErrorBoundary;
