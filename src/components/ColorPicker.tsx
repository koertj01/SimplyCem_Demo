import React, { useState } from 'react';
import { Box, Slider, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { hexToRgb, rgbToHex, getContrastRatio } from '@mui/material/styles';

// TODO: move this to React-Hook-form
const ThemeEditorTool = () => {
    const theme = useTheme();
    const [primaryColor, setPrimaryColor] = useState([0, 0, 0]); // Primary color in RGB
    const [secondaryColor, setSecondaryColor] = useState([255, 255, 255]); // Secondary color in RGB

    const primaryHex = rgbToHex(`rgb(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]})`);
    const secondaryHex = rgbToHex(`rgb(${secondaryColor[0]}, ${secondaryColor[1]}, ${secondaryColor[2]})`);

    // Calculate contrast ratio
    const contrastRatio = getContrastRatio(hexToRgb(primaryHex), hexToRgb(secondaryHex));
    const contrastThreshold = theme.palette.contrastThreshold || 4.5;

    const isContrastValid = contrastRatio >= contrastThreshold;

    const handleColorChange = (event, newValue, setColor) => {
        if (Array.isArray(newValue)) {
            setColor(newValue);
        }
    };

    const saveThemeToTxt = () => {
        const themeSettings = `
        Primary Color: ${primaryHex}
        Secondary Color: ${secondaryHex}
        Contrast Ratio: ${contrastRatio.toFixed(2)}
        Contrast Valid: ${isContrastValid ? 'Yes' : 'No'}
        `;

        const blob = new Blob([themeSettings], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'theme-settings.txt';
        link.click();
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h5" gutterBottom>
                Material UI Theme Editor Tool
            </Typography>

            {/* Primary Color Sliders */}
            <Typography>Primary Color (RGB)</Typography>
            <Slider
                value={primaryColor}
                min={0}
                max={255}
                step={1}
                onChange={(e, value) => handleColorChange(e, value, setPrimaryColor)}
                valueLabelDisplay="auto"
            />
            
            {/* Secondary Color Sliders */}
            <Typography>Secondary Color (RGB)</Typography>
            <Slider
                value={secondaryColor}
                min={0}
                max={255}
                step={1}
                onChange={(e, value) => handleColorChange(e, value, setSecondaryColor)}
                valueLabelDisplay="auto"
            />

            {/* Display the selected colors */}
            <Box
                sx={{
                    padding: 2,
                    backgroundColor: primaryHex,
                    color: secondaryHex,
                    marginTop: 2,
                }}
            >
                <Typography>
                    Primary Color: <strong>{primaryHex}</strong>
                </Typography>
                <Typography>
                    Secondary Color: <strong>{secondaryHex}</strong>
                </Typography>
                <Typography>
                    Contrast Ratio: <strong>{contrastRatio.toFixed(2)}</strong>
                    {isContrastValid ? '' : <span style={{ color: 'red' }}> - Contrast too low!</span>}
                </Typography>
            </Box>

            {/* Save Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={saveThemeToTxt}
                sx={{ marginTop: 2 }}
            >
                Save Theme Settings
            </Button>
        </Box>
    );
};

export default ThemeEditorTool;
