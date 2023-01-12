import React from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function PalleteColors({ colors }) {
    return (
        <Stack direction='row' justifyContent='center' sx={{
            wordBreak: 'break-all'
        }} spacing={2}>
            {colors.map((el) => (
                <Typography key={el} sx={{ color: '#' + el }}>
                    #{el}
                </Typography>
            ))}
        </Stack>
    );
}
