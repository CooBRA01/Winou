import React from 'react'
import { makeStyles } from '@material-ui/core/styles' ;
import cat from './cat.jpg';
import { CssBaseline } from '@material-ui/core';
import { Link } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh' ,
    backgroundImage : 'url('+cat+')' ,
    display: 'flex',
        justifyContent: 'center',
        alignItems : 'center' ,
        height: '100vh',
        fontFamily: 'Nunito'
    
  },
  title:{
      color: '#fff' ,
      fontSize: '4rem'
  },
  container:{
      textAlign: 'center'
  }
}) );

export default function ErrorPage() {
  const classes = useStyles();

  return(
    <div className={classes.root} >
       <CssBaseline/>
       <div className={classes.container} >
         <h1 style={{color:'red',  fontSize: '4rem'}}>404</h1>
            <h1 className={classes.title}  > 
                       
                Oops it looks Like you've found my cat grab him an come back <br/> 
              <Link href="/" >
                    Home
                  </Link>
              
            </h1>
        </div>
       
    </div>
  )
}