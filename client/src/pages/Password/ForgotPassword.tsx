import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./forgotPassword.css";

const URL = process.env.REACT_APP_API_URL;

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    console.log(email);

    try {
      console.log(`${URL}/users/forgotPassword`);
      const response = await axios.post(`${URL}/users/forgotPassword`, {
        email,
      });

      // Truy cập dữ liệu trả về qua response.data
      setMessage("Liên kết đặt lại mật khẩu đã được gửi tới email của bạn.");
    } catch (err: any) {
      if (err.response && err.response.data?.message) {
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
        className="border rounded p-4 shadow-sm bg-white"
      >
        <h1 className="h3 mb-3 mb-sm-5 fw-semibold text-center">
          Quên mật khẩu
        </h1>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold ">
            Địa chỉ Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            style={{ height: "50px" }}
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <p className="mt-3">
          Vui lòng nhập địa chỉ email để nhận liên kết đặt lại mật khẩu.
        </p>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <button
          type="submit"
          className="btn btn-dark py-2 px-4 mx-auto d-block forgot-btn fw-bold"
          disabled={loading}
        >
          {loading ? "Đang gửi..." : "Đặt lại mật khẩu"}
        </button>
        <div className="text-center mt-3 fw-bold">
          <Link to="/signin" className="text-decoration-none">
            ← Quay lại đăng nhập
          </Link>
        </div>

        {/* <p className="mt-5 mb-3 text-body-secondary text-center">
          E-commerce Shop
        </p> */}
      </form>
    </main>
  );
};

export default ForgotPassword;
