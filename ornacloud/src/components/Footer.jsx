import {
  Box,
  Container,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Logo from "../assets/Logo.svg";
import HorizontalRuleSharpIcon from "@mui/icons-material/HorizontalRuleSharp";

// Data for repeated sections
const sections = [
  {
    title: "MENU",
    items: ["Browse Components", "Documentation"],
  },
  {
    title: "LEGAL",
    items: ["Terms & Conditions", "License", "Contact"],
  },
  {
    title: "SOCIAL",
    items: ["Instagram", "LinkedIn"],
  },
];

// Extracted style objects
const listItemStyle = { py: 0.25, minHeight: "unset" };
const listItemIconStyle = { minWidth: "24px", mr: 2 };
const listItemTextStyle = {
  fontFamily: "Inter",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "21.98px",
};

export default function Footer() {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#F2F4F7",
        bottom: 0,
        height: { xs: "auto", md: 402 },
        overflowX: "hidden",
        mt: "139px",
      }}
    >
      <Container
        disableGutters
        sx={{
          position: "relative",
          top: { xs: 0, md: 109 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: { xs: "auto", md: "244.01px" },
          overflowX: "hidden",
          px: { xs: 2, md: 0 },
          py: { xs: 3, md: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flexWrap: "wrap",
            gap: { xs: 4, md: 15 },
          }}
        >
          {/* Logo and branding */}
          <Box>
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
            </Box>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "19.92px",
                color: "#6C737F",
              }}
            >
              © 2022 Devias IO
            </Typography>
          </Box>

          {/* Dynamically render sections */}
          {sections.map((section) => (
            <Box key={section.title}>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#6C737F",
                  lineHeight: "30px",
                  letterSpacing: "0.5px",
                }}
              >
                {section.title}
              </Typography>
              {section.items.map((item) => (
                <ListItemButton
                  key={item}
                  component="a"
                  href="#"
                  sx={listItemStyle}
                >
                  <ListItemIcon sx={listItemIconStyle}>
                    <HorizontalRuleSharpIcon sx={{ color: "#6366F1" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography sx={listItemTextStyle}>{item}</Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </Box>
          ))}
        </Box>

        {/* Divider */}
        <Box sx={{ width: "100%" }}>
          <Divider
            component="div"
            sx={{ borderColor: "#F2F4F7", borderWidth: 1, m: 0 }}
            role="presentation"
          />
        </Box>

        {/* Footer copyright */}
        <Box
          sx={{
            alignSelf: { xs: "center", md: "flex-end" },
            width: "100%",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "19.92px",
              color: "#6C737F",
              mt: 0,
            }}
          >
            All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}
