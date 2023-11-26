import { Box, Container, Grid, Paper, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig/Coligo";

export default function Announcement() {
  let [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchDta = async () => {
      try {
        const response = await axiosInstance.get("/announcements");
        if (response.data) {
          console.log(response.data.data.data);
          setAnnouncements(response.data.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDta();
  }, []);

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
        <h1>Announcements</h1>
        <Grid container spacing={3}>
          {announcements.map((announcement) => (
            <Grid item xs={12} key={announcement._id}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <h1>{announcement.announcementTitle}</h1>
                <p>{announcement.announcementBody}</p>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
