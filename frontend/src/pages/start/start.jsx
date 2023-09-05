import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import FormDialog from '../company/formDialog';
import { useState } from 'react';
function Start() {

    const [open, setOpen] = useState(true);
    
    const handleClose = () => {
        setOpen(false);
        
    }
    
    return (
        <FormDialog open={open} handleClose={handleClose}  />
    )
}

export default Start