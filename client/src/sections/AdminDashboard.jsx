import React, { useState, useEffect } from 'react';
import {
  AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Button
} from '@mui/material';
import {
  Menu as MenuIcon, Business as BusinessIcon, Inventory as InventoryIcon, CardGiftcard as CardGiftcardIcon,
} from '@mui/icons-material';
import axios from 'axios';
import BusinessCardV2 from '../components/BusinessCardV2';
import Cookies from 'js-cookie'; 
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Logo2 from '../assets/images/Logo Sasa-2.png';
import AdminProductCard from '../components/AdminProductCard';
import EditProduct from './EditProduct'; 
import CreateProduct from './CreateProduct';
import EditBusiness from './EditBusiness';
import toast from 'react-hot-toast';

const drawerWidth = 240;

export default function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Negocio');
  const [content, setContent] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false); 
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editBusinessModalOpen, setEditBusinessModalOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null); 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const userInfo = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const businessId = userInfo ? encodeURIComponent(userInfo.GS1_PK) : '';

  const fetchData = async () => {
    try {
      let response;
      if (selectedOption === 'Negocio') {
        response = await axios.get(`http://localhost:5000/admin/businesses/${businessId}`);
      } else if (selectedOption === 'Productos') {
        response = await axios.get(`http://localhost:5000/admin/businesses/${businessId}/products`);
      }
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setContent(null);
    }
  };

  useEffect(() => {
    if (businessId) {
      fetchData();
    }
  }, [selectedOption, businessId]);

  const handleCreateProduct = () => {
    setCreateModalOpen(true);
  }

  const handleEditProduct = (productId) => {
    setCurrentProductId(productId);
    setEditModalOpen(true); 
  };

  const handleUpdateProduct = (updatedProduct) => {
    setContent((prevProducts) =>
      prevProducts.map((product) =>
        product.GS3_PK === updatedProduct.GS3_PK ? updatedProduct : product
      )
    );
  };

  const handleEditBusiness = () => {
    setEditBusinessModalOpen(true);
  }

  const handleEditModalClose = () => {
    setEditModalOpen(false); 
    fetchData();
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
    fetchData();
  }

  const handleProductDeleted = async (productId) => {
    try {
      const encodedProductId = encodeURIComponent(productId); 
      await axios.delete(`http://localhost:5000/admin/businesses/${businessId}/products/${encodedProductId}/delete-product`);
      
      setContent((prevProducts) => prevProducts.filter((product) => product.GS3_PK !== productId));
      console.log(`Producto ${productId} eliminado con éxito.`);
      toast.success('Producto eliminado correctamente!')
    } catch (error) {
      console.error('Error eliminando el producto:', error);
      toast.error("Ups, tuvimos problemas para eliminar el producto.")
    }
  };

  const handleEditBusinessModalClose = () => {
    setEditBusinessModalOpen(false);
    fetchData();
  }


  const drawer = (
    <div>
      <Toolbar />
      <List>
        {['Negocio', 'Productos', 'Cajas Sorpresa'].map((text, index) => (
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
      case 'Negocio':
        return (
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              Información del Negocio
            </Typography>
            <Button
              variant="contained"
              color="primary"
              position="absolute"
              startIcon={<EditIcon />}
              onClick={handleEditBusiness}
              sx={{ mt: 2, mb: 5 }}
            >
              Editar Negocio
            </Button>
            {content && content.length > 0 ? (
              <BusinessCardV2 business={content[0]} />
            ) : (
              'Cargando información del negocio...'
            )}

          </Box>
        );
      case 'Productos':
        return (
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              Maneja tus productos
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleCreateProduct}
              sx={{ mt: 2, mb: 5 }}
            >
              Crear Producto
            </Button>
            <br />
            <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2}>
              {content && content.map((product) => (
                <AdminProductCard
                  key={product.GS3_PK}
                  product={product}
                  onEdit={handleEditProduct} 
                  onDelete={handleProductDeleted}
                />
              ))}
            </Box>
          </Box>
        );
      case 'Cajas Sorpresa':
        return (
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              Cajas Sorpresa
            </Typography>
            <Typography paragraph>
              Crea y administra ofertas de cajas sorpresa, establece los contenidos y determina los precios de estos paquetes especiales!
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
          backgroundColor: '#4C956C',
        }}
      >
        <Box
          sx={{
            bgcolor: '#4C956C',
            height: '80px',
            width: '100%', 
            top: 0, 
            left: 0,
            p: 0, 
            overflow: 'hidden',
            position: 'fixed', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 1000 
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            display="left"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <img src={Logo2} alt="Logo" style={{ height: '50px' }} /> 
        </Box>
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
            keepMounted: true,
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

        {editModalOpen && (
          <EditProduct
            open={editModalOpen}
            handleClose={handleEditModalClose}
            productId={currentProductId}
            onUpdateProduct={handleUpdateProduct} 
          />
        )}

        {createModalOpen && (
          <CreateProduct
            open={createModalOpen}
            handleClose={handleCreateModalClose} 
          />
        )}

        {editBusinessModalOpen && (
          <EditBusiness
            open={editBusinessModalOpen}
            handleClose={handleEditBusinessModalClose} 
          />
        )}
      </Box>
    </Box>
  );
}
