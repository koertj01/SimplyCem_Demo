import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

interface MappingToolsProps {
  sections: string[];
  blocks: string[];
  rows: string[];
  lots: string[];
  graves: string[];
}

const MappingTools: React.FC<MappingToolsProps> = ({ sections, blocks, rows, lots, graves }) => {
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedBlock, setSelectedBlock] = useState<string>("");
  const [selectedRow, setSelectedRow] = useState<string>("");
  const [selectedLot, setSelectedLot] = useState<string>("");
  const [selectedGrave, setSelectedGrave] = useState<string>("");

  useEffect(() => {
    console.log({ sections, blocks, rows, lots, graves });
  }, [sections, blocks, rows, lots, graves]);

  return (
    <Card>
      <CardHeader title="Mapping Tools" />
      <CardContent>
        {/* Section */}
        <FormControl sx={{ width: 160 }}>
          <InputLabel>Section</InputLabel>
          <Select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
            {sections.length > 0 ? (
              sections.map((section) => (
                <MenuItem key={section} value={section}>{section}</MenuItem>
              ))
            ) : (
              <MenuItem disabled>No Data</MenuItem>
            )}
          </Select>
        </FormControl>

        {/* Block */}
        <FormControl sx={{ width: 160 }} disabled={!selectedSection}>
          <InputLabel>Block</InputLabel>
          <Select value={selectedBlock} onChange={(e) => setSelectedBlock(e.target.value)}>
            {blocks.length > 0 ? (
              blocks.map((block) => (
                <MenuItem key={block} value={block}>{block}</MenuItem>
              ))
            ) : (
              <MenuItem disabled>No Data</MenuItem>
            )}
          </Select>
        </FormControl>

        {/* Row */}
        <FormControl sx={{ width: 160 }} disabled={!selectedBlock}>
          <InputLabel>Row</InputLabel>
          <Select value={selectedRow} onChange={(e) => setSelectedRow(e.target.value)}>
            {rows.length > 0 ? (
              rows.map((row) => (
                <MenuItem key={row} value={row}>{row}</MenuItem>
              ))
            ) : (
              <MenuItem disabled>No Data</MenuItem>
            )}
          </Select>
        </FormControl>

        {/* Lot */}
        <FormControl sx={{ width: 160 }} disabled={!selectedRow}>
          <InputLabel>Lot</InputLabel>
          <Select value={selectedLot} onChange={(e) => setSelectedLot(e.target.value)}>
            {lots.length > 0 ? (
              lots.map((lot) => (
                <MenuItem key={lot} value={lot}>{lot}</MenuItem>
              ))
            ) : (
              <MenuItem disabled>No Data</MenuItem>
            )}
          </Select>
        </FormControl>

        {/* Grave */}
        <FormControl sx={{ width: 160 }} disabled={!selectedLot}>
          <InputLabel>Grave</InputLabel>
          <Select value={selectedGrave} onChange={(e) => setSelectedGrave(e.target.value)}>
            {graves.length > 0 ? (
              graves.map((grave) => (
                <MenuItem key={grave} value={grave}>{grave}</MenuItem>
              ))
            ) : (
              <MenuItem disabled>No Data</MenuItem>
            )}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default MappingTools;
