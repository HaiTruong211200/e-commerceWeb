import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./forgotPassword.css";

const URL = process.env.REACT_APP_API_URL;

const ResetPasswordForm = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(token);
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch(
        `${URL}/users/resetPassword/${token}`,
        {
          password,
          passwordConfirm: confirmPassword,
        }
      );

      if (response.data.status === "success") {
        setMessage("Mật khẩu đã được đặt lại thành công.");
      } else setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="form-signin my-form">
      <h3 className="fw-bolder d-flex justify-content-center align-items-center gap-3">
        E-COMMERCE{" "}
        <button className="btn btn-dark fs-4 text-decoration-none" disabled>
          SHOP
        </button>
      </h3>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm"
        style={{ maxWidth: 400 }}
      >
        <h1 className="h3 mb-4 fw-normal text-center fw-semibold">
          Đặt lại mật khẩu
        </h1>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <div className="form-floating mb-2 position-relative">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="newPassword"
            placeholder="Mật khẩu mới"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="newPassword">Mật khẩu mới</label>
          <i
            className={`bi fs-6 ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
            style={{
              //   position: "absolute",
              //   right: "20px",
              //   top: "50%",
              //   transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#010101",
            }}
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>

        <div className="form-floating mb-3 position-relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="form-control"
            id="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
          <i
            className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#6c757d",
            }}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          />
        </div>

        <button
          className="btn btn-dark w-100 py-2 forgot-btn fw-bold"
          type="submit"
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
        </button>

        <p className="mt-3 mb-0 text-center fw-bold">
          <Link to="/signin" className="text-decoration-none">
            Quay lại đăng nhập
          </Link>
        </p>

        {/* <p className="mt-5 mb-3 text-body-secondary text-center">© 2017–2025</p> */}
      </form>
    </main>
  );
};

export default ResetPasswordForm;
