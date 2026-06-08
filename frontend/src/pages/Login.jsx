import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import API from "../api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user?.token) {
      if (user.role === "admin") navigate("/admin", { replace: true });
      else if (user.role === "agent" || user.role === "seller") navigate("/agent", { replace: true });
      else navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setError("");
    setMessage("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await API.post("/auth/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      localStorage.setItem("loggedInUser", JSON.stringify(res.data));
      window.dispatchEvent(new Event("authChange"));

      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "agent" || res.data.role === "seller") navigate("/agent");
      else navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await API.post("/auth/forgot-password", {
        email: forgotEmail.trim().toLowerCase(),
      });

      setMessage(res.data?.message || "If this email exists, reset instructions have been sent.");
      setForgotEmail("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to send reset email. Please try again."
      );
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <section className="auth-fit-page">
      <div className="auth-fit-card">
        <div className="auth-fit-left">
          <span className="auth-fit-badge">RealEstatePro</span>
          <h1>Welcome back</h1>
          <p>
            Login to access your dashboard, manage enquiries, compare properties,
            and continue your real estate journey.
          </p>

          <div className="auth-fit-points">
            <div>
              <strong>Buyer</strong>
              <span>Save, compare and enquire properties.</span>
            </div>
            <div>
              <strong>Agent / Seller</strong>
              <span>Manage your own property listings.</span>
            </div>
            <div>
              <strong>Admin</strong>
              <span>Control users, properties and enquiries.</span>
            </div>
          </div>
        </div>

        <div className="auth-fit-right">
          <div className="auth-fit-header">
            <span>{showForgot ? "🔑" : "🔐"}</span>
            <h2>{showForgot ? "Forgot Password" : "Login"}</h2>
            <p>
              {showForgot
                ? "Enter your registered email."
                : "Enter your credentials to continue."}
            </p>
          </div>

          {error && <div className="auth-pro-error">{error}</div>}
          {message && <div className="auth-pro-success">{message}</div>}

          {!showForgot ? (
            <form onSubmit={loginUser} className="auth-fit-form">
              <label>Email Address</label>
              <div className="auth-fit-field">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <label>Password</label>
              <div className="auth-fit-field">
                <FaLock />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="auth-fit-row">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgot(true);
                    setForgotEmail(formData.email);
                    setError("");
                    setMessage("");
                  }}
                >
                  Forgot password?
                </button>

                <Link to="/register">Create account</Link>
              </div>

              <button className="auth-fit-submit" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          ) : (
            <form onSubmit={forgotPassword} className="auth-fit-form">
              <label>Registered Email</label>
              <div className="auth-fit-field">
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="example@mail.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </div>

              <button className="auth-fit-submit" type="submit" disabled={forgotLoading}>
                {forgotLoading ? "Sending..." : "Send Reset Link"}
              </button>

              <button
                type="button"
                className="auth-fit-secondary"
                onClick={() => setShowForgot(false)}
              >
                Back to Login
              </button>
            </form>
          )}

          <p className="auth-fit-bottom">
            New user? <Link to="/register">Register as Buyer</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;