import React from "react";
import { CircularProgress, Typography, Grid, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { styled } from '@mui/material/styles'; // Import styled
import { ClassNames } from "@emotion/react";

// Styled component for the container
const StyledContainer = styled('div')(({ theme }) => ({
  padding: '25px', // Default padding
}));

const List = () => {
    return (
       <StyledContainer>
        <Typography variant="h4"></Typography>
       </StyledContainer>
    );
};

export default List;