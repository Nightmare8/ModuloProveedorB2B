import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    'Tipo de Industria',
    'Datos Formales',
    'Datos Contacto',
    'Cantidad Empleados',
    'Tipos de productos',
    'Prioridades Compra'
];



function StepperStyled({ activeStep }) {

    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    )
}

export default StepperStyled