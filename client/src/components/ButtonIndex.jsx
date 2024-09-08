import React from 'react';
import Button from '@mui/material/Button';

export default function ButtonIndex({ children, width, marginTop, type = 'button', ...props }) {
    return (
        <Button
            {...props}
            type={type}  // Pass the type prop to the Button component
            variant="contained"
            sx={{
                backgroundColor: '#418441',  // Background color
                color: '#F2F6FC',            // Font color
                borderRadius: '50px',         // Round only the left and right corners (pill shape)
                minWidth: 0,                  // Removes default min width
                padding: '7px 22px',          // Adjust padding as needed
                width: width || 'auto',       // Use the width prop or default to auto
                marginTop: marginTop || 0,    // Apply the marginTop prop or default to 0
                '&:hover': {
                    backgroundColor: '#357a38', // Slightly darker green on hover (optional)
                },
                fontWeight: 'bold',           // Bold font weight
                textTransform: 'none',        // Prevents text from being transformed to uppercase
                fontSize: "16px"
            }}
        >
            {children}
        </Button>
    );
}
