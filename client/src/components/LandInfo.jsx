import icon from '../img/icon2.png';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Profile from './Profile';


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));


function LandInfo(building) {
  const classes = useStyles();

  if (!building.building) {
    return (
      <div
        className="content-box"
        style={{ flexGrow: 1, flexBasis: "0%" }}
      >
        <div>Land Information</div>

      </div>)
  }
  const location = building.building.geometry.coordinates[0].map(x => [x[1], x[0]])[0]
  console.log('building data is', building);
  return (
    // <div
    //   className="content-box card"
    //   style={{ flexGrow: 1, flexBasis: "0%"}}
    // >
    //   {/* <img src={icon} width={'50%'} /> */}
    //   <h1>Rooftop Information</h1>
    //   <p>Location: {location[0]}, {location[1]}</p>
    //   <p>Rooftop Size:</p>
    //   <p>Preferred plants and produce:</p>

    //   <button>Register your interest</button>

    // </div>
    <React.Fragment>
      <Grid container component="main" className={classes.root}>
        <div className={classes.paper}>
          <Profile building={building}/>
        </div>
      </Grid>
    </React.Fragment>

  )

}

export default LandInfo;