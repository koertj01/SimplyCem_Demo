import { createContext, useContext, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SCMappingContextType {
  // Add your mapping-related state and functions here
}

const defaultContext: SCMappingContextType = {
  // Initialize your default values here
};

export const SCMappingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const state = useMemo(() => { /* we need to add the rest of our stuff */}, [searchParams]);

    useEffect(() => { }, [searchParams]);

    const contextValue: SCMappingContextType = useMemo(() => state, [state]); 

    return (
        <SCMappingContext.Provider value={contextValue}>
            {children}
        </SCMappingContext.Provider>
    );
 }

export const SCMappingContext = createContext<SCMappingContextType>(defaultContext);

export const useSCMapping = () => {
  const context = useContext(SCMappingContext);
  if (context === undefined) {
    throw new Error('useSCMapping must be used within a SCMappingProvider');
  }
  return context;
};
