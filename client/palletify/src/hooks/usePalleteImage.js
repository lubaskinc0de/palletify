import { getPalleteImage } from '../api';
import { b64toBlob } from '../lib';

import { useEffect, useState } from 'react';

export const usePalleteImage = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [error, setError] = useState(false);
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
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchImage();
    }, []);

    return [loading, error, image, colors, fetchImage];
};
