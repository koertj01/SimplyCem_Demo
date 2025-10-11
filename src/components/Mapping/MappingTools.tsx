import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  sections: string[];
  blocks: string[];
  rows: string[];
  lots: string[];
  graves: GraveOption[];
  selectedSection: string | null;
  selectedBlock: string | null;
  selectedRow: string | null;
  selectedLot: string | null;
  selectedGrave: number | null;
  setSelectedSection: (value: string | null) => void;
  setSelectedBlock: (value: string | null) => void;
  setSelectedRow: (value: string | null) => void;
  setSelectedLot: (value: string | null) => void;
  setSelectedGrave: (value: number | null) => void;
  isLoading?: boolean;
  isError?: boolean;
}

const MappingTools: React.FC<MappingToolsProps> = ({
  sections,
  blocks,
  rows,
  lots,
  graves,
  selectedSection,
  selectedBlock,
  selectedRow,
  selectedLot,
  selectedGrave,
  setSelectedSection,
  setSelectedBlock,
  setSelectedRow,
  setSelectedLot,
  setSelectedGrave,
  isLoading = false,
  isError = false,
}) => {
  const [showAllOptions, setShowAllOptions] = useState(true);

  // Reset cascade
  useEffect(() => {
    setSelectedBlock(null);
    setSelectedRow(null);
    setSelectedLot(null);
    setSelectedGrave(null);
  }, [selectedSection]);

  useEffect(() => {
    setSelectedRow(null);
    setSelectedLot(null);
    setSelectedGrave(null);
  }, [selectedBlock]);

  useEffect(() => {
    setSelectedLot(null);
    setSelectedGrave(null);
  }, [selectedRow]);

  useEffect(() => {
    setSelectedGrave(null);
  }, [selectedLot]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader title="Mapping Tools" />
        <CardContent>
          <CircularProgress />
          <Typography mt={2}>Loading mapping data...</Typography>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader title="Mapping Tools" />
        <CardContent>
          <Typography color="error">Failed to load mapping data.</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        title="Mapping Tools"
        action={
          <Button onClick={() => setShowAllOptions((prev) => !prev)}>
            {showAllOptions ? "Hide Unavailable" : "Show All"}
          </Button>
        }
      />
      <CardContent sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <MappingSelector
          label="Section"
          value={selectedSection}
          options={sections}
          onChange={setSelectedSection}
          highlightSelected
        />
        <MappingSelector
          label="Block"
          value={selectedBlock}
          options={showAllOptions ? blocks : blocks.filter(Boolean)}
          onChange={setSelectedBlock}
          disabled={!selectedSection}
          highlightSelected
        />
        <MappingSelector
          label="Row"
          value={selectedRow}
          options={showAllOptions ? rows : rows.filter(Boolean)}
          onChange={setSelectedRow}
          disabled={!selectedBlock}
          highlightSelected
        />
        <MappingSelector
          label="Lot"
          value={selectedLot}
          options={showAllOptions ? lots : lots.filter(Boolean)}
          onChange={setSelectedLot}
          disabled={!selectedRow}
          highlightSelected
        />
        <MappingSelector
          label="Grave"
          value={selectedGrave}
          options={showAllOptions ? graves : graves.filter((g) => g.label)}
          onChange={(val) => setSelectedGrave(Number(val))}
          disabled={!selectedLot}
          getOptionLabel={(g) => g.label}
          getOptionValue={(g) => g.id}
          isMultipleSelect={true}
          highlightSelected
        />
      </CardContent>
    </Card>
  );
};

export default MappingTools;


// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import MappingSelector from "./MappingSelector";  

// interface MappingToolsProps {
//   sections: string[];
//   blocks: string[];
//   rows: string[];
//   lots: string[];
//   graves: { id: number; label: string }[];
//   selectedSection: string | null;
//   selectedBlock: string | null;
//   selectedRow: string | null;
//   selectedLot: string | null;
//   selectedGrave: number | null;
//   setSelectedSection: (value: string | null) => void;
//   setSelectedBlock: (value: string | null) => void;
//   setSelectedRow: (value: string | null) => void;
//   setSelectedLot: (value: string | null) => void;
//   setSelectedGrave: (value: number | null) => void;
// }

// const MappingTools: React.FC<MappingToolsProps> = ({ 
//   sections,
//   blocks,
//   rows,
//   lots,
//   graves,
//   selectedSection,
//   selectedBlock,
//   selectedRow,
//   selectedLot,
//   selectedGrave,
//   setSelectedSection,
//   setSelectedBlock,
//   setSelectedRow,
//   setSelectedLot,
//   setSelectedGrave, 
// }) => {

//   useEffect(() => {
//     console.log({ sections, blocks, rows, lots, graves });
//   }, [sections, blocks, rows, lots, graves]);

//   return (
//     <Card>
//       <CardHeader title="Mapping Tools" />
//       <CardContent sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//         <MappingSelector
//           label="Section"
//           value={selectedSection}
//           options={sections}
//           onChange={setSelectedSection}
//         />
//         <MappingSelector
//           label="Block"
//           value={selectedBlock}
//           options={blocks}
//           onChange={setSelectedBlock}
//           disabled={!selectedSection}
//         />
//         <MappingSelector
//           label="Row"
//           value={selectedRow}
//           options={rows}
//           onChange={setSelectedRow}
//           disabled={!selectedBlock}
//         />
//         <MappingSelector
//           label="Lot"
//           value={selectedLot}
//           options={lots}
//           onChange={setSelectedLot}
//           disabled={!selectedRow}
//         />
//         <MappingSelector
//           label="Grave"
//           value={selectedGrave}
//           options={graves}
//           onChange={(val) => setSelectedGrave(typeof val === 'number' ? val : Number(val))}
//           disabled={!selectedLot}
//           getOptionLabel={(g) => g.label}
//           getOptionValue={(g) => g.id}
//         />
//       </CardContent>
//     </Card>
//   );
// };

// export default MappingTools;
