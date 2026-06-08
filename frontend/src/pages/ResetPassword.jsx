import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import API from "../api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setMessage("");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

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
      const res = await API.put(`/auth/reset-password/${token}`, {
        password: formData.password,
      });

      setMessage(res.data.message || "Password reset successful.");

      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Password reset failed. Link may be expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-pro-page auth-login-bg">
      <div className="auth-bg-orb auth-bg-orb-one"></div>
      <div className="auth-bg-orb auth-bg-orb-two"></div>

      <div className="auth-pro-shell">
        <div className="auth-pro-info auth-visual-panel">
          <span className="auth-pro-kicker">Secure Reset</span>

          <h1>Create a new password for your account.</h1>

          <p>
            Your reset link is protected and expires automatically for better
            security.
          </p>

          <div className="auth-pro-highlights">
            <div>
              <strong>Encrypted password</strong>
              <span>Your new password is stored securely.</span>
            </div>

            <div>
              <strong>15-minute expiry</strong>
              <span>Reset links expire automatically.</span>
            </div>
          </div>
        </div>

        <div className="auth-pro-card">
          <div className="auth-pro-header">
            <span className="auth-pro-icon">🔑</span>
            <h2>Reset Password</h2>
            <p>Enter and confirm your new password.</p>
          </div>

          {error && <div className="auth-pro-error">{error}</div>}
          {message && <div className="auth-pro-success">{message}</div>}

          <form onSubmit={resetPassword} className="auth-pro-form">
            <label>New Password</label>
            <div className="auth-pro-field">
              <FaLock />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />

              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowPassword((prev) => !prev)}
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
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />

              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button className="auth-pro-submit" type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="auth-pro-bottom">
            Remembered your password? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;