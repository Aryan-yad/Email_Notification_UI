import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: #eef2ff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Inter", sans-serif;
`;

const Card = styled.div`
  width: min(400px, 100%);
  background: #ffffff;
  padding: 40px;
  border-radius: 30px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 18px;

  svg {
    width: 48px;
    height: 48px;
    color: #3751ff;
  }
`;

const ToggleContainer = styled.div`
  background: #f3f4f6;
  padding: 6px;
  border-radius: 16px;
  margin: 20px 0 26px 0;
`;

const StyledToggleButton = styled(ToggleButton)`
  && {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    text-transform: none;
    border-radius: 12px;
    font-weight: 600;
    border: none;

    &.Mui-selected {
      background: #ffffff;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      color: #000;
    }
  }
`;

const HintText = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin-top: 6px;
`;

const SignUpLink = styled.span`
  color: #3751ff;
  cursor: pointer;
  font-weight: 600;
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signin", {
        email,
        password,
        role,
      });

      localStorage.setItem("auth", "true");
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login successful!");
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      alert(err.response?.data || "Invalid email or password");
    }
  };

  return (
    <PageWrapper>
      <Card>
        <IconWrapper>
          <NotificationsNoneIcon />
        </IconWrapper>

        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", mb: 0.5 }}>
          NotifyHub
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#6b7280",
            fontSize: "14px",
            mb: 3,
          }}
        >
          Sign in to your account
        </Typography>

        <ToggleContainer>
          <ToggleButtonGroup
            fullWidth
            value={role}
            exclusive
            onChange={(_, newRole: "USER" | "ADMIN" | null) =>
              newRole && setRole(newRole)
            }
          >
            <StyledToggleButton value="USER">User Login</StyledToggleButton>
            <StyledToggleButton value="ADMIN">Admin Login</StyledToggleButton>
          </ToggleButtonGroup>
        </ToggleContainer>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* EMAIL */}
          <div>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>Email</Typography>

            <TextField
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon sx={{ fontSize: 20 }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: "10px" },
              }}
            />

            <HintText>Tip: Use admin@example.com for admin access</HintText>
          </div>

          {/* PASSWORD */}
          <div>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>Password</Typography>

            <TextField
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: "10px" },
              }}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 1,
              background: "#000",
              height: "46px",
              borderRadius: "10px",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { background: "#111" },
            }}
          >
            Sign In
          </Button>
        </form>

        <Typography
          sx={{
            textAlign: "center",
            mt: 2,
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          Don’t have an account?{" "}
          <SignUpLink onClick={() => navigate("/signup")}>Sign up</SignUpLink>
        </Typography>
      </Card>
    </PageWrapper>
  );
};

export default Login;



