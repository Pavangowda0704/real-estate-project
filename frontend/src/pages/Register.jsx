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
      else if (user.role === "agent" || user.role === "seller") navigate("/agent", { replace: true });
      else navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setError("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();

    if (name.length < 3) return setError("Name must be at least 3 characters long.");
    if (formData.password.length < 6) return setError("Password must be at least 6 characters long.");
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match.");

    setLoading(true);

    try {
      await API.post("/auth/register", {
        name,
        email,
        password: formData.password,
        role: "buyer",
      });

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
    <section className="auth-fit-page">
      <div className="auth-fit-card">
        <div className="auth-fit-left">
          <span className="auth-fit-badge">Buyer Registration</span>
          <h1>Create your buyer account</h1>
          <p>
            New users register as buyers by default. Admin can later upgrade
            users to agent, seller, or admin.
          </p>

          <div className="auth-fit-points">
            <div>
              <strong>Buyer only signup</strong>
              <span>No confusing role selection.</span>
            </div>
            <div>
              <strong>Easy property search</strong>
              <span>Browse, compare and enquire easily.</span>
            </div>
            <div>
              <strong>Safe role upgrade</strong>
              <span>Only admin controls advanced roles.</span>
            </div>
          </div>
        </div>

        <div className="auth-fit-right">
          <div className="auth-fit-header">
            <span>🏡</span>
            <h2>Create Account</h2>
            <p>Register to browse properties and send enquiries.</p>
          </div>

          {error && <div className="auth-pro-error">{error}</div>}

          <form onSubmit={registerUser} className="auth-fit-form">
            <label>Full Name</label>
            <div className="auth-fit-field">
              <FaUser />
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <label>Confirm Password</label>
            <div className="auth-fit-field">
              <FaLock />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="auth-fit-note">
              Account type: <strong>Buyer</strong>
            </div>

            <button className="auth-fit-submit" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Buyer Account"}
            </button>
          </form>

          <p className="auth-fit-bottom">
            Already have account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;