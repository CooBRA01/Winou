import React , {useEffect ,useState  } from 'react';
import { CssBaseline , Grid } from '@material-ui/core';


import Map from './components/Map/Map';
import Header from './components/Header/Header';
import List from './components/List/List';

import {getPlacesData , getWeatherData} from './api';         


const Site = () => {

  const [places , setPlaces ] = useState([]);
  const [coords , setCoords] = useState({});
  const [bounds, setBounds] = useState({}) ;
  const [weatherData, setWeatherData] = useState([]) ;

  const [ type , setType ] = useState('restaurants');
  const [ rating , setRating ] = useState('');
  const [filteredPlaces,setFilteredPlaces] = useState([]);

  const [childClicked , setChildClicked] = useState(null);
  /* simpler alternative  of useContext and redux */

  const [ isloading ,setIsLoading ] = useState(false);

 

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}}) => {
      setCoords({lat:latitude,lng:longitude});
    })
  },[])

  useEffect(() => {
    
    setFilteredPlaces((filteredPlaces) => places.filter((place) => place?.rating > rating ) )

  },[rating] )

  useEffect(() => {
   
    if(bounds.sw && bounds.ne){
      setIsLoading(true);
      getWeatherData(coords.lat , coords.lng)
         .then((data) => setWeatherData(data) );
         
      getPlacesData(type ,bounds.sw,bounds.ne)
          .then((data) => {
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0 ));
            setFilteredPlaces([]);
            setIsLoading(false);
          })
    }

  },[type ,bounds])
 
  /*keep upd cords +-zoom */
   
  

  return <>
         
             <CssBaseline/>
             <Header  setCoords={setCoords}/>
             <Grid container spacing={3} style={{width : '100%'}}>
               <Grid item xs={12} md={4} >
                 <List 
                  places={filteredPlaces.length ? filteredPlaces : places }
                  childClicked={childClicked}
                  isloading={isloading}
                  type={type}
                  setType={setType}
                  rating={rating}
                  setRating={setRating}
                 />
               </Grid>
               <Grid item xs={12} md={8} >
                 <Map
                      setCoords={setCoords}
                      setBounds={setBounds}
                      coords={coords}
                      places={filteredPlaces.length ? filteredPlaces : places }
                      setChildClicked={setChildClicked}
                      weatherData={weatherData}
                 />
               </Grid>
               
             </Grid>
             
        </>;
};

export default Site;






 