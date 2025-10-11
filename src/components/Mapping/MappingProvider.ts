import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';

export interface Grave {
  longitude: number;
  latitude: number;
  property_id: number;
  split: string;
  property_type: string;
  cemetery: string;
  section: string;
  block: string;
  row: string;
  lot: string;
  grave: string;
}

export interface ExtendedGraveData {
  created_date: string;
  update_date: string;
  viewing_date: string;
  viewing_time: string;
  interment_time: string;
  property_id: number;
  age: number;
}

interface SCMappingContextType {
  graves: Grave[];
  extendedData: Record<number, ExtendedGraveData>;
  sections: string[];
  blocks: string[];
  rows: string[];
  lots: string[];
  graveCoordinates: Record<number, [number, number]>;
  isLoading: boolean;
  isError: boolean;
  selectedGrave: number | null;
  setSelectedGrave: (id: number | null) => void;
  refreshData: () => Promise<void>;
  updateGraveCoordinates: (propertyId: number, lat: number, lng: number) => Promise<void>;
}

const defaultContext: SCMappingContextType = {
  graves: [],
  extendedData: {},
  sections: [],
  blocks: [],
  rows: [],
  lots: [],
  graveCoordinates: {},
  isLoading: false,
  isError: false,
  selectedGrave: null,
  setSelectedGrave: () => {},
  refreshData: async () => {},
  updateGraveCoordinates: async () => {}
};

export const SCMappingContext = createContext<SCMappingContextType>(defaultContext);

export const useSCMapping = () => {
  const context = useContext(SCMappingContext);
  if (context === undefined) {
    throw new Error('useSCMapping must be used within a SCMappingProvider');
  }
  return context;
};
