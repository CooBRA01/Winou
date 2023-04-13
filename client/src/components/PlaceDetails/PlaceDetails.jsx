import React from 'react';
import { Box , Typography , Button , Card , CardContent , CardActions , Chip, CardMedia } from '@material-ui/core' ;
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone' ;
import  Rating  from '@material-ui/lab/Rating';

import useStyles from './styles' ;

const PlaceDetails = ({place , selected , refProp}) => {
  const classes = useStyles();

  if(selected)  refProp?.current?.scrollIntoView({behavoir: 'smooth' , block: 'start'});
  
  
  function as (r){
    let bl = "price_level" in r;
    let kl = "ranking" in r ;
    if((!bl || r.price_level==='') &&(!kl || r.ranking==='') ){
        return true ;
    }
}

  return (
    <Card elevation={6} style={{backgroundColor:"#00cc00"}}>
    <CardMedia
        style={{height:350}}
        image={place.photo ? place.photo.images.large.url:'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" >{place.name}</Typography>
          
          <Box display="flex" justifyContent="space-between" >
          <Rating  value={Number(place.rating)} readOnly />
            <Typography gutterBottom variant="subtitle1">Out of {place.num_reviews} reviews </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" >
            <Typography variant="subtitle1">Price</Typography>
            <Typography gutterBottom variant="subtitle1">{ as(place)  ? 'Not Available' : place.price_level }</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" >
            <Typography variant="subtitle1">Ranking</Typography>
            <Typography gutterBottom variant="subtitle1">{ as(place)  ? 'Not Available' : place.ranking }</Typography>
          </Box>
          {place?.awards?.map((award) => (
            <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
                <img src={award.images.small} alt={award.display_name}/>
                <Typography variant="subtitle2" color="textSecondary" >{award.display_name}</Typography>
            </Box>
          ))}
          {place?.cuisine?.map(({name}) => (
            <Chip key={name} size="small"  label={name} className={classes.chip} />
          ))}
          {place?.adress && (
            <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle} >
               <LocationOnIcon/> {place.adress}
            </Typography>
          )}
          {place?.phone && (
            <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.spacing} >
               <PhoneIcon/> {place.phone}
            </Typography>
          )}
          <CardActions>
            <Button size="small"  onClick={() => window.open(place.web_url,'_blank')} >
               TripAdvisor
            </Button>
            <Button size="small"  onClick={() => window.open(place.website,'_blank')} >
               WebSite
            </Button>
          </CardActions>
        </CardContent>
 </Card>
  );
};

export default PlaceDetails;

