import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Avatar, Button } from "@mui/material";

export default function Dashboard() {
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
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    px:5,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
              <Grid item xs={12} md={8} lg={8}>
                  <h1>Exams Times</h1>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis rem accusantium sequi tenetur? Animi similique ipsum voluptate libero ut at molestiae, quaerat dolorum explicabo quos. Nulla amet ullam culpa debitis.</p>
                  <Button sx={{ mb: 3 }} variant="contained">View Exams Tips</Button>
              </Grid>
              <Grid item xs={0} md={4} lg={4}>
                <img src="img_2.svg" alt="" />
              </Grid>
              </Paper>
              </Grid>
              
              <Grid item xs={12} md={8} lg={9}>
              <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3>Announcements</h3>
                  <Grid item xs={12}  
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems:"center",
                    flexDirection: "row",
                  }}>
                    <Avatar>
                      M
                    </Avatar>
                    <div>
                    <h4 className="m-0 px-4">Mr.Ahmed</h4>
                    <span className="m-0 text-gray fs-1 px-4">Math 101</span>
                    </div>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quod consectetur suscipit voluptate.</p>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
              <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                <h4 className="m-0">What's due</h4>
                <span className="text-gray fs-1 mb-4">Lorem, ipsum dolor sit</span>
                <h5 className="m-0 align-center">
                  <HourglassTopTwoToneIcon/> <span>Unit 2 quiz</span></h5>
                <span className="text-gray fs-1 mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. </span>
                <Button variant="outlined">Start quiz</Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
  );
}
