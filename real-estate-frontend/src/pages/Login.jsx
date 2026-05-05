import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import API from "../api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("loggedInUser", JSON.stringify(res.data));
      window.dispatchEvent(new Event("authChange"));

      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "agent" || res.data.role === "seller") navigate("/agent");
      else navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-pro-page">
      <div className="auth-pro-shell">
        <div className="auth-pro-info">
          <span className="auth-pro-kicker">RealEstatePro</span>
          <h1>Welcome back to your property dashboard.</h1>
          <p>
            Login to save properties, compare homes, send enquiries, and manage your real estate activity securely.
          </p>

          <div className="auth-pro-highlights">
            <div><strong>Verified listings</strong><span>Explore buy and rent properties.</span></div>
            <div><strong>Smart dashboard</strong><span>Track enquiries and saved activity.</span></div>
            <div><strong>Role based access</strong><span>Buyer, agent, seller, and admin flows stay protected.</span></div>
          </div>
        </div>

        <div className="auth-pro-card">
          <div className="auth-pro-header">
            <span className="auth-pro-icon">🔐</span>
            <h2>Login</h2>
            <p>Enter your credentials to continue.</p>
          </div>

          {error && <div className="auth-pro-error">{error}</div>}

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
              />
              <button type="button" className="auth-eye-btn" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="auth-pro-row">
              <span>Secure login</span>
              <Link to="/register">Create buyer account</Link>
            </div>

            <button className="auth-pro-submit" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
