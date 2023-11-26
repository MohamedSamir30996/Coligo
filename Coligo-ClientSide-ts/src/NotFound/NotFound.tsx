import { Box, Container, Toolbar } from '@mui/material'

export default function NotFound() {
    return (
      <Box
    component="main"
    sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      flexGrow: 1,
      height: "97vh",
      overflow: "auto",
    }}
  >
    <Toolbar />
  <Container maxWidth="lg" >

  <img src="./notfound.png" alt="" className='error'/>
  </Container>
    </Box>
  )
}
