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

// Predefined style objects
const styles = {
  paper: {
    width: 362.66,
    height: 537.45,
    borderRadius: 5,
    boxShadow: "0px 0px 0px 0.5px #00000008, 0px 5px 22px 0px #0000000A",
  },
  imageWrapper: {
    position: "absolute",
    top: 24,
    left: 24,
  },
  priceBox: {
    position: "absolute",
    top: 75,
    left: 24,
  },
  priceText: {
    fontSize: 33.3,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 700,
    lineHeight: "40px",
  },
  periodText: {
    color: "#6C737F",
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: 500,
    marginLeft: "8px",
  },
  planText: {
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 700,
    lineHeight: "20px",
    position: "absolute",
    top: 131.98,
    left: 24,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: 400,
    color: "#6C737F",
    position: "absolute",
    top: 169.98,
    left: 24,
  },
  divider: { borderColor: "#F2F4F7", borderWidth: 1 },
  featuresWrapper: {
    height: 184,
    width: 314.66,
    position: "relative",
    top: 24,
    left: 24,
  },
  trialButton: {
    textTransform: "none",
    width: 314.66,
    height: 42.5,
    borderRadius: 3,
    color: "#FFFFFF",
    background: "#6366F1",
    position: "absolute",
    top: 256,
    left: 24,
  },
};

const vectors = [PricingCardVector, PricingCardVector2, PricingCardVector3];

function PricingCard({
  cardCounter,
  price,
  period,
  plan,
  description,
  features,
  trialButtonText,
}) {
  // Memoize the selected vector based on cardCounter prop
  const selectedVector = React.useMemo(
    () => vectors[cardCounter - 1],
    [cardCounter]
  );

  // Use a ref and state to calculate a responsive scale factor.
  const containerRef = React.useRef(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        // The natural width of the card is 362.66px.
        const containerWidth = containerRef.current.clientWidth;
        const desiredWidth = 362.66;
        if (containerWidth < desiredWidth) {
          setScale(containerWidth / desiredWidth);
        } else {
          setScale(1);
        }
      }
    }
    window.addEventListener("resize", handleResize);
    // Run on mount
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // Container that centers the card and allows it to scale responsively.
    <Box
      ref={containerRef}
      sx={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <Box sx={{ transform: `scale(${scale})`, transformOrigin: "top center" }}>
        <Paper sx={styles.paper}>
          <Box sx={{ height: 213.95, position: "relative" }}>
            <Box sx={styles.imageWrapper}>
              <img src={selectedVector} alt="PricingCardVector" />
            </Box>
            <Typography sx={styles.priceBox}>
              <span style={styles.priceText}>₹{price}</span>
              <span style={styles.periodText}>{period}</span>
            </Typography>
            <Typography sx={styles.planText}>{plan}</Typography>
            <Typography sx={styles.descriptionText}>{description}</Typography>
          </Box>
          <Divider component="div" sx={styles.divider} role="presentation" />
          <Box sx={{ height: 322, position: "relative" }}>
            <Box sx={styles.featuresWrapper}>
              <Stack spacing={2.5}>
                {features.map((feature, index) => (
                  <Stack key={index} direction="row" alignItems="center">
                    <DoneRoundedIcon sx={{ mr: 1, color: "green" }} />
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: "Inter",
                        fontWeight: 500,
                      }}
                    >
                      {feature}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
            <Button variant="contained" sx={styles.trialButton}>
              {trialButtonText}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default React.memo(PricingCard);
