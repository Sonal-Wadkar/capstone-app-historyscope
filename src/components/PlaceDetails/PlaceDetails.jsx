import React from "react";
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Rating from '@mui/lab/Rating';

const PlaceDetails = ({ place, selected, refProp }) => {

    if (selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    return (
        <Card elevation={6}>
            <CardMedia
                sx={{ height: 350 }}
                image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospital'}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>

                <Box display="flex" justifyContent="space-between">
                    <Rating size="small" value={Number(place.rating)} readOnly />
                    <Typography gutterBottom variant="subtitle1">out of {place.num_reviews} reviews</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
                </Box>

                {place?.awards?.map((award) => (
                    <Box key={award.display_name} my={1} display="flex" justifyContent="space-between" alignItems="center">
                        <img src={award.images.small} alt={award.display_name} />
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                    {place?.cuisine?.map(({ name }) => (
                        <Chip key={name} size="small" label={name} sx={{ margin: "5px 5px 5px 0" }} />
                    ))}
                </Box>

                {place?.address && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary"
                        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
                        <LocationOnIcon /> {place.address}
                    </Typography>
                )}

                {place?.phone && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary"
                        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}

                <CardActions>
                    <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default PlaceDetails;
