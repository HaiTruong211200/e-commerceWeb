// src/components/UserProfile.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "shared/services/auth/userService";
import EditInfoModal from "./EditInfoModal";
import ChangePasswordModal from "./ChangePassword";
import "./userProfile.css";
import axios from "axios";
import { addToast } from "shared/components/toast/toastSlice";
import { useDispatch } from "react-redux";

const URL = process.env.REACT_APP_API_URL;

interface UserProfileProps {
  id: string;
  displayName: string;
  email: string;
  phone: string;
  photoUrl: string;
  address: string;
  role: string;
}

const getRoleBadge = (role?: string) => {
  switch (role) {
    case "admin":
      return <span className="badge bg-danger bg-lg badge-res">Admin</span>;
    case "user":
      return <span className="badge bg-success bg-lg badge-res">User</span>;
  }
};

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserProfileProps | null>(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showEditInfoModal, setShowEditInfoModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const showToast = (
    message: string,
    type: "success" | "error" | "info",
    link?: string
  ) => {
    dispatch(addToast({ message, type, link }));
  };

  const handleUpdateInfo = async (updatedInfo: {
    displayName: string;
    phone: string;
    address: string;
  }) => {
    const { displayName, phone, address } = updatedInfo; // ✅ destructure

    try {
      await userService.updateInfor({
        ...user,
        displayName,
        phone,
        address,
      });
      setIsDirty(false);

      setUser((prev: UserProfileProps | null) =>
        prev ? { ...prev, ...updatedInfo } : prev
      );
      showToast("Cập nhật thông tin tài khoàn thành công", "success");
    } catch (error) {
      showToast("Lỗi khi cập nhật thông tin tài khoàn!", "error");
    }
  };

  const handleUpdatePassword = async (updatedPassword: {
    currentPassword: string;
    password: string;
    passwordConfirm: string;
  }) => {
    const { currentPassword, password, passwordConfirm } = updatedPassword; // ✅ destructure

    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${URL}/users/updateMyPassword`,
        {
          currentPassword,
          password,
          passwordConfirm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        showToast("Đổi mật khẩu thành công", "success");
      } else {
        showToast("Lỗi khi đổi mật khẩu", "error");
      }
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      showToast("Lỗi khi đổi mật khẩu", "error");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await userService.getMe();
        const user = response.data.data.user;
        setUser(user);
        setAddress(user.address ?? "");
        setPhone(user.phone ?? "");
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  // GG Signout ---------------------------
  const logOut = async () => {
    try {
      await userService.logOut();
      localStorage.removeItem("token");
      navigate("/");
    } catch (e) {
      console.error("Error during logout:", e);
    }
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    setIsValid(validatePhone(newPhone));
    setIsDirty(true);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setIsDirty(true);
  };

  // const handleUpdateInfo = async () => {
  //   if (isValid) {
  //     try {
  //       await userService.updateInfor({
  //         ...user,
  //         phone,
  //         address,
  //       });
  //       setIsDirty(false);
  //     } catch (error) {
  //       console.error("Error updating user info:", error);
  //     }
  //   }
  // };
  return (
    <div className="card shadow-sm rounded-4 p-3 user-container">
      {/* Header */}
      <div className="d-flex gap-2 gap-sm-4 flex-column align-items-center">
        <div className="d-flex justify-content-between align-items-center pb-1 gap-5 flex-sm-row">
          <div className="d-flex align-items-center flex-column gap-2">
            <img
              src={user?.photoUrl}
              alt="Avatar"
              className="rounded-circle me-3 avt"
              style={{ objectFit: "cover" }}
            />
            <div className="d-flex align-items-center flex-column gap-2">
              <small className="text-muted">{user?.email}</small>
              <div className="mt-1">{getRoleBadge(user?.role)}</div>
            </div>
          </div>
        </div>

        {/* Info List */}
        <div className="d-flex flex-column w-100 fs-res gap-2 gap-sm-3">
          <div
            className="d-flex justify-content-between py-2 border-bottom w-100 p-2 align-items-center"
            style={{ width: "fit-content", minWidth: 300 }}
          >
            <span className="text-muted">Name</span>
            <span>{user?.displayName}</span>
          </div>
          <div className="d-flex justify-content-between py-2 border-bottom p-2">
            <span className="text-muted">Email account</span>
            <span>{user?.email}</span>
          </div>
          <div className="d-flex justify-content-between py-2 border-bottom p-2">
            <span className="text-muted">Mobile number</span>
            <span className="text-primary">{user?.phone}</span>
          </div>
          <div className="d-flex justify-content-between py-2 p-2 border-bottom">
            <span className="text-muted">Address</span>
            <span>{user?.address}</span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="d-flex my-2 align-items-center justify-content-between">
        <button
          className="btn btn-primary rounded m-auto fs-res"
          onClick={() => setShowEditInfoModal(true)}
        >
          Thay đổi thông tin
        </button>
        <button
          className="btn btn-primary rounded m-auto fs-res"
          onClick={() => setShowChangePassword(true)}
        >
          Thay đổi mật khẩu
        </button>
      </div>

      <EditInfoModal
        showModal={showEditInfoModal}
        handleClose={() => setShowEditInfoModal(false)}
        handleSubmit={(updatedInfo) => {
          console.log("Thông tin mới:", updatedInfo);
          handleUpdateInfo(updatedInfo);
          // Gửi lên server hoặc cập nhật state tại đây
        }}
        initialInfo={{
          displayName: user?.displayName,
          phone: user?.phone,
          address: user?.address,
        }}
      />

      <ChangePasswordModal
        show={showChangePassword}
        handleClose={() => setShowChangePassword(false)}
        handleSubmit={handleUpdatePassword}
      />
    </div>
  );
};

export default UserProfile;
