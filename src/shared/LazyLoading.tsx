import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader ({ size = 40 }) {
    return (
        <div className='loader'>
            <CircularProgress size={size} />
        </div>
    );
};