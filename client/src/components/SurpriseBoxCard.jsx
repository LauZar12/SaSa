import React from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SurpriseBox from '../assets/images/SurpriseBox.png';
import InventoryIcon from '@mui/icons-material/Inventory';

import { LocalOffer, Discount, AttachMoney, Description } from '@mui/icons-material';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export default function ProductCard({
  title,
  price,
  count,
  onClick,
  width = '400px'
}) {

  return (
    <ButtonBase sx={{ display: 'block', textAlign: 'inherit', width, borderRadius: '20px' }} onClick={onClick}>
      <Card sx={{ width: '100%', backgroundColor: "#FF0000", boxShadow: 8 }}>
        <CardMedia
          sx={{ height: 140, objectFit: 'cover' }}
          image={SurpriseBox}
          title={title}
          component="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" fontFamily='Epilogue' fontWeight='bold' color='#FFFFFF'>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoney sx={{ mr: 1 }} />
              <Typography variant="body2" color='#FFFFFF'>{`$${formatPrice(price)}`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <InventoryIcon sx={{ mr: 1 }} />
              <Typography variant="body2" fontWeight='bold' color='#FFFFFF'>{count}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}
