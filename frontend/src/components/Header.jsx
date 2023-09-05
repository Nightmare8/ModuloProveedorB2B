import { ColorModeContext, tokens } from "../theme";
import { Box, IconButton, Typography, useTheme } from '@mui/material';

function Header({title, subTitle}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='flex-start'
        >
            <Typography variant="h2" color={colors.grey[100]} fontWeight='bold'>
                {title}
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[400]}>
                {subTitle}
            </Typography>
        </Box>
    )
}

export default Header