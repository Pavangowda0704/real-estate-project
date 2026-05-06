import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import API from "../api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      else if (user.role === "agent" || user.role === "seller") {
        navigate("/agent", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setError("");
    setMessage("");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      const res = await API.post("/auth/login", payload);

      localStorage.setItem("loggedInUser", JSON.stringify(res.data));
      window.dispatchEvent(new Event("authChange"));

      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "agent" || res.data.role === "seller") {
        navigate("/agent");
      } else {
        navigate("/dashboard");
      }
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

      setMessage(
        res.data?.message ||
          "If this email exists, password reset instructions have been sent."
      );

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
    <section className="auth-pro-page auth-login-bg">
      <div className="auth-bg-orb auth-bg-orb-one"></div>
      <div className="auth-bg-orb auth-bg-orb-two"></div>

      <div className="auth-pro-shell">
        <div className="auth-pro-info auth-visual-panel">
          <span className="auth-pro-kicker">RealEstatePro</span>

          <h1>Welcome back to your property command center.</h1>

          <p>
            Login to manage saved homes, compare properties, send enquiries, and
            access your role-based dashboard.
          </p>

          <div className="auth-hero-card">
            <div>
              <span>Premium Listings</span>
              <strong>120+</strong>
            </div>
            <div>
              <span>Verified Enquiries</span>
              <strong>Fast</strong>
            </div>
          </div>

          <div className="auth-pro-highlights">
            <div>
              <strong>Buyer dashboard</strong>
              <span>Saved properties, comparisons, and enquiries.</span>
            </div>

            <div>
              <strong>Seller / Agent tools</strong>
              <span>Post and manage your own listings safely.</span>
            </div>

            <div>
              <strong>Admin control</strong>
              <span>Manage users, properties, leads, and enquiries.</span>
            </div>
          </div>
        </div>

        <div className="auth-pro-card">
          <div className="auth-pro-header">
            <span className="auth-pro-icon">{showForgot ? "🔑" : "🔐"}</span>
            <h2>{showForgot ? "Forgot Password" : "Login"}</h2>
            <p>
              {showForgot
                ? "Enter your registered email to request password reset."
                : "Enter your credentials to continue."}
            </p>
          </div>

          {error && <div className="auth-pro-error">{error}</div>}
          {message && <div className="auth-pro-success">{message}</div>}

          {!showForgot ? (
            <form onSubmit={loginUser} className="auth-pro-form">
              <label>Email Address</label>
              <div className="auth-pro-field">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>

              <label>Password</label>
              <div className="auth-pro-field">
                <FaLock />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="auth-pro-row">
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => {
                    setShowForgot(true);
                    setForgotEmail(formData.email);
                    setError("");
                    setMessage("");
                  }}
                >
                  Forgot password?
                </button>

                <Link to="/register">Create buyer account</Link>
              </div>

              <button
                className="auth-pro-submit"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login to Dashboard"}
              </button>
            </form>
          ) : (
            <form onSubmit={forgotPassword} className="auth-pro-form">
              <label>Registered Email</label>
              <div className="auth-pro-field">
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="example@mail.com"
                  value={forgotEmail}
                  onChange={(e) => {
                    setForgotEmail(e.target.value);
                    setError("");
                    setMessage("");
                  }}
                  required
                  autoComplete="email"
                />
              </div>

              <button
                className="auth-pro-submit"
                type="submit"
                disabled={forgotLoading}
              >
                {forgotLoading ? "Sending..." : "Send Reset Instructions"}
              </button>

              <button
                type="button"
                className="auth-secondary-btn"
                onClick={() => {
                  setShowForgot(false);
                  setError("");
                  setMessage("");
                }}
              >
                Back to Login
              </button>
            </form>
          )}

          <p className="auth-pro-bottom">
            New to RealEstatePro? <Link to="/register">Register as Buyer</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;