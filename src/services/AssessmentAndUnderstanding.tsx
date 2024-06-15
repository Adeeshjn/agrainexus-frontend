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
    DialogContent,
    Container
} from "@mui/material";
import AbcIcon from '@mui/icons-material/Abc';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import GrassIcon from '@mui/icons-material/Grass';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import {
    API_URLS,
    DNF,
    frontEndUrl
} from "../constants/static";
import postApi from "../api/PostApi";
import { ToastContainer, toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import GetApi from "../api/GetApi";
// import GoogleMapComponent from "../components/GoogleMapComponent";
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from '@mui/material/useMediaQuery';
import Loader from "../shared/LazyLoading";

interface FarmData {
    nickName: string;
    location: string;
    crops: string[];
    areaValue: number;
    areaUnits: string;
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
    // const [isUpdateFarmOpen, setIsUpdateFarmOpen] = useState(false);
    // const [page, setPage] = useState(0);
    const [farmData, setFarmData] = useState<FarmData>({
        nickName: "",
        location: "",
        crops: [],
        areaValue: 0,
        areaUnits: "acres",
        userId: 0
    });
    const [isAddFarmOpen, setIsAddFarmOpen] = useState(false)
    const [isUpdateFarmOpen, setIsUpdateFarmOpen] = useState(false)
    const [isDeleteFarmOpen, setIsDeleteFarmOpen] = useState(false)

    const accordionStyle = {
        backgroundColor: 'green', // Set your desired background color
        color: 'white', // Set text color if needed
    };

    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setClick(isExpanded ? panel : "");
    };

    const handleAddFarmOpen = () => {
        setFarmData({
            nickName: "",
            location: "",
            crops: [],
            areaValue: 0,
            areaUnits: "acres",
            userId: 0
        })
        setIsAddFarmOpen(true)
    }

    const handleAddFarmClose = (item: any) => {
        setIsAddFarmOpen(false)
    }

    // const tableHeader = [
    //     { title: 'Nick Name', type: 'text', prop: 'nickName', sort: false, filter: false, asc: false, des: false },
    //     { title: 'Location', type: 'text', prop: 'location', sort: false, filter: false, asc: false, des: false },
    //     { title: 'Crops', type: 'text', prop: 'crops', sort: false, filter: false, asc: false, des: false },
    //     { title: 'Area', type: 'text', prop: 'area', sort: false, filter: false, asc: false, des: false },
    //     { title: 'Action', type: 'button', prop: 'button', sort: false, filter: false, asc: false, des: false }
    // ];

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
    });

    const handleAddFarm = async (e: React.FormEvent) => {
        e.preventDefault()
        const isFormValid = formRef.current.checkValidity();
        if (isFormValid) {
            const item = {
                nickName: farmData.nickName,
                location: farmData.location,
                crops: farmData.crops.join(','),
                Area: farmData.areaValue.toString(),
                areaUnits: farmData.areaUnits,
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
                        areaUnits: "acres",
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
            if (response.status === 200) {
                setRowData(response.data)
            }
            console.log(response)
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
        setFarmData({ ...farmData, areaUnits: e.target.value as string });
    };

    const handleUpdateFarmOpen = (item: any) => {
        // Implement update functionality
        setFarmData({
            nickName: farmData.nickName,
            location: farmData.location,
            crops: farmData.crops,
            areaValue: farmData.areaValue,
            areaUnits: farmData.areaUnits,
            userId: farmData.userId
        })
        setIsUpdateFarmOpen(true)
    };


    const handleUpdateFarmClose = (item: any) => {
        setIsUpdateFarmOpen(false)
    }

    const handleUpdateFarm = async (e: React.FormEvent) => {

    }

    const handleDeleteFarmOpen = (item: any) => {
        // Implement delete functionality
        setIsDeleteFarmOpen(true)
    };

    const handleDeleteFarmClose = (item: any) => {
        setIsDeleteFarmOpen(false)
    }

    // const handleDeleteFarm = async (e: any) => {

    // }

    const handleAssessFarm = async (item: any) => {
        try {
            const pdf = new jsPDF();

            // Set up the content for the table
            const tableData = [
                ['Farm Nick Name', item.nickName],
                ['Location', item.location],
                ['Crops', Array.isArray(item.crops) ? item.crops.join(', ') : item.crops],
                ['Area', `${item.area} ${item.areaUnits}`],
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

    // const handleClick = (value: string, item: any) => {
    //     setClick(value);
    //     switch (value) {
    //         case 'update':
    //             handleUpdateFarmOpen(item);
    //             break;
    //         case 'delete':
    //             handleDeleteFarmOpen(item);
    //             break;
    //         case 'assess':
    //             handleAssessFarm(item);
    //             break;
    //     }
    // };

    return (
        <>
            <ToastContainer />
            <div style={containerStyle}> {isLoading && <Loader />}
                <a href={frontEndUrl} style={{ color: "black" }}>
                    <ArrowCircleLeftOutlinedIcon style={{ marginTop: "10px", marginLeft: "20px" }} fontSize="large" />
                </a>
                <Typography variant={isSmallScreen ? 'h6' : 'h4'} align="center" >Manage Your Farm Details Here</Typography>
                <Button style={{ margin: '10px' }} variant="contained" startIcon={<AddIcon />} onClick={handleAddFarmOpen}>
                    Add Farm
                </Button>
                <Dialog open={isAddFarmOpen} onClose={() => handleAddFarmClose(false)} maxWidth="md" fullWidth scroll="body">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginRight: '10px' }}>
                        <Button variant='contained' color="error" size='small' onClick={() => handleAddFarmClose(false)}><CloseIcon /></Button>
                    </div>
                    <DialogContent>
                        <Container maxWidth="lg">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <div>
                                        {/* <GoogleMapComponent /> */}
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6}>
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
                                                            endAdornment: <AbcIcon />,
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
                                                            endAdornment: <AddLocationIcon />,
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
                                                            endAdornment: <GrassIcon />,
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
                                                        value={farmData.areaUnits}
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
                        </Container>
                    </DialogContent>
                </Dialog>
            </div>
            <div style={{ padding: '3%' }}>
                <div style={{ margin: 'auto' }}>
                    {!rowData.includes(DNF) ? rowData.map((item, index) => (
                        <Accordion
                            key={index}
                            expanded={click === `panel${index}`}
                            onChange={handleAccordionChange(`panel${index}`)}
                            style={accordionStyle}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index}bh-content`}
                                id={`panel${index}bh-header`}
                            >
                                <Typography variant="h6">{item.nickName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* Replace the content below with your desired layout */}
                                <div>
                                    <Typography variant="subtitle1">Location: {item.location}</Typography>
                                    <Typography variant="subtitle1">Crops: {item.crops}</Typography>
                                    <Typography variant="subtitle1">Area: {item.area} {item.areaUnits}</Typography>
                                    <Button
                                        variant="contained"
                                        style={{ color: 'black', marginRight: '8px' }}
                                        color="primary"
                                        onClick={() => handleUpdateFarmOpen(item)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={{ color: 'black', marginRight: '8px' }}
                                        color="error"
                                        onClick={() => handleDeleteFarmOpen(item)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={{ color: 'black' }}
                                        color="primary"
                                        onClick={() => handleAssessFarm(item)}
                                    >
                                        Assess
                                    </Button>

                                </div>
                            </AccordionDetails>
                        </Accordion>
                    )) : 'No data'}
                </div>
            </div>

            <Dialog open={isUpdateFarmOpen} onClose={() => handleUpdateFarmClose(false)} maxWidth="md" fullWidth scroll="body">
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginRight: '10px' }}>
                    <Button variant='contained' color="error" size='small' onClick={() => handleUpdateFarmClose(false)}><CloseIcon /></Button>
                </div>
                <DialogContent>
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <div>
                                    {/* <GoogleMapComponent /> */}
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper elevation={3} style={formContainerStyle}>
                                    <Typography variant="h5" align="center" style={{ marginBottom: '5px' }}>
                                        Farm Information
                                    </Typography>
                                    <form ref={formRef} onSubmit={handleUpdateFarm}>
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
                                                        endAdornment: <AbcIcon />,
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
                                                        endAdornment: <AddLocationIcon />,
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
                                                        endAdornment: <GrassIcon />,
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
                                                    value={farmData.areaUnits}
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
                                                    Update Farm
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteFarmOpen} onClose={() => handleDeleteFarmClose(false)} maxWidth="xs" fullWidth scroll='body'>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginRight: '10px' }}>
                    <Button variant='contained' color="error" size='small' onClick={() => handleDeleteFarmClose(false)}><CloseIcon /></Button>
                </div>
                <DialogContent>
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Typography variant="body1">Are you sure? Do you want to delete the farm with Nick Name: {farmData.nickName} ?</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '5px' }}>
                                <Button variant='contained' color='error' size='small' onClick={() => handleDeleteFarmClose(false)}>
                                    No
                                </Button>
                                <Button style={{marginLeft: '5px'}} variant='contained' color='primary' size='small' onClick={() => handleDeleteFarmClose(true)}>
                                    Yes
                                </Button>
                            </div>
                        </Grid>

                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );
}