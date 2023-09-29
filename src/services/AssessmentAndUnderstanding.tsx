import React, { useState } from "react";
import { TextField, Button, Paper, Grid, Typography, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import GrassIcon from '@mui/icons-material/Grass';
import HeightIcon from '@mui/icons-material/Height';

// Define an interface for the state variables
interface FarmData {
    location: string;
    crops: string[];
    areaValue: number;
    areaUnit: string;
}

const formContainerStyle = {
    width: "300px",
    margin: "20px auto",
    padding: "20px",
};

const buttonStyle = {
    marginTop: "20px",
};

const areaUnits = ["acres", "hectares", "square meters", "square feet", "square kilometers"];

export default function AssessmentAndUnderstanding() {
    // Use the FarmData interface for the state variable
    const [farmData, setFarmData] = useState<FarmData>({
        location: "",
        crops: [],
        areaValue: 0,
        areaUnit: "acres", // Default unit, you can set to an appropriate default
    });

    const handleAddFarm = () => {
        // Concatenate areaValue and areaUnit into a single string
        const farmLocation = `${farmData.location}`;
        const areaInfo = `${farmData.areaValue} ${farmData.areaUnit}`;

        console.log("Adding Farm:", {
            location: farmLocation,
            crops: farmData.crops, // No need to split, it's already an array
            areaValue: areaInfo, // Set the area info as a single string
        });

        setFarmData({
            location: "",
            crops: [],
            areaValue: 0,
            areaUnit: "acres", // Reset to default unit after adding
        });
    };

    const handleAreaValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Ensure the input is a valid number
        const numericValue = parseFloat(e.target.value);
        if (!isNaN(numericValue)) {
            setFarmData({ ...farmData, areaValue: numericValue });
        }
    };

    const handleAreaUnitChange = (e: SelectChangeEvent<string>) => {
        setFarmData({ ...farmData, areaUnit: e.target.value as string });
    };

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
                            value={farmData.location}
                            onChange={(e) => setFarmData({ ...farmData, location: e.target.value })}
                            InputProps={{
                                style: {
                                    fontSize: '16px',
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
                            value={farmData.crops.join('\n')}
                            onChange={(e) => setFarmData({ ...farmData, crops: e.target.value.split('\n') })}
                            InputProps={{
                                style: {
                                    fontSize: '16px',
                                },
                                endAdornment: (
                                    <GrassIcon />
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="area-value"
                            label="Area Value"
                            placeholder="Area Value"
                            variant="outlined"
                            type="number"
                            value={farmData.areaValue}
                            onChange={handleAreaValueChange}
                            InputProps={{
                                style: {
                                    fontSize: '16px',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            fullWidth
                            id="area-unit"
                            label="Area Unit"
                            placeholder="Area Units"
                            variant="outlined"
                            value={farmData.areaUnit}
                            onChange={handleAreaUnitChange}
                            style={{ fontSize: '16px' }}
                        >
                            {areaUnits.map((unit) => (
                                <MenuItem key={unit} value={unit}>
                                    {unit}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={buttonStyle}
                            onClick={handleAddFarm}
                        >
                            Add Farm
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}
