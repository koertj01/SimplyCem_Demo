import React from "react";
import { Toolbar, TextField, Tabs, Tab, Box } from "@mui/material";

type TabConfig = { label: string; value: string };

type ToolbarProps = {
  tabConfig: TabConfig[];
  selectedTab: string;
  startDate: string;
  endDate: string;
  onChange: (updates: { startDate?: string; endDate?: string; selectedTab?: string }) => void;
};

export const createToolbar = ({
  tabConfig,
  selectedTab,
  startDate,
  endDate,
  onChange,
}: ToolbarProps): React.ReactNode => {
  return (
    <Toolbar sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      {/* Tabs */}
      <Box sx={{ flexGrow: 1 }}>
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => onChange({ selectedTab: newValue })}
        >
          {tabConfig.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </Box>
      {/* Date Pickers */}
      <TextField
        type="date"
        label="Start Date"
        value={startDate}
        onChange={(e) => onChange({ startDate: e.target.value })}
        InputLabelProps={{ shrink: true }}
        sx={{ minWidth: 150 }}
      />
      <TextField
        type="date"
        label="End Date"
        value={endDate}
        onChange={(e) => onChange({ endDate: e.target.value })}
        InputLabelProps={{ shrink: true }}
        sx={{ minWidth: 150 }}
      />

    </Toolbar>
  );
};
