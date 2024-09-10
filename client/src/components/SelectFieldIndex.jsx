import React from 'react';
import createThemeNoVars from '@mui/material/styles/createThemeNoVars';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SelectFieldIndex({
    label,
    size,
    topText,
    width,
    required,
    helperText,
    error,
    value,
    onChange,
    options = [], // List of options for the Select
}) {
    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start',
            paddingLeft: 1 // Adds padding to the left of the entire Box
        }}>
            {topText && (
                <Typography
                    variant="body2"
                    sx={{
                        color: "#232521", // Black font color
                        mb: 1, // Margin-bottom for spacing between top text and Select
                        mt: 1,
                        fontFamily: "Roboto",
                        fontWeight: "bold",
                        fontSize: "20px"
                    }}
                >
                    {topText}
                </Typography>
            )}
            <InputLabel id={`${label}-label`} sx={{ 
                color: "#738763", 
                fontWeight: "normal", 
                fontSize: "15px",
                "&.Mui-focused": { color: "#738763" } // Color del label en focus
            }}>
                {label}
            </InputLabel>
            <Select
                labelId={`${label}-label`}
                value={value}
                onChange={onChange}
                required={required}
                error={error}
                sx={{
                    mt: 1,
                    width: width || '100%', // Use the width prop or default to full width
                    backgroundColor: "#F2F5F0",  // Background color
                    color: "#232521",  // Text color (you can adjust as needed)
                    fontFamily: "Roboto",
                    fontWeight: "normal",  // Adjust if needed
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#738763",  // Border color
                        borderWidth: "0px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#738763",  // Border color on focus
                        borderWidth: "2px",
                    },
                    "& .MuiSelect-root": {
                        padding: "6px 10px", // Reduce padding for smaller size
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {helperText && (
                <Typography
                    variant="caption"
                    color={error ? "error" : "textSecondary"}
                    sx={{ mt: 1 }}
                >
                    {helperText}
                </Typography>
            )}
        </Box>
    );
}
