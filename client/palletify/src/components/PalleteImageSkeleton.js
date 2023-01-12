import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function PalleteImageSkeleton() {
    return (
        <Skeleton width='100%' sx={{ height: 400 }} animation='wave' variant='rectangular' />
    );
}
