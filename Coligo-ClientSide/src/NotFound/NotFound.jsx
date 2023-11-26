import { Box, Container, Toolbar } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate()
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
