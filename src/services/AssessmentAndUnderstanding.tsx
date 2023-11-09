import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Paper, Grid, Typography, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import AbcIcon from '@mui/icons-material/Abc';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import GrassIcon from '@mui/icons-material/Grass';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { API_URLS } from "../constants/static";
import postApi from "../api/PostApi";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import GetApi from "../api/GetApi";
import Table from "../shared/Table";

// Import jspdf library
import jsPDF from 'jspdf';

interface FarmData {
    nickName: string;
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
    const formRef: any = useRef(null);
    const [rowData, setRowData] = useState<any[]>([]);
    const [click, setClick] = useState('');
    const [isUpdateFarmOpen, setIsUpdateFarmOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [farmData, setFarmData] = useState<FarmData>({
        nickName: "",
        location: "",
        crops: [],
        areaValue: 0,
        areaUnit: "acres",
        userId: 0
    });

    const tableHeader = [
        { title: 'Nick Name', type: 'text', prop: 'nickName', sort: false, filter: false, asc: false, des: false },
        { title: 'Location', type: 'text', prop: 'location', sort: false, filter: false, asc: false, des: false },
        { title: 'Crops', type: 'text', prop: 'crops', sort: false, filter: false, asc: false, des: false },
        { title: 'Area', type: 'text', prop: 'area', sort: false, filter: false, asc: false, des: false },
        { title: 'Action', type: 'button', prop: 'button', sort: false, filter: false, asc: false, des: false }
    ]

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
                        nickName: "",
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

    const getFarmDetailsByUserId = async () => {
        try {
            const response: any = await GetApi(`${API_URLS.getFarmDetailsByUserId}`)
            setRowData(response.data)
            setIsLoading(false)
        } catch (error) {
            toast.error("Error while fetching Farm Details", { position: toast.POSITION.TOP_CENTER })
        }
    }

    useEffect(() => {
        getFarmDetailsByUserId();
    }, []);

    const handleAreaValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = parseFloat(e.target.value);
        if (!isNaN(numericValue)) {
            setFarmData({ ...farmData, areaValue: numericValue });
        }
    };

    const handleAreaUnitChange = (e: SelectChangeEvent<string>) => {
        setFarmData({ ...farmData, areaUnit: e.target.value as string });
    };

    const handleUpdateFarmOpen = (item: any) => {
        // Implement update functionality
    }

    const handleDeleteFarmOpen = (item: any) => {
        // Implement delete functionality
    }

    const handleAssessFarm = (item: any) => {
        // Generate PDF and offer for download
        const pdf = new jsPDF();
        pdf.text(`Farm Nick Name: ${item.nickName}`, 10, 10);
        pdf.text(`Location: ${item.location}`, 10, 20);

        // Check if 'item.crops' is an array before calling 'join'
        if (Array.isArray(item.crops)) {
            pdf.text(`Crops: ${item.crops.join(', ')}`, 10, 30);
        } else {
            pdf.text(`Crops: ${item.crops}`, 10, 30); // Handle non-array value
        }

        pdf.text(`Area: ${item.areaValue} ${item.areaUnit}`, 10, 40);
        pdf.save(`Farm_Assessment_${item.nickName}.pdf`);
    }


    const handleClick = (value: string, item: any) => {
        setClick(value);
        switch (value) {
            case 'update':
                handleUpdateFarmOpen(item)
                break
            case 'delete':
                handleDeleteFarmOpen(item);
                break
            case 'assess':
                handleAssessFarm(item);
                break;
        }
    }

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: "20px" }}>
                <a href="http://localhost:3000" style={{ color: "black" }}>
                    <ArrowCircleLeftOutlinedIcon style={{ marginTop: "10px", marginLeft: "20px" }} fontSize="large" />
                </a>
                <Paper elevation={3} style={formContainerStyle}>
                    <Typography variant="h5" align="center" style={{ marginBottom: '5px' }}>
                        Farm Information
                    </Typography>
                    <form ref={formRef} onSubmit={handleAddFarm}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="nickName-of-farm"
                                    label="Nick Name of Farm"
                                    placeholder="Nick Name of Farm"
                                    variant="outlined"
                                    value={farmData.nickName}
                                    onChange={(e) => setFarmData({ ...farmData, location: e.target.value })}
                                    InputProps={{
                                        style: {
                                            fontSize: '16px',
                                        },
                                        endAdornment: (
                                            <AbcIcon />
                                        ),
                                    }}
                                />
                            </Grid>
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
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ padding: '3%' }}>
                    <div style={{ margin: 'auto' }}>
                        <Table name="mine" onClick={handleClick} rowdata={rowData} tableheader={tableHeader} isLoading={isLoading} page={page} setPage={setPage} />
                    </div>
                </div>
            </div>
        </div>
    );
}
