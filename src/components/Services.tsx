import { Button, Card, CardContent, Grid, Typography } from "@mui/material";

export const Services = () => {
    const images = [
        {
            src: 'img/img-services/AssessmentAndUnderstanding.jpg',
            alt: 'Image 1',
            description: 'Assessment and Understanding',
            link: '../ServicePages/AssessmentAndUnderstanding'
        },
        {
            src: 'img/img-services/GlobalCropDashboard.jpeg',
            alt: 'Image 2',
            description: 'Global Crop Dashboard',
            link: '../ServicePages/GlobalCropDashboard'
        },
        {
            src: 'img/img-services/RealtimeExpertAdvisory.jpeg',
            alt: 'Image 3',
            description: 'Realtime Expert Advisory',
            link: '../ServicePages/RealTimeExpertAdvisory'
        },
        {
            src: 'img/img-services/ModernFarmsEquipmentSharedServices.jpeg',
            alt: 'Image 4',
            description: 'Modern Farms Equipment Shared Services',
            link: '../ServicePages/ModernFarmEquipment'
        },
        {
            src: 'img/img-services/Agri-Tech-CropTraining.jpeg',
            alt: 'Image 5',
            description: 'Agri-Tech Crop Training',
            link: '../ServicePages/AgriTechTraining'
        },
        {
            src: 'img/img-services/DronesForCrop.jpeg',
            alt: 'Image 6',
            description: 'Drones For Crop',
            link: '../ServicePages/DronesForCrop'
        },
        {
            src: 'img/img-services/ClimateSmartAgriStrategy.jpeg',
            alt: 'Image 7',
            description: 'Climate Smart Agri Strategy',
            link: '../ServicePages/ClimateSmartAgriStrategy'
        },
        {
            src: 'img/img-services/Co-Farming-ManagedAgriEconomic-Model.jpeg',
            alt: 'Image 8',
            description: 'Co-Farming Managed Agri-Economic Model',
            link: '../ServicePages/CoFarmingModel'
        },
        {
            src: 'img/img-services/GlobalAgriSkillDevelopment.jpeg',
            alt: 'Image 9',
            description: 'Global Agri Skill Development',
            link: '../ServicePages/GlobalAgriSkill'
        }
    ];
    return (
        <div id="services" className="text-center">
            <div className="container">
                <div className="section-title">
                    <h2>Our Services</h2>
                </div>
                <Grid container spacing={3}>
                    {images.map((image, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                                />
                                <CardContent style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" component="h2" style={{ textAlign: 'center', color: 'black' }}>
                                        {image.description}
                                    </Typography>
                                </CardContent>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
                                    <Button variant="contained" color="primary" href={image.link} >
                                        Learn More {'>>>'}
                                    </Button>
                                </div>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};
