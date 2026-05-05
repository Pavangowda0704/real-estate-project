import { useState } from "react";
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

  const handleChange = (e) => {
    setError("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");

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
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: "buyer",
      };

      const res = await API.post("/auth/register", payload);

      localStorage.setItem("loggedInUser", JSON.stringify(res.data));
      window.dispatchEvent(new Event("authChange"));
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
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
            Every new user is registered as a buyer by default. Admin can later upgrade users to seller, agent, or admin when needed.
          </p>

          <div className="auth-pro-highlights">
            <div><strong>Buyer only signup</strong><span>No role selection shown to users.</span></div>
            <div><strong>Property discovery</strong><span>Browse, compare, and enquire easily.</span></div>
            <div><strong>Safe upgrade flow</strong><span>Only admin controls advanced roles.</span></div>
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
              <input name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
            </div>

            <label>Email Address</label>
            <div className="auth-pro-field">
              <FaEnvelope />
              <input type="email" name="email" placeholder="example@mail.com" value={formData.email} onChange={handleChange} required />
            </div>

            <label>Password</label>
            <div className="auth-pro-field">
              <FaLock />
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Create password" value={formData.password} onChange={handleChange} required />
              <button type="button" className="auth-eye-btn" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <label>Confirm Password</label>
            <div className="auth-pro-field">
              <FaLock />
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} required />
              <button type="button" className="auth-eye-btn" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="auth-role-note">Account type: <strong>Buyer</strong></div>

            <button className="auth-pro-submit" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Buyer Account"}
            </button>
          </form>

          <p className="auth-pro-bottom">Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </section>
  );
}

export default Register;
