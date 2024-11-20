import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';

// The filter dialog with multiple options
function FilterDialog(props) {
    const { onClose, open, onApply, selectedFilters, setSelectedFilters } = props;

    // Handle applying the filters
    const handleApply = () => {
        onApply(selectedFilters);
        onClose();
    };

    // Handle filter change
    const handleFilterChange = (event) => {
        const { name, value, checked, type } = event.target;
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handle clearing all filters
    const handleClearFilters = () => {
        setSelectedFilters({});
    };

    return (
        <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
            <Typography variant="h4" font-weight='bold' sx={{ color: '#444444', mb: 0, mt: 2, ml: 3, mr: 1 }}>
                Filtros de Búsqueda
            </Typography>
            <DialogContent>

                {/* Distancia Form */}
                <FormControl component="fieldset" sx={{ mt: 1, ml: 2 }}>
                    <Typography variant="h5" font-weight='bold' sx={{ color: '#4C956C', mb: 1 }}>
                        Distancia
                    </Typography>
                    <RadioGroup
                        name="distance"
                        value={selectedFilters.distance || ''}
                        onChange={handleFilterChange}
                    >
                        <FormControlLabel value="5km" control={<Radio />} label="A menos de 5km" />
                        <FormControlLabel value="10km" control={<Radio />} label="A menos de 10km" />
                        <FormControlLabel value="20km" control={<Radio />} label="A menos de 20km" />
                    </RadioGroup>
                </FormControl>

                {/* Rango de Precio Form */}
                <FormControl component="fieldset" sx={{ mt: 1, ml: 1 }}>
                    <Typography variant="h5" font-weight='bold' sx={{ color: '#4C956C', mb: 1 }}>
                        Rango de Precio
                    </Typography>
                    <RadioGroup
                        name="price"
                        value={selectedFilters.price || ''}
                        onChange={handleFilterChange}
                    >
                        <FormControlLabel value="low" control={<Radio />} label="Bajo" />
                        <FormControlLabel value="medium" control={<Radio />} label="Medio" />
                        <FormControlLabel value="high" control={<Radio />} label="Alto" />
                    </RadioGroup>
                </FormControl>

                {/* Limpiar Filtros 
                <Button
                    onClick={handleClearFilters}
                    color="secondary"
                    variant="outlined"
                    sx={{
                        mt: 2,
                        ml: 2,
                        borderColor: '#FF6F61',
                        color: '#FF6F61',
                        '&:hover': {
                            backgroundColor: '#FFEBE9',
                        },
                    }}
                >
                    Limpiar Filtros
                </Button>
                */}

            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClearFilters}
                    color="secondary"
                    variant="outlined"
                    sx={{
                        mt: 0,
                        mr: 1,
                        borderColor: '#FF6F61',
                        color: '#FF6F61',
                        '&:hover': {
                            backgroundColor: '#FFEBE9',
                        },
                    }}
                >
                    Limpiar Filtros
                </Button>
                <Button
                    onClick={handleApply}
                    color="primary"
                    variant="contained"
                    sx={{ backgroundColor: '#4C956C', '&:hover': { backgroundColor: '#4C956C' } }}
                >
                    Aplicar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

FilterDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onApply: PropTypes.func.isRequired,
    selectedFilters: PropTypes.object.isRequired,
    setSelectedFilters: PropTypes.func.isRequired,
};

export default FilterDialog;
