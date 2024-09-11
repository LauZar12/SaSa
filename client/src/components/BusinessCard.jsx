import * as React from 'react';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BusinessImage from '../assets/images/BusinessImages/Caracas Fried Chicken.jpeg';

export default function BusinessCard(onClick) {
    return (
        <ButtonBase sx={{ display: 'block', textAlign: 'inherit', width: '100%' }} onClick={onClick}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={BusinessImage}
              title="Caracas Fried Chicken"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                  Caracas Fried Chicken
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">Location: Caracas, Venezuela</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">Rating: 4.5</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ScheduleIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">Schedule: 9:00 AM - 10:00 PM</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </ButtonBase>
      );
}