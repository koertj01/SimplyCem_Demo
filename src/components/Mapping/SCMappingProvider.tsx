import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { SCMappingContext, Grave, ExtendedGraveData } from './MappingProvider';

export const SCMappingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const [searchParams, setSearchParams] = useSearchParams();
    const [graves, setGraves] = useState<Grave[]>([]);
    const [extendedData, setExtendedData] = useState<Record<number, ExtendedGraveData>>({});
    const [sections, setSections] = useState<string[]>([]);
    const [blocks, setBlocks] = useState<string[]>([]);
    const [rows, setRows] = useState<string[]>([]);
    const [lots, setLots] = useState<string[]>([]);
    const [graveCoordinates, setGraveCoordinates] = useState<Record<number, [number, number]>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedGrave, setSelectedGrave] = useState<number | null>(null);

    const refreshData = async () => {
        setIsLoading(true);
        setIsError(false);
        
        try {
            // Fetch basic grave data
            const { data: graveData, error: graveError } = await supabase
                .from('grave_entries')
                .select('*');

            if (graveError) throw graveError;

            if (graveData) {
                setGraves(graveData as Grave[]);
                setSections([...new Set(graveData.map(item => item.section))]);
                setBlocks([...new Set(graveData.map(item => item.block))]);
                setRows([...new Set(graveData.map(item => item.row))]);
                setLots([...new Set(graveData.map(item => item.lot))]);
                
                setGraveCoordinates(
                    graveData.reduce((acc, item) => {
                        if (item.latitude && item.longitude) {
                            acc[item.property_id] = [item.latitude, item.longitude];
                        }
                        return acc;
                    }, {} as Record<number, [number, number]>)
                );
            }

            // Fetch extended grave data
            const { data: extendedGraveData, error: extendedError } = await supabase
                .from('extended_grave_data')
                .select('*');

            if (extendedError) throw extendedError;

            if (extendedGraveData) {
                const extendedDataMap = extendedGraveData.reduce((acc, item) => {
                    acc[item.property_id] = item;
                    return acc;
                }, {} as Record<number, ExtendedGraveData>);
                setExtendedData(extendedDataMap);
            }
        } catch (error) {
            console.error('Error fetching grave data:', error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const updateGraveCoordinates = async (propertyId: number, lat: number, lng: number) => {
        try {
            const { error } = await supabase
                .from('grave_entries')
                .update({ latitude: lat, longitude: lng })
                .eq('property_id', propertyId);

            if (error) throw error;

            setGraveCoordinates(prev => ({
                ...prev,
                [propertyId]: [lat, lng]
            }));

        } catch (error) {
            console.error('Error updating coordinates:', error);
            setIsError(true);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    const contextValue = useMemo(() => ({
        graves,
        extendedData,
        sections,
        blocks,
        rows,
        lots,
        graveCoordinates,
        isLoading,
        isError,
        selectedGrave,
        setSelectedGrave,
        refreshData,
        updateGraveCoordinates
    }), [
        graves,
        extendedData,
        sections,
        blocks,
        rows,
        lots,
        graveCoordinates,
        isLoading,
        isError,
        selectedGrave
    ]);

    return (
        <SCMappingContext.Provider value={contextValue}>
            {children}
        </SCMappingContext.Provider>
    );
};
