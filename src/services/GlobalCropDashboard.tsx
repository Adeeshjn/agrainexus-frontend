import { Grid, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, CircularProgressProps } from "@mui/material";
import { useEffect, useState } from "react";
import { frontEndUrl } from "../constants/static";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import Loader from "../shared/LazyLoading";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

// const containerStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     width: '100%',
// };

// Sample table data
const tableData = [
    { id: 1, name: 'Item 1', quantity: 10, price: 20 },
    { id: 2, name: 'Item 2', quantity: 15, price: 25 },
    { id: 3, name: 'Item 3', quantity: 20, price: 30 },
];

// Sample data
const cropData = [
    { name: 'Wheat', production: 10, growthRate: 8, pestResistance: 6, yield: 9 },
    { name: 'Rice', production: 8, growthRate: 7, pestResistance: 5, yield: 8 },
    { name: 'Maize', production: 6, growthRate: 9, pestResistance: 7, yield: 7 },
    { name: 'Barley', production: 5, growthRate: 6, pestResistance: 8, yield: 6 },
    { name: 'Soybean', production: 7, growthRate: 7, pestResistance: 6, yield: 8 },
];

const temperatureData = [
    { name: 'January', Temperature: 28 },
    { name: 'February', Temperature: 32 },
    { name: 'March', Temperature: 35 },
    { name: 'April', Temperature: 40 },
    { name: 'May', Temperature: 42 },
    { name: 'June', Temperature: 36 },
    { name: 'July', Temperature: 34 },
    { name: 'August', Temperature: 30 },
    { name: 'September', Temperature: 30 },
    { name: 'October', Temperature: 27 },
    { name: 'November', Temperature: 25 },
    { name: 'December', Temperature: 23 }
];

const progressData = [
    { name: 'Task 1', value: 50 },
    { name: 'Task 2', value: 20 },
    { name: 'Task 3', value: 70 }
];

const scatterData = [
    { x: 10, y: 20 },
    { x: 20, y: 30 },
    { x: 30, y: 40 },
    { x: 40, y: 50 },
    { x: 50, y: 60 },
];

const RegisteredUsersCard = ({ count }: any) => {
    return (
        <Paper elevation={3} sx={{ padding: 2, margin: '30px', marginBottom: '5px', backgroundColor: '#2e2e48' }}>
            <Typography variant="h5" gutterBottom>Registered Users</Typography>
            <Typography variant="h4">{count}</Typography>
        </Paper>
    );
};

// Define the CurrentLoginsCard component
const CurrentLoginsCard = ({ count }: any) => {
    return (
        <Paper elevation={3} sx={{ padding: 2, margin: '30px', marginBottom: '5px', backgroundColor: '#2e2e48' }}>
            <Typography variant="h5" gutterBottom>Current Logins</Typography>
            <Typography variant="h4">{count}</Typography>
        </Paper>
    );
};

// Define the CropsAddedCard component
const CropsAddedCard = ({ count }: any) => {
    return (
        <Paper elevation={3} sx={{ padding: 2, margin: '30px', marginBottom: '5px', backgroundColor: '#2e2e48' }}>
            <Typography variant="h5" gutterBottom>Crops Added</Typography>
            <Typography variant="h4">{count}</Typography>
        </Paper>
    );
};

const StyledCircularProgress: React.FC<CircularProgressProps & { value: number }> = ({ value, ...props }) => {
    return (
        <div style={{ position: 'relative', width: 60, height: 60 }}>
            <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#8884d8', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#82ca9d', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="transparent"
                    stroke="#e6e6e6"
                    strokeWidth="6"
                />
                <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="transparent"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    strokeDasharray="150"
                    strokeDashoffset={150 * (1 - value / 100)}
                    strokeLinecap="round"
                    transform="rotate(-90 30 30)"
                />
            </svg>
            <CircularProgress {...props} variant="determinate" size={60} thickness={6} value={value} style={{ position: 'absolute' }} />
            <Typography variant="h6" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{value}%</Typography>
        </div>
    );
};

export default function GlobalCropDashboard() {

    // const [isLoading, setIsLoading] = useState(false);
    // const isSmallScreen = useMediaQuery('(max-width: 600px)');

    const [selectedDate, setSelectedDate] = useState([new Date(), new Date()]);
    const [registeredUsersCount, setRegisteredUsersCount] = useState(100);
    const [currentLoginsCount, setCurrentLoginsCount] = useState(50);
    const [cropsAddedCount, setCropsAddedCount] = useState(200);

    // const [currentDateTime, setCurrentDateTime] = useState(new Date());

    // const formattedDateTime = new Intl.DateTimeFormat('en-US', {
    //     weekday: 'long',
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     second: 'numeric'
    // }).format(currentDateTime);

    useEffect(() => {
        // Update the currentDateTime every second
        // const intervalId = setInterval(() => {
        //     setCurrentDateTime(new Date());
        // }, 1000);
        setRegisteredUsersCount(registeredUsersCount)
        setCurrentLoginsCount(currentLoginsCount)
        setCropsAddedCount(cropsAddedCount)
        // Cleanup the interval on component unmount
        // return () => clearInterval(intervalId);
    }, [cropsAddedCount, currentLoginsCount, registeredUsersCount]);

    return (
        <>
            <Grid container spacing={3} style={{ backgroundColor: '#383854' }}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={1} sm={1} style={{ textAlign: 'center' }}>
                        <a href={frontEndUrl} style={{ color: "black" }}>
                            <ArrowCircleLeftOutlinedIcon style={{ marginTop: "10px", marginLeft: "20px" }} fontSize="large" />
                        </a>
                    </Grid>
                    <Grid item xs={10} sm={6} style={{ textAlign: 'center' }}>
                        <Typography variant="h3" style={{ color: 'white', marginTop: '50px' }}>Global Crop Dashboard</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <RegisteredUsersCard count={registeredUsersCount} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CurrentLoginsCard count={currentLoginsCount} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CropsAddedCard count={cropsAddedCount} />
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ padding: 2, margin: '30px', marginBottom: '5px', backgroundColor: '#2e2e48' }}>
                        <Typography variant="h5" gutterBottom>Crop Production</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={cropData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="production" fill="#8884d8" />
                                <Bar dataKey="growthRate" fill="#82ca9d" />
                                <Bar dataKey="pestResistance" fill="#ffc658" />
                                <Bar dataKey="yield" fill="#d81b60" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, margin: '30px', marginBottom: '5px', backgroundColor: '#2e2e48' }}>
                        <Typography variant="h5" gutterBottom>Crop Distribution</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={cropData} dataKey="production" nameKey="name" fill="#8884d8" label />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, margin: '30px', marginBottom: '5px', backgroundColor: '#2e2e48' }}>
                        <Typography variant="h5" gutterBottom>Progress</Typography>
                        <Grid container spacing={2}>
                            {progressData.map((item, index) => (
                                <Grid key={index} item xs={12} sm={6} md={4}>
                                    <Box display={'flex'} alignItems="center">
                                        <Typography>{item.name}:</Typography>
                                        <Box ml={1} flexGrow={1}>
                                            <StyledCircularProgress value={item.value} />
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>


                    <Paper elevation={3} sx={{ padding: 2, margin: '30px', marginBottom: '5px', backgroundColor: '#2e2e48' }}>
                        <Typography variant="h5" gutterBottom>Temperature Gauge</Typography>
                        <Box textAlign="center">
                            <DeviceThermostatIcon style={{ fontSize: '5rem' }} color="error" />
                            <Typography variant="h4" color="primary" gutterBottom>42°C</Typography>
                            {/* <Typography variant="body1">Average Temperature</Typography> */}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ padding: 2, margin: '30px', marginBottom: '5px', backgroundColor: '#2e2e48' }}>
                        <Typography variant="h5" gutterBottom>Temperature Trends</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={temperatureData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Temperature" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, margin: '30px', marginBottom: '5px', backgroundColor: '#2e2e48' }}>
                        <Typography variant="h5" gutterBottom>Crop Attributes</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart data={cropData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="name" />
                                <PolarRadiusAxis />
                                <Tooltip />
                                <Radar dataKey="production" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                <Radar name="Growth Rate" dataKey="growthRate" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                                <Radar name="Pest Resistance" dataKey="pestResistance" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                                <Radar name="Yield" dataKey="yield" stroke="#d81b60" fill="#d81b60" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, margin: '30px', marginBottom: '5px', backgroundColor: '#2e2e48' }}>
                        <Typography variant="h5" gutterBottom>Scatter Plot</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x" type="number" />
                                <YAxis dataKey="y" type="number" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="A scatter" data={scatterData} fill="#8884d8" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, margin: '30px', marginBottom: '5px', backgroundColor: '#2e2e48' }}>
                        <Typography variant="h5" gutterBottom>Crop Types Proportion</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={cropData} dataKey="production" nameKey="name" fill="#8884d8" label />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, margin: '30px', marginBottom: '5px', backgroundColor: '#2e2e48' }}>
                        <Typography variant="h5" gutterBottom>Calendar View</Typography>
                        <Box>
                            <Calendar
                                selectRange={true}
                                onChange={(date) => setSelectedDate(selectedDate)}
                            />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, margin: '30px', marginBottom: '5px', backgroundColor: '#2e2e48' }}>
                        <Typography variant="h5" gutterBottom>Table View</Typography>
                        <TableContainer >
                            <Table aria-label="simple table" style={{ backgroundColor: '#2e2e48', borderCollapse: 'collapse' }}>
                                <TableHead>
                                    <TableRow style={{ backgroundColor: '#383854', borderRadius: '10px' }}>
                                        <TableCell style={{ borderBottom: 'none', color: 'white', fontWeight: 'bolder', textAlign: 'center' }}>ID</TableCell>
                                        <TableCell style={{ borderBottom: 'none', color: 'white', fontWeight: 'bolder', textAlign: 'center' }}>Name</TableCell>
                                        <TableCell style={{ borderBottom: 'none', color: 'white', fontWeight: 'bolder', textAlign: 'center' }}>Quantity</TableCell>
                                        <TableCell style={{ borderBottom: 'none', color: 'white', fontWeight: 'bolder', textAlign: 'center' }}>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell style={{ borderBottom: 'none', color: 'white', textAlign: 'center' }}>{row.id}</TableCell>
                                            <TableCell style={{ borderBottom: 'none', color: 'white', textAlign: 'center' }}>{row.name}</TableCell>
                                            <TableCell style={{ borderBottom: 'none', color: 'white', textAlign: 'center' }}>{row.quantity}</TableCell>
                                            <TableCell style={{ borderBottom: 'none', color: 'white', textAlign: 'center' }}>{row.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}