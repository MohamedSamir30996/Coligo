import { Box, Button, Container, Grid, Paper, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig/Coligo";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  let [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDta = async () => {
      try {
        const response = await axiosInstance.get("/subjects");
        if (response.data) {
          console.log(response.data.data.data);
          setSubjects(response.data.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDta();
  }, []);

  const startExam = (subjectId)=>{
    navigate("/exam/"+subjectId);
    console.log(subjectId);
  }
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <h1>Courses</h1>
        <Grid container spacing={3}>
          {subjects.map((subject) => (
            <Grid item xs={12} md={6} lg={6} key={subject._id}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <h1>{subject.subjectTitle}</h1>
                <Button sx={{ mr: 5, ml: 5, mb: 3 }} variant="contained" onClick={()=>{startExam(subject._id)}}>Start Exam</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

