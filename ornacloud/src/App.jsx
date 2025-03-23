import "./App.css";
import React from "react";
import PricingCard from "./components/PricingCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Box,
  Chip,
  Container,
  styled,
  Switch,
  Typography,
  Grid,
} from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const PurpleSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#6366F1",
    "&:hover": {
      backgroundColor: alpha("#6366F1", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#6366F1",
  },
}));

const pricingCards = [
  {
    cardCounter: 1,
    price: "0",
    period: "/mo",
    plan: "Beginner",
    description: "Ideal for starter shops.",
    features: ["Manual rough receipt", "Receipt history"],
    trialButtonText: "Try Now",
  },
  {
    cardCounter: 2,
    price: "499",
    period: "/mo",
    plan: "Standard",
    description: "Ideal for growing shops.",
    features: ["Beginner features", "GST receipt", "Email support"],
    trialButtonText: "Try Now",
  },
  {
    cardCounter: 3,
    price: "999",
    period: "/mo",
    plan: "Pro",
    description: "Ideal for large-scale shops.",
    features: [
      "Standard features",
      "Inventory management",
      "Unlimited storage",
      "Priority support",
    ],
    trialButtonText: "Try Now",
  },
];

const faqs = [
  {
    question: "Do you have a free demo to review the code before purchasing?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    question: "How many projects can I build with Devias Kit PRO?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    question: "How many projects can I build with this template?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    question: "What browsers does the template support?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    question: "For what kind of projects is the Standard license intended?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
];

function App() {
  return (
    <Box sx={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          backgroundColor: "#F8F9FA",
        }}
      >
        <Navbar />
      </Box>

      <Box
        sx={{
          pt: { xs: "100px", sm: "150px", md: "184px" },
          pb: { xs: "80px", sm: "130px", md: "171.91px" },
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 700,
              fontSize: { xs: "28px", sm: "32px", md: "36.7px" },
              lineHeight: { xs: "36px", sm: "40px", md: "44px" },
              color: "#111927",
            }}
          >
            Start today. Boost up your services!
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 400,
              fontSize: { xs: "14px", sm: "16px" },
              lineHeight: { xs: "20px", sm: "24px" },
              color: "#6C737F",
              mt: 2,
            }}
          >
            6,000+ Jewellers/shop owners using OrnaCloud to power modern
            Inventory.
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <PurpleSwitch defaultChecked color="#6366F1" />
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: { xs: "20px", sm: "24px" },
                color: "#111927",
                ml: 1,
              }}
            >
              Yearly Payment
            </Typography>
            <Chip
              label="25% OFF"
              sx={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "19.5px",
                ml: 1,
                backgroundColor: "#6366F1",
                color: "#FFFFFF",
                height: "24px",
                borderRadius: "16px",
              }}
            />
          </Box>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ mt: { xs: "20px", sm: "30px", md: "39px" } }}
          >
            {pricingCards.map((card) => (
              <Grid key={card.cardCounter} item xs={12} sm={6} md={4}>
                <PricingCard {...card} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container sx={{ mt: { xs: 4, sm: 6, md: 8 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 700,
                  fontSize: { xs: "28px", sm: "32px", md: "36.7px" },
                  lineHeight: { xs: "36px", sm: "40px", md: "44px" },
                  color: "#111927",
                }}
              >
                Everything you need to know
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: { xs: "12px", sm: "14px" },
                  lineHeight: "21.98px",
                  color: "#6C737F",
                  mt: 1,
                }}
              >
                Frequently asked questions
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  disableGutters
                  sx={{ boxShadow: "none" }}
                >
                  <AccordionSummary expandIcon={<ArrowForwardIosRoundedIcon />}>
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontWeight: 500,
                        fontSize: { xs: "14px", sm: "16px" },
                        lineHeight: "25.12px",
                        color: "#111927",
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      sx={{
                        fontFamily: "Inter",
                        fontWeight: 400,
                        fontSize: { xs: "12px", sm: "14px" },
                        lineHeight: "22px",
                        color: "#111927",
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}

export default App;
