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
    Checkbox,
    Typography
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

    return (
        <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
            <DialogTitle>Filtros de Búsqueda</DialogTitle>
            <DialogContent>

                {/* Distancia Form */}
                <FormControl component="fieldset" sx={{ mt: 1, ml: 2 }}>
                    <FormLabel component="legend">Distancia</FormLabel>
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
                <FormControl component="fieldset" sx={{ mt: 1, ml: 2 }}>
                    <FormLabel component="legend">Rango de Precio</FormLabel>
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

                {/* Tipos de Comidas Form */}
                <FormControl component="fieldset" sx={{ mt: 1, ml: 2 }}>
                    <FormLabel component="legend">Tipos de Comidas</FormLabel>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="italian"
                                checked={selectedFilters.italian || false}
                                onChange={handleFilterChange}
                            />
                        }
                        label="Italiana"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="mexican"
                                checked={selectedFilters.mexican || false}
                                onChange={handleFilterChange}
                            />
                        }
                        label="Mexicana"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="chinese"
                                checked={selectedFilters.chinese || false}
                                onChange={handleFilterChange}
                            />
                        }
                        label="China"
                    />
                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color="primary"
                    sx={{ color: 'black' }}
                >
                    Cancelar
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
