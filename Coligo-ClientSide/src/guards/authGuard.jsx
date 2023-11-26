import React from 'react'
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NotFound from '../NotFound/NotFound';
import { UserContext } from '../context/LoginUser';
import { useDispatch, useSelector } from 'react-redux';

export default function AuthGuard({ children }) {
  // const { name, id, setId, setName } = useContext(UserContext);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { name, id } = useSelector((state) => state);

  function isTokenPresent() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token' && value !== '') {
        return true;
      }
    }
    return false;
  }
  
  if (isTokenPresent()) {
    return children
  } else {
    <NotFound />
    Swal.fire({
      icon: "warning",
      title: "You Must Log in first",
      showCancelButton: true,
      confirmButtonText: "Log in",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }

}
