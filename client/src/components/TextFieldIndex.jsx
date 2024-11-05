import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function TextFieldIndex({
    label,
    size,
    topText,
    width,
    required,
    helperText,
    error,
    value,
    fontFamily,
    onChange,
    type = 'text' // Default to 'text' if no type is provided
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
                        mb: 1, // Margin-bottom for spacing between top text and TextField
                        mt: 1,
                        fontFamily: fontFamily || "Epilogue",
                        fontWeight: "bold",
                        fontSize: "20px"
                    }}
                >
                    {topText}
                </Typography>
            )}
            <TextField
                label={label}
                size={size}
                type={type} // Apply type prop
                variant="outlined"
                color="secondary"
                required={required} // Apply required prop
                helperText={helperText} // Apply helperText prop
                error={error} // Apply error prop
                value={value} // Apply value prop
                onChange={onChange} // Apply onChange prop
                sx={{
                    mt: 1,
                    width: width || '100%', // Use the width prop or default to full width
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "#F2F5F0",  // Background color
                        color: "#232521",  // Text color (you can adjust as needed)
                        fontFamily: fontFamily || "Epilogue",
                        fontWeight: "normal",  // Adjust if needed

                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#738763",  // Border color
                            borderWidth: "0px",
                        },
                        "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#738763",  // Border color on focus
                                borderWidth: "2px",
                            },
                        },
                    },
                    "& .MuiInputLabel-outlined": {
                        color: "#738763",  // Label color
                        fontWeight: "normal",
                        fontFamily: fontFamily || "Epilogue",
                        "&.Mui-focused": {
                            color: "#738763",  // Label color on focus
                        },
                    },
                }}
            />
        </Box>
    );
}
