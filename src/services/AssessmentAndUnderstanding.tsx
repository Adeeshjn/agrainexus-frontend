import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Paper, Grid, Typography, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import GrassIcon from '@mui/icons-material/Grass';
import { API_URLS } from "../constants/static";
import postApi from "../api/PostApi";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

interface FarmData {
    location: string;
    crops: string[];
    areaValue: number;
    areaUnit: string;
    userId: number;
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
    const [isLoading, setIsLoading] = useState(false);
    const formRef: any = useRef(null)
    const [farmData, setFarmData] = useState<FarmData>({
        location: "",
        crops: [],
        areaValue: 0,
        areaUnit: "acres",
        userId: 0
    });

    let token: any = localStorage.getItem("token");
    let decodedToken: any = jwtDecode(token);


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const currentLocation = `Latitude: ${latitude}, Longitude: ${longitude}`;
                    setFarmData({ ...farmData, location: currentLocation });
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser.');
        }
    }, []);

    const handleAddFarm = async (e: React.FormEvent) => {
        e.preventDefault()
        const isFormValid = formRef.current.checkValidity();
        if (isFormValid) {
            const item = {
                location: farmData.location,
                crops: farmData.crops.join(','),
                Area: farmData.areaValue.toString(),
                areaUnit: farmData.areaUnit,
                userId: decodedToken.Id
            };
            const body = {
                Url: `${API_URLS.addFarm}`,
                body: JSON.stringify(item),
                isAuth: true,
            };
            try {
                let response: any = await postApi(body, setIsLoading);
                if (response.status === 200 || response.status === 201 || response.status === 204) {
                    setFarmData({
                        location: "",
                        crops: [],
                        areaValue: 0,
                        areaUnit: "acres",
                        userId: 0
                    });
                    toast.success("Farm Added Successfully", { position: toast.POSITION.TOP_CENTER });
                } else {
                    // Handle other response statuses or show an appropriate error message.
                    toast.error("Farm Adding Failed", { position: toast.POSITION.TOP_CENTER });
                }
            } catch (error) {
                console.error("Error adding farm:", error);
                toast.error("Farm Adding Failed", { position: toast.POSITION.TOP_CENTER });
            }
        }
    };

    const handleAreaValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <form ref={formRef} onSubmit={handleAddFarm}>
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
                            onChange={(e) => setFarmData({ ...farmData, crops: e.target.value.split('\n').map(line => line.trim()) })} // Trim each line
                            required // Add required attribute for validation
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
                            type="submit"
                        >
                            Add Farm
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}
