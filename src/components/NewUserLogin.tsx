import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {
  FiBell,
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

/* --- Styled Components --- */

const PageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f4eefe, #eef1ff);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Inter", sans-serif;
  padding: 20px;
  box-sizing: border-box;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  padding: 32px 36px;
  border-radius: 28px;
  box-shadow: 0px 10px 28px rgba(0, 0, 0, 0.12);
  text-align: center;
  box-sizing: border-box;
`;

const IconWrapper = styled.div`
  svg {
    width: 52px;
    height: 52px;
    padding: 14px;
    border-radius: 14px;
    background: #eef2ff;
    color: #3751ff;
  }
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
`;

const Title = styled.h2`
  font-weight: 700;
  color: #111827;
  margin-bottom: 6px;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 28px;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #9ca3af;
`;

const PasswordToggleIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  font-size: 20px;
  color: #9ca3af;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  height: 46px;
  padding: 10px 42px;
  padding-left: 42px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3751ff;
    background: #ffffff;
  }
`;

interface ButtonProps {
  loading: boolean;
}

const Button = styled.button<ButtonProps>`
  width: 100%;
  height: 48px;
  background: ${(p) => (p.loading ? "#9aa0ff" : "#000")};
  color: white;
  border: none;
  border-radius: 12px;
  margin-top: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: ${(p) => (p.loading ? "not-allowed" : "pointer")};
  transition: 0.25s;

  &:hover {
    background: ${(p) => (p.loading ? "#9aa0ff" : "#111")};
  }
`;

const ErrorBox = styled.div`
  background: #fee2e2;
  color: #b91c1c;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #fca5a5;
  margin-bottom: 12px;
  font-size: 14px;
  text-align: center;
`;

const CenterText = styled.p`
  font-size: 14px;
  margin-top: 20px;
  color: #6b7280;

  a {
    color: #3751ff;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

/* --- Component --- */

const Signup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [gmail, setGmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErrorMsg("");

    if (!name || !gmail || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8080/user/SaveUser", {
        name,
        gmail,
        password,
        role: "USER",
      });

      navigate("/login");
    } catch (error: any) {
      setErrorMsg(
        error?.response?.data?.message ||
          "Failed to create user. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Card>
        <IconWrapper>
          <FiBell />
        </IconWrapper>

        <Title>Create Account</Title>
        <Subtitle>Get started with NotifyHub</Subtitle>

        {errorMsg && <ErrorBox>{errorMsg}</ErrorBox>}

        {/* NAME */}
        <Label>Name</Label>
        <InputWrapper>
          <InputIcon>
            <FiUser />
          </InputIcon>
          <Input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </InputWrapper>

        {/* EMAIL */}
        <Label>Email</Label>
        <InputWrapper>
          <InputIcon>
            <FiMail />
          </InputIcon>
          <Input
            type="email"
            placeholder="you@example.com"
            value={gmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setGmail(e.target.value)
            }
          />
        </InputWrapper>

        {/* PASSWORD */}
        <Label>Password</Label>
        <InputWrapper>
          <InputIcon>
            <FiLock />
          </InputIcon>

          <Input
            type={showPass ? "text" : "password"}
            placeholder="********"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />

          <PasswordToggleIcon onClick={() => setShowPass(!showPass)}>
            {showPass ? <FiEyeOff /> : <FiEye />}
          </PasswordToggleIcon>
        </InputWrapper>

        {/* SUBMIT BUTTON */}
        <Button loading={loading} onClick={handleSubmit}>
          {loading ? "Creating..." : "Create Account"}
        </Button>

        <CenterText>
          Already have an account? <a onClick={() => navigate("/login")}>Sign in</a>
        </CenterText>
      </Card>
    </PageWrapper>
  );
};

export default Signup;
