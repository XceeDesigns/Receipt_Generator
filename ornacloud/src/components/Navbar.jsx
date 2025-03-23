import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logo from "../assets/Logo.svg";

const navLinkStyles = {
  fontFamily: "Inter",
  color: "#111927",
  fontWeight: 600,
  fontSize: { xs: 12, sm: 14 },
  cursor: "pointer",
};

export default function Navbar() {
  return (
    <Paper
      sx={{
        width: { xs: "90%", sm: 1200 },
        height: { xs: "auto", sm: 64 },
        m: "35.75px auto",
        borderRadius: 5,
        boxShadow: "0px 3px 14px 0px #00000014",
        backdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 0 },
        gap: { xs: 2, sm: 0 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box component="img" src={Logo} alt="Logo" sx={{ height: 28 }} />
        <Typography
          sx={{
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 800,
            fontSize: { xs: 12, sm: 13 },
            lineHeight: "35px",
          }}
        >
          <Box component="span" sx={{ color: "#111927" }}>
            OrnaCloud
          </Box>
          <Box component="span" sx={{ color: "#6366F1" }}>
            {" PRO"}
          </Box>
        </Typography>
        <Chip
          label="v6.2.23"
          sx={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: { xs: 12, sm: 13 },
            lineHeight: "19.5px",
            color: "#111927",
            borderRadius: "16px",
            backgroundColor: "#1119271F",
          }}
        />
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: { xs: 2, sm: 3 } }}
      >
        <Typography sx={navLinkStyles}>Components</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
          }}
        >
          <Typography sx={navLinkStyles}>Pages</Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "#111927" }} />
        </Box>
        <Typography sx={navLinkStyles}>Docs</Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          width: { xs: "100%", sm: 137.33 },
          height: { xs: 40, sm: 40.5 },
          textTransform: "none",
          borderRadius: "12px",
          background: "#6366F1",
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: { xs: 12, sm: 14 },
          mt: { xs: 2, sm: 0 },
        }}
      >
        Purchase Now
      </Button>
    </Paper>
  );
}
