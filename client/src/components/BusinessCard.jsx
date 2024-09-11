import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import ScheduleIcon from '@mui/icons-material/Schedule';
import '../index.css';

export default function BusinessCard({ image, title, location, rating, schedule, onClick, width = '400px' }) {
    return (
        <ButtonBase sx={{ display: 'block', textAlign: 'inherit', width, borderRadius: '20px' }} onClick={onClick}>
            <Card sx={{ width: '100%', backgroundColor: '#4C956C', boxShadow: 8 }}>
                <CardMedia
                    sx={{ height: 140, objectFit: 'cover' }}
                    image={image}
                    title={title}
                    component="img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" fontFamily='Epilogue' fontWeight='bold' color='#FFFFFF'>
                        {title}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOnIcon sx={{ mr: 1 }} />
                            <Typography variant="body2" color='#FFFFFF'>{location}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StarIcon sx={{ mr: 1 }} />
                            <Typography variant="body2" color='#FFFFFF'>{rating}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ScheduleIcon sx={{ mr: 1 }} />
                            <Typography variant="body2" color='#FFFFFF'>{schedule}</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </ButtonBase>
    );
}
