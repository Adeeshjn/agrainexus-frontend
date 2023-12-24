import React, { useState } from 'react';
import {
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
} from '@mui/material';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import '../styles/table.css';

export default function CustomTable(props: any) {
    const { page, setPage } = props;
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    let numberOfEntries
    let slicedData
    if(props.rowdata === "Data Not Found") {
        slicedData = null;
        numberOfEntries = 0
    }
    else {
        slicedData = props.rowdata.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
        numberOfEntries = props.rowdata.length;
    }
    
    // console.log(slicedData)
    

    const onBtnClick = (val: any, id: any) => {
        props.onClick(val, id);
    };

    return (
        <div>
            <TablePagination
                component="div"
                count={numberOfEntries}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="pagination-container"
                labelRowsPerPage="Rows Per Page: "
            />
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead sx={{background:'darkgreen'}}>
                        <TableRow>
                            {props.tableheader.map((header: any, index: any) => (
                                <TableCell sx={{color: 'white'}} key={index} style={{ height: '50px' }}>
                                    {header.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slicedData != null ? (
                            slicedData.map((item: any, index: any) => (
                                <TableRow key={index} style={{ height: '50px' }}>
                                    {props.tableheader.map((header: any) => (
                                        <TableCell sx={{background: 'lightgreen'}} key={header.prop + item.teamId}>
                                            {header.type === 'text' && item[header.prop]}
                                            {header.type === 'boolean' && (item[header.prop] ? 'Yes' : 'No')}
                                            {header.type === 'number' && item[header.prop]}
                                            {header.type === 'date' && moment(item[header.prop]).format('DD-MM-YYYY')}
                                            {header.type === 'button' && (
                                                <div>
                                                    <EditIcon fontSize='small' style={{ cursor: 'pointer' }} className='me-2' color='success' onClick={() => onBtnClick('update', item)} />
                                                    <DeleteIcon color="error" fontSize='small' style={{ cursor: 'pointer' }} onClick={() => onBtnClick('delete', item)} />
                                                    <Button startIcon={<QuestionMarkIcon />} onClick={() => onBtnClick('assess', item)}>
                                                        Assess
                                                    </Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={props.tableheader.length} style={{ color: 'red' }}>
                                    {props.isLoading ? (
                                        <CircularProgress size={40} />
                                    ) : (
                                        'No Farm Data - Add your farms to view the data here.'
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
