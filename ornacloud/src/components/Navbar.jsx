import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logo from "../assets/Logo.svg";

export default function Navbar() {
  return (
    <Paper
      sx={{
        width: 1200,
        height: 64,
        margin: "35.75px auto",
        borderRadius: 5,
        boxShadow: "0px 3px 14px 0px #00000014",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <img src={Logo} alt="Logo" style={{ height: 28 }} />
        <Typography
          sx={{
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 800,
            fontSize: 13,
            lineHeight: "35px",
          }}
        >
          <span style={{ color: "#111927" }}>OrnaCloud</span>
          <span style={{ color: "#6366F1" }}> PRO</span>
        </Typography>
        <Chip
          label="v6.2.23"
          sx={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: 13,
            lineHeight: "19.5px",
            color: "#111927",
            borderRadius: "16px",
            backgroundColor: "#1119271F",
          }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Typography
          sx={{
            fontFamily: "Inter",
            color: "#111927",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Components
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              color: "#111927",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Pages
          </Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: "#111927" }} />
        </Box>
        <Typography
          sx={{
            fontFamily: "Inter",
            color: "#111927",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Docs
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          width: 137.33,
          height: 40.5,
          textTransform: "none",
          borderRadius: "12px",
          color: "#FFFFFF",
          background: "#6366F1",
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        Purchase Now
      </Button>
    </Paper>
  );
}
