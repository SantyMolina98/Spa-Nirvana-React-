import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function ProtectedAdmin({children}) {
  const { isAuthenticated, isAdmin } = useContext(UserContext);

  if (isAuthenticated && isAdmin) {
    return children;
  } else{
    return <Navigate to="/" />;
  }
}
