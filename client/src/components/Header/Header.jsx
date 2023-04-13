import React , {useState} from 'react';
import { Autocomplete } from '@react-google-maps/api' ;
import { AppBar,Toolbar, Typography , InputBase,Box, Button, Avatar  } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode' ;






import useStyles from './styles' ;






const Header = ({setCoords}) => {
  const classes = useStyles();
  const [autocomplete , setAutocomplete] =  useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const dc = jwt_decode(token)  
  

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoords({lat,lng});

  }

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    navigate('/login')


  }

 

  

 
  return (
     <AppBar position='static'>
       
       <Toolbar className={classes.toolbar}>
       
         <Typography variant='h5' className={classes.title} >
          VGuide
          
         </Typography>
         <Box display="flex">
           <Typography variant='h6' className={classes.title}>
            Pick a place
           </Typography>
           <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} >
             <div className={classes.search}>
               <div className={classes.searchIcon}>
                  <SearchIcon/>
               </div>
               <InputBase placeholder='Search places' classes={{root:classes.inputRoot , input:classes.inputInput}}/>
             </div>
           </Autocomplete>
           <Button variant="contained" style={{backgroundColor:'#003366' , color : '#ffff'}}
                   onClick={handleLogout}
                 >LogOut
            </Button>
            &nbsp; &nbsp; &nbsp; 

          <Avatar style={{ backgroundColor:'purple' }}  >{dc.name[0].toUpperCase() }</Avatar>
          
         </Box>
       </Toolbar>
     </AppBar>
  )
};

export default Header;
