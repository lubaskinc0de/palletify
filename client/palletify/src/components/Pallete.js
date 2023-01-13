import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import PalleteImage from './PalleteImage';
import PalleteColors from './PalleteColors';
import PalleteImageSkeleton from './PalleteImageSkeleton';
import PalleteColorsSkeleton from './PalleteColorsSkeleton';

import { usePalleteImage } from '../hooks/usePalleteImage';

import LoadingButton from '@mui/lab/LoadingButton';

export default function Pallete() {
    const [loading, error, image, colors, fetchImage] = usePalleteImage();

    return !error ? (
        <Stack width='100%' spacing={2}>
            {loading ? (
                <PalleteImageSkeleton></PalleteImageSkeleton>
            ) : (
                <PalleteImage img={image}></PalleteImage>
            )}
            {loading ? (
                <PalleteColorsSkeleton></PalleteColorsSkeleton>
            ) : (
                <PalleteColors colors={colors}></PalleteColors>
            )}
            <LoadingButton
                onClick={fetchImage}
                loading={loading}
                fullWidth
                variant='outlined'
            >
                Generate
            </LoadingButton>
        </Stack>
    ) : (
        <Typography variant='h3' color='red'>ERROR</Typography>
    );
}
