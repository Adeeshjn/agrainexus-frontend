import React, {
    useState,
    useEffect,
    useRef
} from "react";
import {
    TextField,
    Button,
    Paper,
    Grid,
    Typography,
    Select,
    MenuItem,
    SelectChangeEvent,
    Dialog,
    DialogContent
} from "@mui/material";
import AbcIcon from '@mui/icons-material/Abc';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import GrassIcon from '@mui/icons-material/Grass';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { 
    API_URLS, 
    frontEndUrl 
} from "../constants/static";
import postApi from "../api/PostApi";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import GetApi from "../api/GetApi";
import Table from "../shared/Table";
import html2pdf from 'html2pdf.js';
import GoogleMapComponent from "../components/GoogleMapComponent";
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

interface FarmData {
    nickName: string;
    location: string;
    crops: string[];
    areaValue: number;
    areaUnit: string;
    userId: number;
}

const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
};

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
    const [isAddFarmOpen, setIsAddFarmOpen] = useState(false)

    const handleAddFarmOpen = () => {
        setFarmData({
            nickName: "",
            location: "",
            crops: [],
            areaValue: 0,
            areaUnit: "acres",
            userId: 0
        })
        setIsAddFarmOpen(true)
    }

    const handleAddFarmClose = (item: any) => {
        setIsAddFarmOpen(false)
    }

    const tableHeader = [
        { title: 'Nick Name', type: 'text', prop: 'nickName', sort: false, filter: false, asc: false, des: false },
        { title: 'Location', type: 'text', prop: 'location', sort: false, filter: false, asc: false, des: false },
        { title: 'Crops', type: 'text', prop: 'crops', sort: false, filter: false, asc: false, des: false },
        { title: 'Area', type: 'text', prop: 'area', sort: false, filter: false, asc: false, des: false },
        { title: 'Action', type: 'button', prop: 'button', sort: false, filter: false, asc: false, des: false }
    ];

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
                nickName: farmData.nickName,
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
    };

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
    };

    const handleDeleteFarmOpen = (item: any) => {
        // Implement delete functionality
    };   

    const handleAssessFarm = async (item: any) => {
        try {
            const pdf = new jsPDF();
    
            // Set up the content for the table
            const tableData = [
                ['Farm Nick Name', item.nickName],
                ['Location', item.location],
                ['Crops', Array.isArray(item.crops) ? item.crops.join(', ') : item.crops],
                ['Area', `${item.areaValue} ${item.areaUnit}`],
            ];
    
            // Add a header
            pdf.text('Farm Assessment', 10, 10);
    
            // Add the autoTable plugin
            (pdf as any).autoTable({ head: [['Field', 'Value']], body: tableData, startY: 20 });
    
            // Save the PDF
            pdf.save(`Farm_Assessment_${item.nickName}.pdf`);
    
        } catch (error) {
            console.error('Error generating PDF:', error);
            // Handle the error appropriately
        }
    };

    const handleClick = (value: string, item: any) => {
        setClick(value);
        switch (value) {
            case 'update':
                handleUpdateFarmOpen(item);
                break;
            case 'delete':
                handleDeleteFarmOpen(item);
                break;
            case 'assess':
                handleAssessFarm(item);
                break;
        }
    };

    return (
        <>
            <div style={containerStyle}>
                <a href={frontEndUrl} style={{ color: "black" }}>
                    <ArrowCircleLeftOutlinedIcon style={{ marginTop: "10px", marginLeft: "20px" }} fontSize="large" />
                </a>
                <Typography variant="h4" align="center" >Manage your farm details here</Typography>
                <Button style={{ margin: '10px' }} variant="contained" startIcon={<AddIcon />} onClick={handleAddFarmOpen}>
                    Add Farm
                </Button>
                <Dialog open={isAddFarmOpen} onClose={() => handleAddFarmClose(false)} maxWidth="md" fullWidth scroll="body">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginRight: '10px' }}>
                        <Button variant='contained' color="error" size='small' onClick={() => handleAddFarmClose(false)}><CloseIcon /></Button>
                    </div>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <div>
                                    <GoogleMapComponent />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
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
                                                    onChange={(e) => setFarmData({ ...farmData, nickName: e.target.value })}
                                                    required
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
                                                    required
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
                                                    onChange={(e) => setFarmData({ ...farmData, crops: e.target.value.split('\n').map(line => line.trim()) })}
                                                    required
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
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
            <div style={{ padding: '3%' }}>
                <div style={{ margin: 'auto' }}>
                    <div>
                        <Table
                            name="mine"
                            onClick={handleClick}
                            rowdata={rowData}
                            tableheader={tableHeader}
                            isLoading={isLoading}
                            page={page}
                            setPage={setPage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}