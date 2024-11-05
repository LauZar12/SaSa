import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { LocationOn, AccessTime, MyLocation } from '@mui/icons-material';

const BusinessCardV2 = ({ business }) => {
  const {
    Business_Address = 'Dirección no disponible',
    Business_Name = 'Nombre no disponible',
    Business_City = 'Ciudad no especificada',
    Business_Hours = 'Horario no especificado'
  } = business || {};

  return (
    <Card className="max-w-md mx-auto shadow-lg">
      <CardHeader sx={{ bgcolor: '#4C956C'}}
        title={
          <Typography variant="h5" className="font-bold text-center text-white">
            {Business_Name}
          </Typography>
        }
      />
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <LocationOn className="text-gray-500" />
          <Typography variant="body1">
            {Business_Address}
          </Typography>
        </div>
        <div className="flex items-center space-x-2">
          <MyLocation className="text-gray-500" />
          <Typography variant="body1">{Business_City}</Typography>
        </div>
        <div className="flex items-center space-x-2">
          <AccessTime className="text-gray-500" />
          <Typography variant="body1">{Business_Hours}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCardV2;