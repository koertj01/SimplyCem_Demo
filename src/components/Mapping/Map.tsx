"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./map.module.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

// If TypeScript still throws an error, you can temporarily use `any` type:
// const MaptilerLayer: any = require('@maptiler/leaflet-maptilersdk');

import { map, latLng, tileLayer, MapOptions } from "leaflet";
import { supabase } from "../../utils/supabaseClient";
import { Grave } from "./IMapInterface";

// Define the type for coordinates
type Coordinate = [number, number];

interface MapProps {
  coordinates?: Coordinate[];
}

const Map: React.FC<MapProps> = ({ coordinates = [] }) => {

    // Define the shape of the filtered grave entries

  
  // Update state type
  const [graveData, setGraveData] = useState<Grave[] | null>(null);
  
  // data layer
  async function fetchGraveEntries() {
    const { data, error } = await supabase
      .from("grave_entries")
      .select(`
        longitude,
        latitude,
        property_id,
        split,
        property_type,
        cemetery,
        section,
        block,
        row,
        lot,
        grave
      `);
  
    if (error) {
      console.error("Error fetching grave entries:", error);
      return;
    }

    // Log the raw data
    console.log("Fetched Grave Data:", data);
  
    // Ensure data matches the GraveEntry structure
    if (data) {
      const formattedData: Grave[] = data.map((item) => ({
        longitude: item.longitude,
        latitude: item.latitude,
        property_id: item.property_id,
        split: item.split,
        property_type: item.property_type,
        cemetery: item.cemetery,
        section: item.section,
        block: item.block,
        row: item.row,
        lot: item.lot,
        grave: item.grave
      }));
  
      setGraveData(formattedData);
    } else {
      setGraveData(null);
    }
  }
  
  //TODO fetch entries on load, we should optimize this later, we should also refetch data when a change is made
  useEffect(()=>{
    fetchGraveEntries();
  }, [])


  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const obstructionsLayerRef = useRef<L.LayerGroup | null>(null);

  const defaultCenter: Coordinate = [40.50406, -80.021671];
  const defaultZoom = 12;

  const [obstructionsEnabled, setObstructionsEnabled] = useState(true);

  const memoizedCoordinates = useMemo(
    () => (coordinates.length ? coordinates : [defaultCenter]),
    [coordinates]
  );

  const markerIcon = L.divIcon({
    className: "custom-icon",
    html: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#FF0000" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
        `,
    iconSize: [24, 24],
  });

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      // Initialize the map
      mapRef.current = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: defaultZoom,
      });

      // Add MapTiler layer
      new MaptilerLayer({ apiKey: "C5ZY4oPOCuUN3zUXVSjR" }).addTo(
        mapRef.current
      );
    }

    if (!obstructionsLayerRef.current) {
      // Initialize obstructions layer
      obstructionsLayerRef.current = L.layerGroup().addTo(mapRef.current!);
    }

    // Clear existing layers
    obstructionsLayerRef.current.clearLayers();

    if (obstructionsEnabled) {
      // Add markers for each coordinate
      memoizedCoordinates.forEach((coord) =>
        L.marker(coord, { icon: markerIcon }).addTo(
          obstructionsLayerRef.current!
        )
      );

      // Add random circles to the map
      Array.from({ length: 10 }).forEach(() => {
        const randomLat = defaultCenter[0] + (Math.random() - 0.5) * 0.1;
        const randomLng = defaultCenter[1] + (Math.random() - 0.5) * 0.1;

        L.circle([randomLat, randomLng], {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5,
          radius: 500,
        }).addTo(obstructionsLayerRef.current!);
      });
    }
  }, [memoizedCoordinates, obstructionsEnabled]);

  const toggleObstructionsLayer = () => {
    if (obstructionsLayerRef.current) {
      obstructionsEnabled
        ? mapRef.current?.removeLayer(obstructionsLayerRef.current)
        : mapRef.current?.addLayer(obstructionsLayerRef.current);
    }
    setObstructionsEnabled((prev) => !prev);
  };

  return (
    <div className={styles.mapWrap}>
      <div ref={mapContainerRef} className={styles.map}></div>
      <button onClick={toggleObstructionsLayer} className={styles.toggleButton}>
        {obstructionsEnabled ? "Hide" : "Show"} Obstructions
      </button>
    </div>
  );
};

export default Map;

// 'use client'

// import React, { useRef, useEffect, useState, useMemo } from 'react';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import styles from './map.module.css';
// import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

// // Define the type for coordinates
// type Coordinate = [number, number];

// interface MapProps {
//     coordinates?: Coordinate[];
// }

// const Map: React.FC<MapProps> = ({ coordinates = [] }) => {
//     const mapContainerRef = useRef<HTMLDivElement>(null);
//     const mapRef = useRef<L.Map | null>(null);
//     const obstructionsLayerRef = useRef<L.LayerGroup | null>(null);

//     const defaultCenter: Coordinate = [40.50406, -80.021671];
//     const defaultZoom = 12;

//     const [obstructionsEnabled, setObstructionsEnabled] = useState(true);

//     const memoizedCoordinates = useMemo(
//         () => (coordinates.length ? coordinates : [defaultCenter]),
//         [coordinates]
//     );

//     const markerIcon = L.divIcon({
//         className: 'custom-icon',
//         html: `
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
//                 <path fill="#FF0000" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
//             </svg>
//         `,
//         iconSize: [24, 24],
//     });

//     useEffect(() => {
//         if (!mapRef.current && mapContainerRef.current) {
//             // Initialize the map
//             mapRef.current = L.map(mapContainerRef.current, {
//                 center: defaultCenter,
//                 zoom: defaultZoom,
//             });

//             // Add MapTiler layer
//             new MaptilerLayer({ apiKey: "C5ZY4oPOCuUN3zUXVSjR" }).addTo(mapRef.current);
//         }

//         if (!obstructionsLayerRef.current) {
//             // Initialize obstructions layer
//             obstructionsLayerRef.current = L.layerGroup().addTo(mapRef.current!);
//         }

//         // Clear existing layers
//         obstructionsLayerRef.current.clearLayers();

//         if (obstructionsEnabled) {
//             // Add markers for each coordinate
//             memoizedCoordinates.forEach(coord =>
//                 L.marker(coord, { icon: markerIcon }).addTo(obstructionsLayerRef.current!)
//             );

//             // Add random circles to the map
//             Array.from({ length: 10 }).forEach(() => {
//                 const randomLat = defaultCenter[0] + (Math.random() - 0.5) * 0.1;
//                 const randomLng = defaultCenter[1] + (Math.random() - 0.5) * 0.1;

//                 L.circle([randomLat, randomLng], {
//                     color: 'red',
//                     fillColor: '#f03',
//                     fillOpacity: 0.5,
//                     radius: 500
//                 });
//                 circle.addTo(obstructionsLayer.current!);
//             }

//         }
//     }, [memoizedCoordinates, obstructionsEnabled]);

//     const toggleObstructionsLayer = () => {
//         if (obstructionsLayerRef.current) {
//             obstructionsEnabled
//                 ? mapRef.current?.removeLayer(obstructionsLayerRef.current)
//                 : mapRef.current?.addLayer(obstructionsLayerRef.current);
//         }
//         setObstructionsEnabled(prev => !prev);
//     };

//     return (
//         <div className={styles.mapWrap}>
//             <div ref={mapContainerRef} className={styles.map}></div>
//             <button onClick={toggleObstructionsLayer} className={styles.toggleButton}>
//                 {obstructionsEnabled ? 'Hide' : 'Show'} Obstructions
//             </button>
//         </div>
//     );
// };

// export default Map;
 

// // 'use client'

// // import React, { useRef, useEffect, useState, useMemo } from 'react';
// // import 'leaflet/dist/leaflet.css';
// // import L from 'leaflet';
// // import styles from './map.module.css';
// // import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";


// // // Define the type for coordinates
// // type Coordinate = [number, number];

// // interface MapProps {
// //     coordinates?: Coordinate[];
// // }

// // const Map: React.FC<MapProps> = ({ coordinates = [] }) => {
// //     const mapContainer = useRef<HTMLDivElement>(null);
// //     const map = useRef<L.Map | null>(null);
// //     const obstructionsLayer = useRef<L.LayerGroup<L.Layer> | null>(null); // Reference for the obstructions layer
// //     const center = { lat: 40.50406, lng: -80.021671 };
// //     const [zoom] = useState<number>(12);
// //     const [obstructionsEnabled, setObstructionsEnabled] = useState<boolean>(true); // State to track whether obstructions layer is enabled or disabled

// //     const initialCoordinates = coordinates.length ? coordinates : [[center.lat, center.lng] as Coordinate];
// //     const memoizedCoordinates = useMemo(() => initialCoordinates, [coordinates, center.lat, center.lng]);

// //     const markerSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#FF0000" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>';

// //     useEffect(() => {
// //         if (!map.current && mapContainer.current) {
// //             map.current = new L.Map(mapContainer.current, {
// //                 center: L.latLng(center.lat, center.lng),
// //                 zoom: zoom
// //             });

// //             // Create a MapTiler Layer inside Leaflet
// //             new MaptilerLayer({
// //                 // Get your free API key at https://cloud.maptiler.com
// //                 apiKey: "C5ZY4oPOCuUN3zUXVSjR",
// //             }).addTo(map.current);
// //         }

// //         // Initialize the obstructions layer if it doesn't exist
// //         if (!obstructionsLayer.current) {
// //             obstructionsLayer.current = L.layerGroup().addTo(map.current!);
// //         }

// //         // Clear existing markers and layers from obstructions layer
// //         obstructionsLayer.current.clearLayers();

// //         // Add markers for each coordinate to the obstructions layer if enabled
// //         if (obstructionsEnabled && obstructionsLayer.current) {
// //             memoizedCoordinates.forEach(coord => {
// //                 const customIcon = L.divIcon({
// //                     className: 'custom-icon',
// //                     html: markerSVG,
// //                     iconSize: [24, 24],
// //                 });
// //                 L.marker(coord, { icon: customIcon }).addTo(obstructionsLayer.current!);
// //             });

// //             // Add a random circle to the obstructions layer
// //             for (let i = 0; i < 10; i++ ) {
// //                 const randomLat = center.lat + (Math.random() - 0.5) * 0.1;
// //                 const randomLng = center.lng + (Math.random() - 0.5) * 0.1;
// //                 const circle = L.circle([randomLat, randomLng], {
// //                     color: 'red',
// //                     fillColor: '#f03',
// //                     fillOpacity: 0.5,
// //                     radius: 500
// //                 });
// //                 circle.addTo(obstructionsLayer.current!);
// //             }
            
// //         }

// //     }, [center.lng, center.lat, zoom, memoizedCoordinates, obstructionsEnabled]);

// //     // Function to toggle obstructions layer
// //     const toggleObstructionsLayer = () => {
// //         if (obstructionsLayer.current) {
// //             if (obstructionsEnabled) {
// //                 map.current?.removeLayer(obstructionsLayer.current);
// //             } else {
// //                 map.current?.addLayer(obstructionsLayer.current);
// //             }
// //         }
// //         setObstructionsEnabled(prevState => !prevState);
// //     };

// //     return (
// //         <div className={styles.mapWrap}>
// //             <div ref={mapContainer} className={styles.map}></div>
// //             <button onClick={toggleObstructionsLayer} className={styles.toggleButton}>
// //                 {obstructionsEnabled ? 'Hide' : 'Show'} Obstructions
// //             </button>
// //         </div>
// //     )
// // }

// // export default Map;
