import React from 'react'
import { makeStyles } from '@material-ui/core/styles' ;
import { AppBar , Button, Toolbar } from '@material-ui/core';
import { Stack } from '@mui/material';
import {useNavigate } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems : 'center' ,
        height: '100vh',
        fontFamily: 'Nunito'
    },
    appbar: {
        background: 'none' ,
        
    } ,
    title:{
        color: '#fff' ,
        fontSize: '4rem'
    },
    button: {
        color: '#fff',
        fontSize: '2rem',
    },
    appbarTitle: {
        flexGrow: '1'
    },
    appbarWrapper:{
        width: '80%',
        margin: '0 auto'
    },
     colorText:{
         color: '#5AFF3D',
     },
     container:{
         textAlign: 'center'
     }
  
}) );

export default function Header () {
  const classes = useStyles();
  const navigate = useNavigate()

  const handleLogin = (e) => {
      e.preventDefault();
         navigate('/login')

  }

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/register')

}

  return(
    <div className={classes.root} >
        <AppBar className={classes.appbar} elevation={0} >
          <Toolbar className={classes.appbarWrapper} >
            <h1 className={classes.appbarTitle} >V<span className={classes.colorText} >Guide.</span></h1>
            
            <Stack spacing={2} direction="row">
      
                <Button variant="contained" style={{backgroundColor:'#003366' , color:'white'}}
                   onClick={handleRegister}
                 >Register</Button>
                 <Button variant="outlined"  style={{backgroundColor:'#5AFF3D'}}
                     onClick={handleLogin}
                   >Login</Button>
           </Stack>
            
          </Toolbar>
        </AppBar>
        <div className={classes.container} >
            <h1 className={classes.title} >  
                Welcome to <br/> Your <span className={classes.colorText} >Virtual Guide</span>
            </h1>
        </div>
      
    </div>
  )
}
