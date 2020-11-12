import { useState, useEffect, } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}
    
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
            return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
}

export default function SongTable({songs}) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = songs;
    
    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
            container: {
            maxHeight: 440,
        },
    });

    let data = songs

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };    
    
    return (
        <Paper className={classes.root}>
            <Grid container spacing={2} justify="flex-end">
                <Grid item>
                    <Button href="/" variant="contained" color="primary">
                    Home
                    </Button>
                </Grid>
            </Grid>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {Object.keys(data[0]).map((item,index) => (
                                <TableCell
                                    key={item.index}
                                    align={"center"}
                                    style={{ minWidth: '10em' }}
                                >
                                {item}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                            <TableRow 
                                hover 
                                role="checkbox" 
                                tabIndex={-1} 
                                key={row.code}
                            >
                            {Object.keys(row).map((column) => {
                                const value = row['name'];
                                return (
                                    <TableCell 
                                        key={column.name} 
                                        align={"center"}
                                        style={{ minWidth: '10em' }}
                                    >
                                        {row[column]}
                                    </TableCell>
                                );
                            })} 
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            /> 
        </Paper>
    )
};
