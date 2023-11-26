import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CampaignIcon from '@mui/icons-material/Campaign';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import axiosInstance from '../axiosConfig/Coligo';
export default function SideMenu() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState('Dashboard');

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
  };

  const goToDashboard = () => {
    navigate("/dashboard")
  }
  const goToCourses = () => {
    navigate("/courses")
  }
  const goToAnnouncement = () => {
    navigate("/announcements")
  }

  const logout = () => {
    axiosInstance.post("/users/logout")
    navigate("/")
  }

  return (
    <React.Fragment>
      <ListItemButton onClick={() => {
        handleItemClick('Dashboard');
        goToDashboard();
      }}
        className={selectedItem === 'Dashboard' ? 'selected' : ''}>
        <ListItemIcon className={selectedItem === 'Dashboard' ? 'selected' : ''}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => {
        handleItemClick('Schedule');
      }}
        className={selectedItem === 'Schedule' ? 'selected' : ''}>
        <ListItemIcon className={selectedItem === 'Schedule' ? 'selected' : ''}>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="Schedule" />
      </ListItemButton>
      <ListItemButton onClick={() => {
        handleItemClick('Courses');
        goToCourses();
      }}
        className={selectedItem === 'Courses' ? 'selected' : ''}>
        <ListItemIcon className={selectedItem === 'Courses' ? 'selected' : ''}>
          <LibraryBooksIcon />
        </ListItemIcon>
        <ListItemText primary="Courses" />
      </ListItemButton>
      <ListItemButton onClick={() => {
        handleItemClick('Gradebook');
      }}
        className={selectedItem === 'Gradebook' ? 'selected' : ''}>
        <ListItemIcon className={selectedItem === 'Gradebook' ? 'selected' : ''}>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Gradebook" />
      </ListItemButton>
      <ListItemButton onClick={() => {
        handleItemClick('Performance');
      }}
        className={selectedItem === 'Performance' ? 'selected' : ''}>
        <ListItemIcon className={selectedItem === 'Performance' ? 'selected' : ''}>
          <TrendingUpIcon />
        </ListItemIcon>
        <ListItemText primary="Performance" />
      </ListItemButton>
      <ListItemButton onClick={() => {
        handleItemClick('Announcement');
        goToAnnouncement();
      }}
        className={selectedItem === 'Announcement' ? 'selected' : ''}>
        <ListItemIcon className={selectedItem === 'Announcement' ? 'selected' : ''}>
          <CampaignIcon />
        </ListItemIcon>
        <ListItemText primary="Announcement" />
      </ListItemButton>
      <ListItemButton onClick={logout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItemButton>
    </React.Fragment>
  )

}