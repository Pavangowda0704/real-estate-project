import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import API from "../api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();

    if (name.length < 3) {
      setError("Name must be at least 3 characters long.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name,
        email,
        password: formData.password,
        role: "buyer",
      };

      await API.post("/auth/register", payload);

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-pro-page auth-register-page">
      <div className="auth-pro-shell">
        <div className="auth-pro-info">
          <span className="auth-pro-kicker">Buyer Registration</span>

          <h1>Create your buyer account and start finding homes.</h1>

          <p>
            Every new user is registered as a buyer by default. Admin can later
            upgrade users to seller, agent, or admin when needed.
          </p>

          <div className="auth-pro-highlights">
            <div>
              <strong>Buyer only signup</strong>
              <span>No role selection shown to users.</span>
            </div>

            <div>
              <strong>Property discovery</strong>
              <span>Browse, compare, and enquire easily.</span>
            </div>

            <div>
              <strong>Safe upgrade flow</strong>
              <span>Only admin controls seller, agent, and admin roles.</span>
            </div>
          </div>
        </div>

        <div className="auth-pro-card">
          <div className="auth-pro-header">
            <span className="auth-pro-icon">🏡</span>
            <h2>Create Buyer Account</h2>
            <p>Register to browse properties and send enquiries.</p>
          </div>

          {error && <div className="auth-pro-error">{error}</div>}

          <form onSubmit={registerUser} className="auth-pro-form">
            <label>Full Name</label>
            <div className="auth-pro-field">
              <FaUser />
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>

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
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
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

            <label>Confirm Password</label>
            <div className="auth-pro-field">
              <FaLock />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />

              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="auth-role-note">
              Account type: <strong>Buyer</strong>
            </div>

            <button className="auth-pro-submit" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Buyer Account"}
            </button>
          </form>

          <p className="auth-pro-bottom">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;