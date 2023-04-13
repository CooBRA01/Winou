import React from 'react'
import { makeStyles } from '@material-ui/core/styles' ;
import travel from './travel.jpg';
import { CssBaseline } from '@material-ui/core';
import Header from './Header';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh' ,
    backgroundImage : 'url('+travel+')' ,
    
  }
}) );

export default function Welcome () {
  const classes = useStyles();

  return(
    <div className={classes.root} >
       <CssBaseline/>
       <Header/>
    </div>
  )
}