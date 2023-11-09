import { Button, CircularProgress, TablePagination } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import '../styles/table.css'

export default function Table(props: any) {
    const { page, setPage } = props
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState(false)

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const slicedData = props.rowdata.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    const onBtnClick = (val: any, id: any) => {
        props.onClick(val, id);
    };
    return (
        <div>
            <TablePagination
                component="div"
                count={props.rowdata.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="pagination-container"
                labelRowsPerPage=""
            />

            <div className='table-content'>
                <table className="table table-hover" style={{ textAlign: 'center' }}>
                    <thead className='thead-light'>
                        <tr className='table-success'>
                            {props.tableheader.map((header: any, index: any) => (
                                <th key={index} style={{ height: '50px' }}>
                                    {header.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {slicedData.length > 0 ? (
                            slicedData.map((item: any, index: any) => (
                                <tr key={index} style={{ height: '50px' }}>
                                    {props.tableheader.map((header: any, columnIndex: number) => (
                                        <td key={header.prop + item.teamId} style={{ width: columnIndex === 1 ? '10%' : 'auto' }}>
                                            {header.type === 'text' && item[header.prop]}
                                            {header.type === 'boolean' && (item[header.prop] ? 'Yes' : 'No')}
                                            {header.type === 'number' && item[header.prop]}
                                            {header.type === 'date' && moment(item[header.prop]).format('DD-MM-YYYY')}
                                            {header.type === 'button' && (
                                                <div>
                                                    <EditIcon fontSize='small' style={{cursor:'pointer'}} className='me-2' color='success' onClick={() => onBtnClick('update', item)} />
                                                    <DeleteIcon color="error" fontSize='small' style={{cursor:'pointer'}} onClick={() => onBtnClick('delete', item)} />
                                                    <Button startIcon={<QuestionMarkIcon />} onClick={() => onBtnClick('assess', item)}>
                                                        Assess
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={props.tableheader.length} style={{ color: 'red' }}>
                                    {props.isLoading ? (
                                        <CircularProgress size={40} />
                                    ) : (
                                        (!search && "No data found") || (search && "No search results found")
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
