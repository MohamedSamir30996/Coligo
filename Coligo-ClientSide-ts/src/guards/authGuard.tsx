import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NotFound from '../NotFound/NotFound.tsx';
import { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
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
