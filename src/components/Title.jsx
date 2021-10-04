import React from 'react'
import {
    Box,
    Typography,
    useTheme,
    useMediaQuery,
} from '@material-ui/core'
import HeaderDivider from './HeaderDivider';

export default function Title({title, includeDivider,className, align='center'}) {
    const theme = useTheme();
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Box pt={2} className={className}>
            <Typography color='textPrimary' variant={mobileDevice?'h5':'h4'} align={align}>
            {title}
            </Typography>
            {includeDivider&&<HeaderDivider />}
        </Box>
    )
}
