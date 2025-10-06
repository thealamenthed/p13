// src/pages/Login.jsx
import {useState} from "react";
import {useLoginMutation} from "../features/user/userApi";
import {useAppDispatch} from "../app/hooks";
import {loggedIn} from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false); // pour coller à la maquette
  const [login, {isLoading, error}] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      dispatch(loggedIn(res.token));
      // (optionnel) persist "remember" dans localStorage si tu veux
      navigate("/profile");
    } catch {
      // l'erreur s'affiche via <p role="alert" />
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        {/* Icône de la maquette (Font Awesome) */}
        <i className="fa fa-user-circle sign-in-icon" aria-hidden="true"></i>

        <h1>Sign In</h1>

        <form onSubmit={onSubmit} aria-busy={isLoading} aria-live="polite">
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input id="username" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" autoFocus required />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <div className="input-remember">
            <input id="remember-me" type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {/* Remplace le <a> statique par un vrai button submit */}
          <button className="sign-in-button" disabled={isLoading || !email || !password}>
            {isLoading ? "Signing in…" : "Sign In"}
          </button>

          {error && (
            <p className="form-error" role="alert">
              Unable to sign in. Check your credentials.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
