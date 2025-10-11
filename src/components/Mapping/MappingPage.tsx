import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import Map from "./Map";
import MappingTools from "./MappingTools";

const MappingPage: React.FC = () => {
  const [sections, setSections] = useState<string[]>([]);
  const [blocks, setBlocks] = useState<string[]>([]);
  const [rows, setRows] = useState<string[]>([]);
  const [lots, setLots] = useState<string[]>([]);
  const [graves, setGraves] = useState<{ id: number; label: string }[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [selectedLot, setSelectedLot] = useState<string | null>(null);
  const [selectedGrave, setSelectedGrave] = useState<number | null>(null);
  const [graveCoordinates, setGraveCoordinates] = useState<{ [key: number]: [number, number] }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);


  async function fetchGraveEntries() {
    setIsLoading(true);
    setIsError(false);
    const { data, error } = await supabase
      .from("grave_entries")
      .select("property_id, section, block, row, lot, grave, latitude, longitude");

      if (error) {
        console.error("Error fetching grave entries:", error);
        setIsError(true);
        setIsLoading(false);
        return;
      }

    if (data) {
      setSections([...new Set(data.map((item) => item.section))]);
      setBlocks([...new Set(data.map((item) => item.block))]);
      setRows([...new Set(data.map((item) => item.row))]);
      setLots([...new Set(data.map((item) => item.lot))]);
      setGraves(
        data.map((item) => ({
          id: item.property_id,
          label: `${item.section}-${item.block}-${item.row}-${item.lot}`,
        }))
      );

      setGraveCoordinates(
        data.reduce((acc, item) => {
          if (item.latitude && item.longitude) {
            acc[item.property_id] = [item.latitude, item.longitude];
          }
          return acc;
        }, {} as Record<number, [number, number]>)
      );
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchGraveEntries();
  }, []);

  // Auto Select the correct grave once all dropdowns are filled
  useEffect(() => {
    if (selectedSection && selectedBlock && selectedRow && selectedLot) {
      const matchedGrave = graves.find(
        (grave) => grave.label === `${selectedSection}-${selectedBlock}-${selectedRow}-${selectedLot}`
      );
      setSelectedGrave(matchedGrave ? matchedGrave.id : null);
    }
  }, [selectedSection, selectedBlock, selectedRow, selectedLot, graves]);

  async function updateGraveCoordinates(lat: number, lng: number) {
    if (!selectedGrave) return;

    const { error } = await supabase
      .from("grave_entries")
      .update({ latitude: lat, longitude: lng })
      .eq("grave", selectedGrave);

    if (error) {
      console.error("Error updating coordinates: ", error);
      return;
    }

    // Update only the selected grave’s coordinates
    setGraveCoordinates((prev) => ({
      ...prev,
      [selectedGrave]: [lat, lng],
    }));

    console.log(`Updated grave ${selectedGrave} coordinates to: ${lat}, ${lng}`);
  }

  return (
    <div>
      <MappingTools 
        sections={sections}
        blocks={blocks}
        rows={rows}
        lots={lots}
        graves={graves}
        selectedSection={selectedSection}
        selectedBlock={selectedBlock}
        selectedRow={selectedRow}
        selectedLot={selectedLot}
        selectedGrave={selectedGrave}
        setSelectedSection={setSelectedSection}
        setSelectedBlock={setSelectedBlock}
        setSelectedRow={setSelectedRow}
        setSelectedLot={setSelectedLot}
        setSelectedGrave={setSelectedGrave} 
        isLoading={isLoading}
        isError={isError}
      />
      <Map coordinates={Object.values(graveCoordinates)} selectedGrave={selectedGrave} onCoordinateUpdate={updateGraveCoordinates} />
    </div>
  );
};

export default MappingPage;
