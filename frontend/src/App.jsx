import './App.css'
import { useEffect, useState } from 'react';
//Components
import { CssBaseline, ThemeProvider, Alert, AlertTitle } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage/index.jsx';
import Topbar from './pages/global/Topbar.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Faq from './pages/faq/faq.jsx';
import Geography from './pages/geography/geography.jsx';
import Team from './pages/team/team.jsx';
import Catalog from './pages/catalog/catalog.jsx';
import Registers from './pages/registers/registers.jsx';
import Inventory from './pages/inventory/inventory.jsx';
import Company from './pages/company/company.jsx';
import AlertCompany from './components/AlertCompany.jsx';
import Start from './pages/start/start.jsx';
//Redux
import { useSelector } from "react-redux";



function App() {
  const [theme, colorMode] = useMode();
  const user = useSelector((state) => state.auth.user);
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  console.log("user", user)
  console.log("isAuth", isAuth)
  useEffect(() => {
    console.log("el valor del estado ha cambiado")
    console.log("isAuth", isAuth)
  },[isAuth])
  return (
    <ColorModeContext.Provider value={colorMode}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            
            {isAuth && <Topbar/>}
            <main className='content'>
              <Routes>
                <Route path='/' element={isAuth ? <Navigate to='/home'/> : <LoginPage/>}/>
                <Route path='/start' element = {isAuth ? <Start/> : <Navigate to='/'/>}/>
                <Route path='/home' 
                element={isAuth ? <Dashboard/> : <Navigate to='/'/>}
                />
                <Route path='/catalog' element={<Catalog/>}/>
                <Route path='/register' element={<Registers/>}/>
                <Route path='/inventory' element={<Inventory/>}/>
                <Route path='/team' element={<Team/>}/>   
                <Route path='/company' element={<Company />}/>
                <Route path='/faq' element={<Faq/>}/>
                <Route path='/geography' element={<Geography/>}/>
                <Route path='*' element={<Navigate to='/'/>}/>
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </ColorModeContext.Provider>
  )
}

export default App
