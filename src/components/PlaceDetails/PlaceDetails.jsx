import React from "react";
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Rating from '@mui/lab/Rating';

const PlaceDetails = ({ place, selected, refProp }) => {
    if (!place) return null; // Prevent crashes if place is undefined

    if (selected && refProp?.current) {
        refProp.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return (
        <Card elevation={6}>
            <CardMedia
                sx={{ height: 350 }}
                image={place.photo ? place.photo.images.large.url : 'https://via.placeholder.com/350'}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>

                <Box display="flex" justifyContent="space-between">
                    <Rating size="small" value={Number(place.rating) || 0} readOnly />
                    <Typography gutterBottom variant="subtitle1">
                        out of {place?.num_reviews || 0} reviews
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">{place?.price_level || "N/A"}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place?.ranking || "N/A"}</Typography>
                </Box>

                {place?.awards?.map((award) => (
                    <Box key={award?.display_name} my={1} display="flex" justifyContent="space-between" alignItems="center">
                        <img src={award?.images?.small} alt={award?.display_name} />
                        <Typography variant="subtitle2" color="textSecondary">{award?.display_name}</Typography>
                    </Box>
                ))}

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                    {place?.cuisine?.map((cuisine) => (
                        <Chip key={cuisine?.name} size="small" label={cuisine?.name} sx={{ margin: "5px 5px 5px 0" }} />
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
                    {place?.web_url && (
                        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                            Trip Advisor
                        </Button>
                    )}
                    {place?.website && (
                        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                            Website
                        </Button>
                    )}
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default PlaceDetails;
