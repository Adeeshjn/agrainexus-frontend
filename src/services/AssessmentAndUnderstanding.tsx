import React from "react";
import { TextField, Button, Paper, Grid, Typography } from "@mui/material";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import GrassIcon from '@mui/icons-material/Grass';
import HeightIcon from '@mui/icons-material/Height';

const formContainerStyle = {
    width: "300px", // Adjust the width as per your preference
    margin: "20px auto", // Add margin-top to push it down
    padding: "20px",
};

const buttonStyle = {
    marginTop: "20px",
};

export default function AssessmentAndUnderstanding() {
    return (
        <Paper elevation={3} style={formContainerStyle}>
            <Typography variant="h5" align="center" style={{ marginBottom: '5px' }}>
                Farm Information
            </Typography>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="location-of-farm"
                            label="Location of Farm"
                            placeholder="Location of Farm"
                            variant="outlined"
                            InputProps={{
                                style: {
                                    fontSize: '16px', // Set your desired font size here
                                },
                                endAdornment: (
                                    <AddLocationIcon />
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="crops-grown"
                            label="Crops Grown in the Farm"
                            placeholder="Enter 1 crop per line"
                            multiline
                            variant="outlined"
                            InputProps={{
                                style: {
                                    fontSize: '16px', // Set your desired font size here
                                },
                                endAdornment: (
                                    <GrassIcon />
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="area-of-farm"
                            label="Area of the Farm"
                            placeholder="Area of the Farm"
                            variant="outlined"
                            InputProps={{
                                style: {
                                    fontSize: '16px', // Set your desired font size here
                                },
                                endAdornment: (
                                    <HeightIcon style={{ transform: 'rotate(90deg)' }} />
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={buttonStyle}
                            onClick={() => {
                                // Handle the "Add Farm" button click here
                            }}
                        >
                            Add Farm
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}
