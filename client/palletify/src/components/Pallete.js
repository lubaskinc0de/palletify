import React, { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';

import PalleteImage from './PalleteImage';
import PalleteColors from './PalleteColors';
import PalleteImageSkeleton from './PalleteImageSkeleton';
import PalleteColorsSkeleton from './PalleteColorsSkeleton';

import { getPalleteImage } from '../api';
import { b64toBlob } from '../lib';

import LoadingButton from '@mui/lab/LoadingButton';

export default function Pallete() {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [colors, setColors] = useState([]);

    const fetchImage = () => {
        setLoading(true);
        getPalleteImage()
            .then((response) => {
                response.json().then((data) => {
                    const b64Blob = b64toBlob(data.image);
                    const imageUrl = URL.createObjectURL(b64Blob);

                    setImage(imageUrl);
                    setColors(data.colors);
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchImage();
    }, []);
    return (
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
    );
}
