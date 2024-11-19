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
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import '../index.css';

export default function BusinessCard({ image, title, location, rating, schedule, onClick, width = '400px' }) {
    return (
        <ButtonBase sx={{ display: 'block', textAlign: 'inherit', width, borderRadius: '20px' }} onClick={onClick}>
            <Card sx={{ width: 400, height: 315, backgroundColor: '#4C956C', boxShadow: 0.5, flexDirection: 'column', marginBottom: 2 }}>
                <CardMedia
                    sx={{ height: 140, objectFit: 'cover' }}
                    image={image}
                    title={title}
                    component="img"
                />
                <CardContent sx={{ 
                    flex: 1, // Permite que el contenido se ajuste al espacio restante
                    overflow: 'hidden', // Oculta contenido desbordante
                    textOverflow: 'ellipsis' // Añade puntos suspensivos si el texto es muy largo
                    }}>
                    <Typography gutterBottom variant="h5" component="div" fontFamily='Epilogue' fontWeight='bold' color='#FFFFFF'>
                        {title}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOnIcon sx={{ mr: 1 }} />
                            <Typography variant="body2" color='#FFFFFF' noWrap>{location}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StarIcon sx={{ mr: 1 }} />
                            <Typography variant="body2" color='#FFFFFF' noWrap>{rating}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ScheduleIcon sx={{ mr: 1 }} />
                            <Typography variant="body2" color='#FFFFFF' noWrap>{schedule}</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </ButtonBase>
    );
}
