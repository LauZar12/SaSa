import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Business as BusinessIcon,
  Inventory as InventoryIcon,
  CardGiftcard as CardGiftcardIcon,
} from '@mui/icons-material';
import axios from 'axios';

const drawerWidth = 240;

export default function Component() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Business Info');
  const [content, setContent] = useState(null);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let businessId = 'business%231'; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        
        if (selectedOption === 'Business Info') {
          response = await axios.get(`http://localhost:5000/admin/businesses/${businessId}`);
        } else if (selectedOption === 'Products') {
          response = await axios.get(`http://localhost:5000/admin/businesses/${businessId}/products`);
        }
  
        console.log('Response data:', response.data); // Verifica lo que se recibe
        setContent(response.data); // Almacena la respuesta en el estado content
      } catch (error) {
        console.error('Error fetching data:', error);
        setContent(null); // Resetea el contenido en caso de error
      }
    };
  
    fetchData();
  }, [selectedOption, businessId]);
  
  

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {['Business Info', 'Products', 'Surprise Boxes'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => setSelectedOption(text)}>
              <ListItemIcon>
                {index === 0 ? <BusinessIcon /> : index === 1 ? <InventoryIcon /> : <CardGiftcardIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const renderContent = () => {
    switch (selectedOption) {
      case 'Business Info':
        return (
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              Business Information
            </Typography>
            <Typography paragraph>
              {content && content.length > 0 ? ( // Verifica si content no está vacío y tiene datos
                <pre>{JSON.stringify(content[0], null, 2)}</pre> // Accede al primer elemento del array
              ) : (
                'Loading business information...'
              )}
            </Typography>
          </Box>
        );
      case 'Products':
        return (
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              Products Management
            </Typography>
            <Typography paragraph>
              {content && content.length > 0 ? (
                <pre>{JSON.stringify(content, null, 2)}</pre>
              ) : (
                'Loading product information...'
              )}
            </Typography>
          </Box>
        );
      case 'Surprise Boxes':
        return (
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              Surprise Boxes
            </Typography>
            <Typography paragraph>
              Create and manage surprise box offerings, set contents, and determine pricing for these special packages.
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Mejor rendimiento al abrir en móvil.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}
