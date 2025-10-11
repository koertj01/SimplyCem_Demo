import React, { useEffect, useState } from "react";
import Map from "./Map";
import MappingTools from "./MappingTools";
import { useSCMapping } from "./MappingProvider";

const MappingPage: React.FC = () => {
  const {
    sections,
    blocks,
    rows,
    lots,
    graves,
    graveCoordinates,
    isLoading,
    isError,
    selectedGrave,
    setSelectedGrave,
    updateGraveCoordinates
  } = useSCMapping();

  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [selectedLot, setSelectedLot] = useState<string | null>(null);

  // Auto Select the correct grave once all dropdowns are filled
  useEffect(() => {
    if (selectedSection && selectedBlock && selectedRow && selectedLot) {
      const matchedGrave = graves.find(
        (grave) => `${grave.section}-${grave.block}-${grave.row}-${grave.lot}` === 
          `${selectedSection}-${selectedBlock}-${selectedRow}-${selectedLot}`
      );
      setSelectedGrave(matchedGrave ? matchedGrave.property_id : null);
    }
  }, [selectedSection, selectedBlock, selectedRow, selectedLot, graves, setSelectedGrave]);

  const handleCoordinateUpdate = (lat: number, lng: number) => {
    if (selectedGrave) {
      updateGraveCoordinates(selectedGrave, lat, lng);
    }
  };

  // Transform graves data for MappingTools
  const gravesList = graves.map(grave => ({
    id: grave.property_id,
    label: `${grave.section}-${grave.block}-${grave.row}-${grave.lot}`
  }));

  return (
    <div>
      <MappingTools 
        sections={sections}
        blocks={blocks}
        rows={rows}
        lots={lots}
        graves={gravesList}
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
      <Map 
        coordinates={Object.values(graveCoordinates)} 
        selectedGrave={selectedGrave} 
        onCoordinateUpdate={handleCoordinateUpdate} 
      />
    </div>
  );
};

export default MappingPage;
