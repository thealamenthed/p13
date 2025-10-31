// src/pages/Login.jsx
import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {useLoginMutation} from "../features/user/userApi";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false
  });

  const [login, {isLoading, error}] = useLoginMutation();

  const onChange = (e) => {
    const {name, value, type, checked} = e.target;
    setForm((f) => ({...f, [name]: type === "checkbox" ? checked : value}));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({email: form.email, password: form.password}).unwrap();
      // renvoyer { token } ou { status, message, body: { token } }
      const token = res?.body?.token || res?.token;
      if (!token) throw new Error("Token manquant dans la réponse");
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  const serverError = error?.data?.message || error?.error;

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" aria-hidden="true"></i>
        <h1>Sign In</h1>

        <form onSubmit={onSubmit} noValidate>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input id="email" name="email" type="email" autoComplete="username" value={form.email} onChange={onChange} required />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" value={form.password} onChange={onChange} required />
          </div>

          <div className="input-remember">
            <input id="remember-me" name="remember" type="checkbox" checked={form.remember} onChange={onChange} />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {serverError && (
            <p className="form-error" role="alert" style={{marginTop: 8}}>
              {serverError || "Unable to sign in. Check your credentials."}
            </p>
          )}

          <button className="sign-in-button" type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{marginTop: 12}}>
          <Link to="/">Back to home</Link>
        </p>
      </section>
    </main>
  );
}
