import Header from "../../components/Header";
import { Box, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { ColorModeContext, tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
import ImageUser from '../../assets/images/user.svg';
import {companyRoutes} from '../../api/config.js';
import { useState, useEffect } from "react";
//MUI
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';


const StyledCard = ({name, email, image}) => {
    return (
        <Card sx={{ maxWidth: 345, width: '100%' }}>
            <CardHeader
                title={name}
                subheader={email} />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Paella dish" />
        </Card>
    )
}

function Users({companyDats, setCoompanyDats}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [users, setUsers] = useState([]);
    console.log("companyRoutes", companyRoutes)
    console.log("companyDats", companyDats)
    useEffect(() => {
        fetch(companyRoutes.getUserCompany, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rut: companyDats.rut,
            })
        }).
        then(response => response.json()).
        then(data => {
            console.log("data", data)
            setUsers(data);
        }).
        catch(error => console.log(error));
    }, [])
    
    return (
        <Box
            sx = {{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'start',
            }}
        >
            <Box
                display={'flex'}
                justifyContent={'space-between'}
            >
                <Header title='Usuarios' subTitle={'De Empresa'}  />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx = {{
                        backgroundColor: theme.palette.button.main,
                        height: '50%',
                    }}
                >
                    Agregar Nuevo Usuario
                </Button>
            </Box>
            <Box>
                {/* Table of Cards*/}
                {users.map((user, index) => {
                    return (
                        <StyledCard
                            key={index}
                            name={user.name}
                            email={user.email}
                            image={ImageUser}
                        />
                    )
                })}
            </Box>
        </Box>
    )
}

export default Users