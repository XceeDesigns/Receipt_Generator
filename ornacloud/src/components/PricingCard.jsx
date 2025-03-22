import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import PricingCardVector from "../assets/PricingCardVector.svg";
import PricingCardVector2 from "../assets/PricingCardVector2.svg";
import PricingCardVector3 from "../assets/PricingCardVector3.svg";

export default function PricingCard({
  cardCounter,
  price,
  period,
  plan,
  description,
  features,
  trialButtonText,
}) {
  // Create an array of the SVG images
  const vectors = [PricingCardVector, PricingCardVector2, PricingCardVector3];
  // Select the appropriate image. Default to the first image if vectorIndex is out of bounds.
  const selectedVector = vectors[cardCounter - 1];

  return (
    <Paper
      sx={{
        maxWidth: 362.66,
        height: 537.45,
        borderRadius: 5,
        boxShadow: "0px 0px 0px 0.5px #00000008, 0px 5px 22px 0px #0000000A",
      }}
    >
      <Box sx={{ height: 213.95, position: "relative" }}>
        <Box
          sx={{
            top: 24,
            left: 24,
            position: "absolute",
          }}
        >
          <img src={selectedVector} alt="PricingCardVector" />
        </Box>
        <Typography sx={{ position: "absolute", top: 75, left: 24 }}>
          <span
            style={{
              fontSize: 33.3,
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 700,
              lineHeight: "40px",
            }}
          >
            ${price}
          </span>
          <span
            style={{
              color: "#6C737F",
              fontSize: 14,
              fontFamily: "Inter",
              fontWeight: 500,
              marginLeft: "8px",
            }}
          >
            {period}
          </span>
        </Typography>
        <Typography
          sx={{
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 700,
            lineHeight: "20px",
            position: "absolute",
            top: 131.98,
            left: 24,
          }}
        >
          {plan}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            fontFamily: "Inter",
            fontWeight: 400,
            color: "#6C737F",
            position: "absolute",
            top: 169.98,
            left: 24,
          }}
        >
          {description}
        </Typography>
      </Box>
      <Divider
        component="div"
        sx={{ borderColor: "#F2F4F7", borderWidth: 1 }}
        role="presentation"
      />
      <Box sx={{ height: 322, position: "absolute", width: "100%" }}>
        <Box
          sx={{
            height: 184,
            width: 314.66,
            position: "relative",
            top: 24,
            left: 24,
          }}
        >
          <Stack spacing={2.5}>
            {features.map((feature, index) => (
              <Stack key={index} direction="row" alignItems="center">
                <DoneRoundedIcon sx={{ mr: 1, color: "green" }} />
                <Typography
                  sx={{ fontSize: 14, fontFamily: "Inter", fontWeight: 500 }}
                >
                  {feature}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            width: 314.66,
            height: 42.5,
            borderRadius: 3,
            color: "#FFFFFF",
            background: "#6366F1",
            position: "absolute",
            top: 256,
            left: 24,
          }}
        >
          <span>{trialButtonText}</span>
        </Button>
      </Box>
    </Paper>
  );
}
