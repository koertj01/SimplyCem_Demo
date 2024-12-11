import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

export default function MappingTools() {
  return (
    <>
      <Card
        sx={{
          backgroundColor: "rgb(226, 232, 240)", // Slate-200 equivalent in Tailwind
          border: "2px solid rgb(14, 165, 233)", // Sky-500 equivalent
        }}
      >
        <CardHeader
          title={<Typography variant="h6">Grave Mapping</Typography>}
        />
        <CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "16px",
              alignItems: "center",
            }}
          >
            {/* Section Select */}
            <FormControl sx={{ width: 160 }}>
              <InputLabel>Section</InputLabel>
              <Select defaultValue="">
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="system">System</MenuItem>
              </Select>
            </FormControl>

            {/* Lot Select */}
            <FormControl sx={{ width: 160 }}>
              <InputLabel>Lot</InputLabel>
              <Select defaultValue="">
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="system">System</MenuItem>
              </Select>
            </FormControl>

            {/* Grave Select */}
            <FormControl sx={{ width: 160 }}>
              <InputLabel>Grave</InputLabel>
              <Select defaultValue="">
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="system">System</MenuItem>
              </Select>
            </FormControl>

            {/* Spacer */}
            <div style={{ flexGrow: 1 }}></div>

            {/* Buttons */}
            <Button
              variant="outlined"
              sx={{ width: 160, height: 40 }}
            >
              Insert
            </Button>
            <Button
              variant="outlined"
              sx={{ width: 160, height: 40 }}
            >
              Clear Selected
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
