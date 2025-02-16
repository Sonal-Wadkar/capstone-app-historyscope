import React from "react";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
    return (
        <AppBar position="static" sx={{ color: "white", background: "#3f2a52"}}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "2px", background: "#3f2a52", color:"white" }}>
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold", color: "white", background: "#3f2a52" }}>
                    Travel Planner
                </Typography>

                {/* Search Box */}
                <Box display="flex" alignItems="center" color={{color: "white", background: "#3f2a52"}}>
                    <Typography variant="h6" sx={{ marginRight: 2, color: "white", background: "#3f2a52" }}>
                        Explore new places
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "white",
                            background: "#3f2a52",
                        }}
                    >
                        <SearchIcon sx={{ color: "white", background: "#3f2a52" }} />
                        <InputBase
                            placeholder="Search..."
                            sx={{
                                marginLeft: 1,
                                flex: 1,
                                color: "white",
                                background: "#3f2a52",
                            }}
                        />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
