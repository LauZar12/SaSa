import React from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { LocalOffer, Discount, AttachMoney, Description } from '@mui/icons-material';

const calculateAfterDiscountPrice = (price, discount) => {
  // Assuming discount is in percentage
  const discountValue = (price * discount) / 100;
  return price - discountValue;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export default function ProductCard({
  image,
  title,
  discount,
  price,
  description,
  onClick,
  width = '400px'
}) {
  const afterDiscountPrice = calculateAfterDiscountPrice(price, discount);
  

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
              <LocalOffer sx={{ mr: 1 }} />
              <Typography variant="body2" color='#FFFFFF'>{`${discount}%`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoney sx={{ mr: 1 }} />
              <Typography variant="body2" color='#FFFFFF'>{`$${formatPrice(price.toFixed(2))}`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Discount sx={{ mr: 1 }} />
              <Typography variant="body2" color='#FFFFFF'>{`$${formatPrice(afterDiscountPrice.toFixed(2))}`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Description sx={{ mr: 1 }} />
              <Typography variant="body2" color='#FFFFFF'>{description}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}
