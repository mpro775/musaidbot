import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useState, useEffect } from "react";

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // أغلق السايدبار عند التنقل أو تصغير الشاشة
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fbfc" }}>
      {/* Sidebar */}
      <Sidebar
        open={isMobile ? sidebarOpen : true}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />

      {/* Main content */}
      <Box sx={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Topbar onOpenSidebar={() => setSidebarOpen(true)} isMobile={isMobile} />
        <Box
          sx={{
            pt: { xs: 7, sm: 8 },
            px: { xs: 1, sm: 4 },
            flex: 1,
            minHeight: 0,
            backgroundColor: "#f9fbfc",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
