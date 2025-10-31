import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";

// verifie si le token est present dans le state auth
// sinon, on redirige vers la page login
export default function ProtectedRoute() {
  const token = useAppSelector((s) => s.auth.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
