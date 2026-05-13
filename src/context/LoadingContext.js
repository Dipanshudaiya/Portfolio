'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true); // Start as true for initial mount
  const pathname = usePathname();

  // Handle route changes
  useEffect(() => {
    // When pathname changes, we ensure loading is handled by the PageLoader's internal logic
    // which listens to pathname changes to finish.
    // But we set it to false here to sync the context state if needed.
    setIsLoading(false);
  }, [pathname]);

  const startLoading = () => setIsLoading(true);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
