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
        <ButtonBase
            sx={{
                display: 'block',
                textAlign: 'inherit',
                width,
                borderRadius: '20px',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.02)' }
            }}
            onClick={onClick}
        >
            <Card
                sx={{
                    width: 400,
                    height: 320,
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    marginBottom: 2,
                }}
            >
                <CardMedia
                    sx={{
                        height: 140,
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        '&:hover': { transform: 'scale(1.1)' },
                    }}
                    image={image}
                    title={title}
                    component="img"
                />
                <CardContent
                    sx={{
                        flex: 1,
                        overflow: 'hidden',
                        padding: '16px',
                        textOverflow: 'ellipsis',
                    }}
                >
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        fontFamily="'Lato', sans-serif"
                        fontWeight="bold"
                        color="#333333"
                    >
                        {title}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#4C956C' }}>
                            <LocationOnIcon sx={{ mr: 1 }} />
                            <Typography variant="body2" noWrap>
                                {location}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#FFC107' }}>
                            <StarIcon sx={{ mr: 1 }} />
                            <Typography variant="body2" noWrap>
                                {rating}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#6C757D' }}>
                            <ScheduleIcon sx={{ mr: 1 }} />
                            <Typography variant="body2" noWrap>
                                {schedule}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </ButtonBase>
    );
}
