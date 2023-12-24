import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps {
    size?: number;
}

const Loader: React.FC<LoaderProps> = ({ size = 40 }) => {
    return (
        <div className='loader'>
            <CircularProgress size={size} />
        </div>
    );
};

export default Loader;