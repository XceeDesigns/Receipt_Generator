import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  colors,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import { SubscriptionContext } from "../context/SubscriptionContext";
import { ReceiptHistoryContext } from "../context/ReceiptHistoryContext";

export default function SignInPage() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "ornacloud-particles";
    Object.assign(canvas.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
      pointerEvents: "none",
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let particles = [];
    const count = 55;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function init() {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.4,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(230, 206, 140, 0.7)";
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.remove();
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);
  const { subscription, setSubscription } = useContext(SubscriptionContext);
  const { setReceiptHistory } = useContext(ReceiptHistoryContext);

  const backend_url = process.env.REACT_APP_BACKEND_URL;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginResponse = await fetch(`${backend_url}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        toast.error(loginData.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", loginData.authToken);
      setUser(email);
      toast.success("Welcome back! ✨");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        // zIndex: 1,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        background:
          "linear-gradient(135deg, #0c0c0f 0%, #1a1a22 40%, #0b0b0e 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Particle canvas is appended via effect */}
      {/* <Box id="particles-layer" sx={{ position: "absolute", inset: 0, pointerEvents: "none" }} /> */}

      {/* LEFT SECTION */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "flex-start", md: "flex-start" },
          px: { xs: 4, md: 4 },
          py: { xs: 6, md: 10 },
          gap: 2,
          color: "white",
          // backgroundImage:
            // "radial-gradient(circle at top left, rgba(255,215,0,0.12), transparent 60%)",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 4, md: 10 },
            py: 8,
            color: "white",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "1px",
              background: "linear-gradient(90deg,#F7E27D,#C6A667)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "28px", md: "48px"}
            }}
          >
            OrnaCloud
          </Typography>

          <Typography
            variant="h5"
            sx={{
              opacity: 0.9,
              maxWidth: "440px",
              mb: 3,
              fontWeight: 500,
            }}
          >
            Smart receipt generator for jewellers. Elevate customer trust & brand prestige.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {[
              "Instant GST-compliant jewellery receipts",
              "Cloud record tracking & warranty slips",
              "Export PDF & WhatsApp share instantly",
              "Secure, Fast & Professional",
            ].map((item, i) => (
              <Typography key={i} sx={{ opacity: 0.8, fontSize: "15px" }}>
                ✅ {item}
              </Typography>
            ))}
          </Box>

          <Button
            onClick={() => navigate("/generate-receipt")}
            sx={{
              mt: 4,
              width: "fit-content",
              px: 4,
              py: 1.2,
              borderRadius: "8px",
              background: "linear-gradient(90deg,#F7E27D,#C6A667)",
              color: "black",
              fontWeight: 700,
              textTransform: "none",
              ":hover": { opacity: 0.85 },
            }}
          >
            🚀 Create Receipt Without Login
          </Button>
        </Box>
      </Box>

      {/* RIGHT SECTION LOGIN */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, md: 2  },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 440,
            backdropFilter: "blur(22px)",
            alignSelf: "center",
            // boxShadow: "0px 0px 35px rgba(198,166,103,0.18)",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.15)",
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: 700, color: "white", textAlign: "center" }}
          >
            Login to Continue
          </Typography>

          <Typography
            sx={{ mb: 3, color: "rgba(255,255,255,0.7)", textAlign: "center" }}
          >
            Welcome back - your workspace awaits
          </Typography>

          <form onSubmit={handleSignIn}>
            <TextField
              fullWidth
              label="Email"
              variant="filled"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: 'white',
                borderRadius: "16px",
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'black',
                },
              }}
              InputProps={{ disableUnderline: true }}
            />

            <TextField
              fullWidth
              label="Password"
              variant="filled"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: { backgroundColor: "rgba(232,240,2554,1)", borderRadius: "16px" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                disableUnderline: true
              }}
              sx={{
                mb: 3,
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'black',
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              disabled={loading}
              sx={{
                py: 1.4,
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: 700,
                background: "linear-gradient(90deg,#F7E27D,#C6A667)",
                color: "black",
                textTransform: "none",
              }}
            >
              {loading ? <CircularProgress size={22} /> : "Sign In"}
            </Button>

            <Button
              fullWidth
              onClick={() => navigate("/signup")}
              sx={{ mt: 2, textTransform: "none", color: "white" }}
            >
              New here? Create your account
            </Button>
          </form>

          {/* Trust Badges */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 3, opacity: 0.55 }}>
            <Typography sx={{ fontSize: "13px", color: "white" }}>🔒 Bank‑grade Security</Typography>
            <Typography sx={{ fontSize: "13px", color: "white" }}>⚡ 99.9% Uptime</Typography>
          </Box>

          {/* FOOTER */}
          {/* <Box
            sx={{
              width: "100%",
              textAlign: "center",
              py: 2,
              opacity: 0.5,
              color: "white",
              fontSize: "13px",
            }}
          >
            <Typography sx={{ cursor: "pointer", mx: 1 }} onClick={() => navigate("/about")}>
              About • Pricing • Support
            </Typography>
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
}
