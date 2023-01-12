import React from 'react';

import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';

export default function Pallete({ img }) {
    return (
        <Card sx={{ maxWidth: 600 }}>
            <CardMedia
                component='img'
                sx={{ height: 400 }}
                image={img}
                title='pallete'
            />
        </Card>
    );
}
