import { Alert, AlertTitle } from "@mui/material"
import { useNavigate } from "react-router-dom"

function AlertCompany() {
    const navigate = useNavigate()
    return (
        <Alert  variant='filled' severity='error'
        onClick={() => navigate('/company')}
        >
        <AlertTitle>
            Error
        </AlertTitle>
        You need to create a <strong>company first</strong>
        </Alert>
    )
}

export default AlertCompany