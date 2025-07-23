import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" color="default" elevation={2} sx={{ py: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0077b6" }}>
          MusaidBot
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {["مميزات", "التجربة", "الأسعار", "الآراء"].map((label) => (
            <Button key={label} color="inherit">
              {label}
            </Button>
          ))}
        </Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#00b4d8" }}
          onClick={() => navigate("/signup")}
        >
          ابدأ الآن
        </Button>
      </Toolbar>
    </AppBar>
  );
}
