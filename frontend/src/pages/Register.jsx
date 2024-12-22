import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { TextField, Button, Box, Typography, Link, Paper } from "@mui/material";

const Register = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(credentials.username, credentials.password);
      navigate("/");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 3,
        backgroundColor: "#fff",
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
          backgroundColor: "#f7f7f7",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, color: "#333" }} gutterBottom>
          Register
        </Typography>
        <TextField
          label="Username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          margin="normal"
          fullWidth
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
            "& .MuiInputBase-root": {
              borderRadius: 1,
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          margin="normal"
          fullWidth
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
            "& .MuiInputBase-root": {
              borderRadius: 1,
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: "1rem",
            borderRadius: 3,
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          Register
        </Button>
        <Typography sx={{ mt: 2, textAlign: "center", color: "#555" }}>
          Already have an account?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/")}
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
