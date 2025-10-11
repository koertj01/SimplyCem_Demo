"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./map.module.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

type Coordinate = [number, number];

interface MapProps {
  coordinates: Record<number, Coordinate>;
  selectedGrave: number | null;
  selectedCemetery: string | null;
  onCoordinateUpdate: (lat: number, lng: number) => void;
}

const Map: React.FC<MapProps> = ({ coordinates, selectedGrave, selectedCemetery, onCoordinateUpdate }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const gravesLayerRef = useRef<L.LayerGroup | null>(null);

  // Define cemetery centers
  const cemeteryCenters: Record<string, Coordinate> = {
    'Oakwood Memorial': [42.123456, -71.234567],
    'Riverside Cemetery': [42.125456, -71.237567],
    // Add more cemeteries as needed
  };

  const defaultCenter: Coordinate = [40.50406, -80.021671];
  const defaultZoom = 12;
  
  // Get center coordinates based on selected cemetery
  const getCenterCoordinates = (): Coordinate => {
    if (selectedCemetery && cemeteryCenters[selectedCemetery]) {
      return cemeteryCenters[selectedCemetery];
    }
    return defaultCenter;
  };

  const markerIcon = L.divIcon({
    className: "custom-icon",
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="#FF0000" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `,
    iconSize: [24, 24],
  });

  const selectedIcon = L.divIcon({
    className: "selected-icon",
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
        <path fill="#007BFF" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `,
    iconSize: [28, 28],
  });

  const memoizedCoordinates = useMemo(() => {
    return Object.entries(coordinates).map(([id, coord]) => ({
      id: Number(id),
      coordinates: coord,
    }));
  }, [coordinates]);

  // Initialize map and tile layer
  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      const center = getCenterCoordinates();
      mapRef.current = L.map(mapContainerRef.current, {
        center: center,
        zoom: defaultZoom,
      });

      new MaptilerLayer({ apiKey: "C5ZY4oPOCuUN3zUXVSjR" }).addTo(mapRef.current);
    }

    if (!gravesLayerRef.current) {
      gravesLayerRef.current = L.layerGroup().addTo(mapRef.current!);
    }
  }, []);

  // Register click handler only once
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handleClick = (e: L.LeafletMouseEvent) => {
      if (!selectedGrave) {
        console.warn("Please Select a Grave");
        return;
      }

      const { lat, lng } = e.latlng;
      onCoordinateUpdate(lat, lng);
    };

    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [selectedGrave, onCoordinateUpdate]);

  // Update grave markers
  useEffect(() => {
    if (!gravesLayerRef.current) return;

    gravesLayerRef.current.clearLayers();

    memoizedCoordinates.forEach(({ id, coordinates }) => {
      const icon = selectedGrave === id ? selectedIcon : markerIcon;

      const marker = L.marker(coordinates, { icon }).addTo(gravesLayerRef.current!);
      marker.bindPopup(`Grave ID: ${id}`);
    });
  }, [memoizedCoordinates, selectedGrave]);

  // Update map center when cemetery changes
  useEffect(() => {
    if (!mapRef.current) return;
    
    const center = getCenterCoordinates();
    mapRef.current.setView(center, defaultZoom);
  }, [selectedCemetery]);

  return <div ref={mapContainerRef} className={styles.map}></div>;
};

export default Map;
