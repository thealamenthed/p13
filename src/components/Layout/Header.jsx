import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {logout} from "../../features/auth/authSlice";
import {useGetProfileQuery} from "../../features/user/userApi";

export default function Header() {
  const token = useAppSelector((s) => s.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {data: profile} = useGetProfileQuery(undefined, {skip: !token});

  const onSignOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img className="main-nav-logo-image" src="/img/argentBankLogo.png" alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {token ?
            <>
              <Link className="main-nav-item" to="/profile">
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                <span style={{marginLeft: 4}}>{profile?.body.firstName || "Profile"}</span>
              </Link>
              <Link className="main-nav-item" to="/" onClick={onSignOut}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                <span style={{marginLeft: 4}}>Sign Out</span>
              </Link>
            </>
          : <Link className="main-nav-item" to="/login">
              <i className="fa fa-user-circle" aria-hidden="true"></i>
              <span style={{marginLeft: 4}}>Sign In</span>
            </Link>
          }
        </div>
      </nav>
    </header>
  );
}
