import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

import logo from "../img/icon2.png"

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    profileImage: {
        width: "50%",
        borderRadius: "100%"
    },
    content: {
        justifyContent: "left",
        textAlign: "left"
    },
    details: {
        marginTop: "-20px"
    },
    chip: {
        padding: "0 5px",
        margin: "2px 5px"
    },
    about: {
        margin: "10px 0",
        alignItems: "left",
        textAlign: "left"
    }
}));

export default function Profile(building) {
    console.log('building infor in profile is', building)
    const classes = useStyles();
    if (!building.building.building) {
        return <div>Loading</div>
    }
    const location = building.building.building.geometry.coordinates[0].map(x => [x[1], x[0]])[0]

    return (
        <React.Fragment>
            <div container>
                <img
                    className={classes.profileImage}
                    alt="Robert"
                    src={logo}
                />
                <div className={classes.content}>
                    <Typography component="h1" variant="h4">
                        Rooftop Information
                    </Typography>

                    <div className={classes.about}>
                        <Typography component="h3" variant="h6">
                            Preferred Plants and Produce:
                        </Typography>
                    </div>
                    <div>
                        <Chip
                            className={classes.chip}
                            color="success"
                            label="Strawberry"
                            size="small"
                        />
                        <Chip
                            className={classes.chip}
                            color="success"
                            label="Cherry"
                            size="small"
                        />
                        <Chip
                            className={classes.chip}
                            color="success"
                            label="Cabbage"
                            size="small"
                        />
                        <Chip
                            className={classes.chip}
                            color="success"
                            label="Lettuce"
                            size="small"
                        />
                        <Chip
                            className={classes.chip}
                            color="success"
                            label="Onion"
                            size="small"
                        />
                        <Chip
                            className={classes.chip}
                            color="success"
                            label="Potato"
                            size="small"
                        />
                    </div>
                    <div className={classes.about}>
                        <Typography component="h3" variant="h6">
                            Location:
                        </Typography>
                        <p>
                            {location[0]}, {location[1]}
                        </p>
                    </div>
                    <div className={classes.about}>
                        <Typography component="h3" variant="h6">
                            About the rooftop:
                        </Typography>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>
                </div>
                <Button variant="outlined" color="primary" fullWidth>
                    Message
                </Button>
            </div>
        </React.Fragment>
    );
}
