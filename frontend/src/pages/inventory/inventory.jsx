import { useState } from 'react';
import React from 'react';
import Header from '../../components/Header'
import { ColorModeContext, tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
import { Box, Button, Stack } from '@mui/material';
//Icons
import AddBoxIcon from '@mui/icons-material/AddBox';
//Components MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
//Icons
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import AddDialog from './addDialog';

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'sku',
        numeric: false,
        label: 'SKU',
    },
    {
        id: 'nombre',
        numeric: false,
        label: 'Nombre',
    }, {
        id: 'categoria',
        numeric: false,
        label: 'Categoría',
    }, {
        id: 'stock',
        numeric: false,
        label: 'Stock',
    }, {
        id: 'precio',
        numeric: false,
        label: 'Precio',
    }, {
        id: 'costo',
        numeric: false,
        label: 'Costo',
    }, {
        id: 'proveedor',
        numeric: false,
        label: 'Proveedor',
    },
]

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h4"
                    id="tableTitle"
                    component="div"
                >
                    Productos
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function Inventory() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    //Table 
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('precio');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // const visibleRows = React.useMemo(() =>
    //     stableSort(rows, getComparator(order, orderBy)).slice(
        //         page * rowsPerPage,
        //         page * rowsPerPage + rowsPerPage
        //     ),
        //     [order, orderBy, page, rowsPerPage]
        // )
    //Form Dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'start',
                width: '100%',
            }}
        >
            <Box
                display={'flex'}
                justifyContent={'space-between'}
            >
                {/* Agregar producto */}
                <Header title='Inventario' subTitle={'De Empresa'} />
                <Stack direction={'row'} spacing={2}>
                    <Button
                        variant="contained"
                        startIcon={<AddBoxIcon />}
                        onClick={handleClickOpen}
                        sx={{
                            backgroundColor: theme.palette.button.main,
                            height: '50%',
                        }}
                    >
                        Agregar Producto
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddBoxIcon />}
                        onClick={handleClickOpen}
                        sx={{
                            backgroundColor: theme.palette.button.main,
                            height: '50%',
                        }}
                    >
                        Toma de Inventario
                    </Button>

                </Stack>
                <AddDialog open={open} handleClose={handleClose} />
            </Box>
            {/* Listado Inventario */}
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                paddingTop={1}
                width={'100%'}
            >
                <Paper
                    sx={{
                        width: '100%',
                        mb: 2
                    }}
                >
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >

                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Box>
    )
}

export default Inventory