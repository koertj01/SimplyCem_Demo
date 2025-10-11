import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import MappingSelector from "./MappingSelector";

interface GraveOption {
  id: number;
  label: string;
}

interface MappingToolsProps {
  cemeteries: string[];
  sections: string[];
  blocks: string[];
  rows: string[];
  lots: string[];
  graves: GraveOption[];
  selectedCemetery: string | null;
  selectedSection: string | null;
  selectedBlock: string | null;
  selectedRow: string | null;
  selectedLot: string | null;
  selectedGrave: number | null;
  setSelectedCemetery: (value: string | null) => void;
  setSelectedSection: (value: string | null) => void;
  setSelectedBlock: (value: string | null) => void;
  setSelectedRow: (value: string | null) => void;
  setSelectedLot: (value: string | null) => void;
  setSelectedGrave: (value: number | null) => void;
  isLoading?: boolean;
  isError?: boolean;
}

const MappingTools: React.FC<MappingToolsProps> = ({
  cemeteries,
  sections,
  blocks,
  rows,
  lots,
  graves,
  selectedCemetery,
  selectedSection,
  selectedBlock,
  selectedRow,
  selectedLot,
  selectedGrave,
  setSelectedCemetery,
  setSelectedSection,
  setSelectedBlock,
  setSelectedRow,
  setSelectedLot,
  setSelectedGrave,
  isLoading = false,
  isError = false,
}) => {
  const resetSelections = () => {
    setSelectedCemetery(null);
    setSelectedSection(null);
    setSelectedBlock(null);
    setSelectedRow(null);
    setSelectedLot(null);
    setSelectedGrave(null);
  };

  // Handle cemetery change
  const handleCemeteryChange = (value: string | string[] | null) => {
    setSelectedCemetery(value as string | null);
    setSelectedSection(null);
    setSelectedBlock(null);
    setSelectedRow(null);
    setSelectedLot(null);
    setSelectedGrave(null);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">Error loading mapping data</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader 
        title="Mapping Tools" 
        action={
          <Button onClick={resetSelections} color="primary">
            Reset
          </Button>
        }
      />
      <CardContent>
        <MappingSelector
          label="Cemetery"
          value={selectedCemetery}
          options={cemeteries}
          onChange={handleCemeteryChange}
          disabled={isLoading}
        />
        <MappingSelector
          label="Section"
          value={selectedSection}
          options={sections}
          onChange={(value) => setSelectedSection(value as string | null)}
          disabled={isLoading || !selectedCemetery}
        />
        <MappingSelector
          label="Block"
          value={selectedBlock}
          options={blocks}
          onChange={(value) => setSelectedBlock(value as string | null)}
          disabled={isLoading || !selectedSection}
        />
        <MappingSelector
          label="Row"
          value={selectedRow}
          options={rows}
          onChange={(value) => setSelectedRow(value as string | null)}
          disabled={isLoading || !selectedBlock}
        />
        <MappingSelector
          label="Lot"
          value={selectedLot}
          options={lots}
          onChange={(value) => setSelectedLot(value as string | null)}
          disabled={isLoading || !selectedRow}
        />
        <MappingSelector<GraveOption>
          label="Grave"
          value={graves.find(g => g.id === selectedGrave) ?? null}
          options={graves}
          onChange={(value) => setSelectedGrave(value ? (value as GraveOption).id : null)}
          disabled={isLoading || !selectedLot}
          getOptionLabel={(g: GraveOption) => g.label}
          getOptionValue={(g: GraveOption) => g.id}
        />
      </CardContent>
    </Card>
  );
};

export default MappingTools;
