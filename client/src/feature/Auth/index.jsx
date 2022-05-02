import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../redux/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const Auth = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  // eslint-disable-next-line
  const state = useSelector((state) => state.auth);

  useEffect(() => {
    if (id.length === 10) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }, [id]);

  useEffect(() => {
    const autoLogin = async () => {
      const studentId = localStorage.getItem("studentID");
      if (studentId) {
        try {
          const action = await loginAsync({ studentID: id });
          const actionResult = await dispatch(action);
          await unwrapResult(actionResult);
          navigate("/timetable");
        } catch (error) {
          console.log("auto login and fetching data have been fail");
        }
      }
    };
    autoLogin();
  }, [dispatch, id, navigate]);

  const handleSubmit = async (e) => {
    try {
      const action = await loginAsync({ studentID: id });
      const actionResult = await dispatch(action);
      await unwrapResult(actionResult);
      navigate("/timetable");
    } catch (error) {
      console.log("error" + error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter your studentID
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            error={state.error !== "" ? true : false}
            name="studentID"
            margin="normal"
            fullWidth
            id="studentID"
            label="Student ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            helperText={state.error.message}
          />
          <LoadingButton
            loading={state.loading}
            variant="contained"
            fullWidth
            disabled={toggle}
            onClick={handleSubmit}>
            Confirm
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Auth;
