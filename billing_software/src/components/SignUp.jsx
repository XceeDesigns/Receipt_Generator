import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Modal,
} from "@mui/material";
import { Visibility, VisibilityOff, Send } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


// SignUpPage: polished, aligned and consistent with SignIn design
export default function SignUpPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [otp, setOtp] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const backend_url = process.env.REACT_APP_BACKEND_URL;

  // Particles canvas (same behavior as SignIn)
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "ornacloud-particles-signup";
    Object.assign(canvas.style, { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" });
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

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const openOtpModal = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return toast.error("Please fill all required fields");
    }
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await fetch(`${backend_url}/api/user/signup/generate-otp?email=${encodeURIComponent(formData.email)}`, { method: "POST" });
      if (!res.ok) throw new Error();
      setIsOtpModalOpen(true);
      toast.success("OTP sent to your email");
    } catch (err) {
      toast.error("Failed to send OTP");
    }
    setLoading(false);
  };

  const handleValidate = async () => {
    setLoading(true);
    try {
      const verify = await fetch(`${backend_url}/api/user/signup/validate-otp?email=${encodeURIComponent(formData.email)}&otp=${otp}`, { method: "POST" });
      if (!verify.ok) throw new Error();

      const register = await fetch(`${backend_url}/api/user/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!register.ok) throw new Error();

      toast.success("Account created — please login");
      setIsOtpModalOpen(false);
      navigate("/");
    } catch (err) {
      toast.error("OTP invalid or expired");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: { xs: "column", md: "row" }, background: "linear-gradient(135deg,#0c0c0f,#1a1a22)", fontFamily: "Inter" }}>
      {/* left: intro */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", px: { xs: 4, md: 12 }, py: { xs: 6, md: 10 }, gap: 2, color: "white", zIndex: 1 }}>
        <Typography variant="h2" sx={{ fontWeight: 800, fontFamily: "Playfair Display, serif", background: "linear-gradient(90deg,#F7E27D,#C6A667)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", mb: 1, fontSize: { xs: "28px", md: "48px" } }}>
          OrnaCloud
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: "520px", fontWeight: 500 }}>
          Premium receipt & inventory suite for jewellers.
        </Typography>
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.2 }}>
          <Typography sx={{ opacity: 0.85, fontSize: {xs: "12px", md: "15px"} }}>✅ GST-compliant invoices for gold, silver & diamonds</Typography>
          <Typography sx={{ opacity: 0.85, fontSize: {xs: "12px", md: "15px"} }}>✅ Customer warranty & weight records stored securely</Typography>
          <Typography sx={{ opacity: 0.85, fontSize: {xs: "12px", md: "15px"} }}>✅ WhatsApp + PDF instant export</Typography>
          <Typography sx={{ opacity: 0.85, fontSize: {xs: "12px", md: "15px"} }}>✅ Smart metal rate auto-calculation & GST breakups</Typography>
        </Box>
        <Button onClick={() => navigate("/generate-receipt")} sx={{ mt: 3, px: 5, py: 1.4, borderRadius: "10px", background: "linear-gradient(90deg,#F7E27D,#C6A667)", color: "black", fontWeight: 700, textTransform: "none", boxShadow: "0 8px 28px rgba(247,226,125,0.18)", '&:hover': { opacity: 0.95 } }}>
          ⚡ Create Receipt Without Login
        </Button>
      </Box>

      {/* right: signup form (glass) */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 3, md: 6 }, zIndex: 1 }}>
        <Box sx={{ width: "100%", maxWidth: 480, backdropFilter: "blur(22px)", background: "rgba(255,255,255,0.06)", borderRadius: "18px", border: "1px solid rgba(247,226,125,0.12)", p: { xs: 3, md: 5 }, boxShadow: "0 10px 40px rgba(0,0,0,0.45)", display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5" sx={{ textAlign: "center", color: "white", fontWeight: 700 }}>
            Create your Account
          </Typography>
          <Typography sx={{ textAlign: "center", color: "rgba(255,255,255,0.7)" }}>
            Join OrnaCloud - tailor-made receipts & inventory for jewellers
          </Typography>

          <form onSubmit={openOtpModal} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <TextField
              sx={{
                backgroundColor: 'white',
                borderRadius: "16px",
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'black',
                },
              }}
              InputProps={{ disableUnderline: true }}
              name="name"
              label="Full Name"
              variant="filled"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              sx={{
                backgroundColor: 'white',
                borderRadius: "16px",
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'black',
                },
              }}
              InputProps={{ disableUnderline: true }}
              name="email"
              label="Email"
              variant="filled"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
            />

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1, mb: 1 }}>
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: "16px",
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'black',
                  },
                }}
                name="password"
                label="Password"
                variant="filled"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                InputProps={{ disableUnderline: true, endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Visibility /> : <VisibilityOff />}</IconButton></InputAdornment>) }}
              />

              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: "16px",
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'black',
                  },
                }}
                name="confirmPassword"
                label="Confirm Password"
                variant="filled"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                fullWidth
                InputProps={{ disableUnderline: true, endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <Visibility /> : <VisibilityOff />}</IconButton></InputAdornment>) }}
              />
            </Box>

            <Button type="submit" disabled={loading} sx={{ py: 1.4, borderRadius: "10px", fontWeight: 700, background: "linear-gradient(90deg,#F7E27D,#C6A667)", color: "black", textTransform: "none", '&:hover': { filter: "brightness(1.06)" } }}>{loading ? <CircularProgress size={22} /> : "Sign Up"}</Button>

            <Button onClick={() => navigate("/")} sx={{ textTransform: "none", color: "rgba(255,255,255,0.85)" }}>Already have an account? Log in</Button>

            <Box style={{ color: "white" }} sx={{ textAlign: "center", mt: 1 }}>
              <Typography sx={{ fontSize: "13px", opacity: 0.7 }}>🔒 Bank-grade Security • ⚡️ 99.9% Uptime</Typography>
            </Box>
          </form>
        </Box>
      </Box>

      {/* OTP Modal */}
      <Modal 
        open={isOtpModalOpen} 
        onClose={() => setIsOtpModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 380,
            p: 4,
            borderRadius: "18px",
            backdropFilter: "blur(22px)",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(247,226,125,0.25)",
            boxShadow: "0 12px 45px rgba(0,0,0,0.55)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              mb: 2,
              color: "white",
              background: "linear-gradient(90deg,#F7E27D,#C6A667)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🔐 Verify Your OTP
          </Typography>


          <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", mb: 2 }}>
            Enter the 6-digit code sent to your email
          </Typography>


          <TextField
            autoFocus
            fullWidth
            variant="filled"
            value={otp}
            onChange={(e) => setOtp(e.target.value.slice(0, 6))}
            sx={{
              mb: 2,
              // input: { textAlign: "center", fontSize: "20px", letterSpacing: "3px" },
              backgroundColor: 'white',
              borderRadius: "16px",
              '& .MuiInputLabel-root.Mui-focused': {
                  color: 'black',
                },
            }}
             InputProps={{ disableUnderline: true }}
            label="OTP Code"
          />


          <Button
            fullWidth
            onClick={handleValidate}
            disabled={loading || otp.length !== 6}
            sx={{
              py: 1.3,
              borderRadius: "10px",
              fontWeight: 700,
              background: "linear-gradient(90deg,#F7E27D,#C6A667)",
              color: "black",
              textTransform: "none",
              // boxShadow: "0 8px 25px rgba(247,226,125,0.28)",
              '&:hover': { opacity: 0.9 },
            }}
            
          >
            {loading ? <CircularProgress size={22} /> : "Verify OTP"}
          </Button>


          <Typography
            onClick={() => setIsOtpModalOpen(false)}
            sx={{ mt: 2, fontSize: "13px", cursor: "pointer", color: "rgba(255,255,255,0.7)", '&:hover': { color: "white" } }}
          >
            Cancel
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
