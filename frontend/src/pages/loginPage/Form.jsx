import { useState } from "react"
import { 
    Box, 
    Button,
    Stack,
    TextField,
    Typography,  
    colors,
    Alert,
} from "@mui/material"
import { tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
//Routes
import { userRoutes } from "../../api/config.js";
import { setLogin } from "../../state/slices/authSlice.js";
const initialValuesLogin = {
    email: "",
    password: "",
};

const initialValuesRegister = {
    name: '',
    email: "",
    password: "",
};

//This section is for validation
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),  
  password: yup.string().required("Required"),
});

const registerSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});


function Form() {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(setLogin)
  let isLogin = pageType === "login";
  let isRegister = pageType === "register";
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const changePageType = () => {
    setPageType(isLogin ? "register" : "login");
    isLogin = pageType === "login";
    isRegister = pageType === "register";
  }

  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(userRoutes.register, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
    console.log("resultado del registro", savedUser);
    if (!savedUser.error){
      setPageType("login");
      setAlertMessage("El usuario se pudo registrar correctamente");
      setAlertSeverity("success");
    } else{
      setAlertMessage("Email ya en uso");
      setAlertSeverity("error");
    }
  }

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(userRoutes.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    console.log("resultado del logeo", loggedIn);
    onSubmitProps.resetForm();
    
    if (!loggedIn.error){
      console.log("entra en esta seccion");
      await dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      setAlertMessage("Ingreso exitoso");
      setAlertSeverity("success");
      if (loggedIn.user.company === undefined){
        navigate("/start");
      } else{
        navigate("/home");
      }
    } else{
      setAlertMessage("Credenciales incorrectas");
      setAlertSeverity("error");
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("entro aca para manejar el form");
    if (isLogin) {
      await login(values, onSubmitProps);
    }
    console.log(isRegister)
    if (isRegister) {
      await register(values, onSubmitProps);
    }
  }
  return (
    <>
      <Typography variant="h4" fontWeight={'bold'} color={colors.blueAccent[100]} >
        {isLogin ? "Ingresa para continuar" : "Registrate para continuar"}
      </Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm
        }) => (
          <form onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5%',
            }}
          >
            {alertMessage && (
              <Stack
                sx = {{
                  width: '30%',
                  marginBottom: '1%',
                }}
                spacing={2}
              >
                <Alert severity={alertSeverity}>{alertMessage}</Alert>
              </Stack>
            )}
            <Box
              sx = {{
                width: '80%',
              }}
            >
              <Box>
                <Stack spacing={2} >
                  {isRegister && (
                    <TextField
                      label="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      error={
                        Boolean(touched.firstName) && Boolean(errors.firstName)
                      }
                      helperText={touched.firstName && errors.firstName}
                    />
                  )}
                  <TextField 
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField 
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Stack>
              </Box>
              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx = {{
                    marginTop: '2%',
                    backgroundColor: theme.palette.button.main,
                    color: '#FFFF',
                    "&:hover": {
                      backgroundColor: theme.palette.button.hover,
                    }
                  }}
                >
                  {isLogin ? "Ingresar" : "Registrarse"}
                </Button>
                <Typography
                  onClick={() => {
                    changePageType();
                    resetForm();
                  }}
                  sx = {{
                    textDecoration: 'underline',
                    color: colors.greenAccent[300],
                    "&:hover": {
                      color: colors.greenAccent[400],
                      cursor: 'pointer',
                    }
                  }}
                >
                  {isLogin
                    ? "¿No tienes una cuenta? ¡Registrate!"
                    : "¿Ya tienes una cuenta?"
                  }
                </Typography>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Form