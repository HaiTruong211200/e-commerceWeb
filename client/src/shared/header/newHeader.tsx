import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./newHeader.css";
import userService from "shared/services/auth/userService";
import { FaShoppingCart } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

interface User {
  photoUrl: string;
  displayName: string;
  role: string;
}

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userService.getMe();
        console.log(user);
        if (user) {
          setUser(user.data.data.user ?? {});
        }
      } catch (err) {}
    };

    fetchUser();
  }, [navigate]);

  const handleLogin = () => {
    navigate("/signin");
  };
  const handleLogout = async () => {
    try {
      await userService.logOut();
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (e) {
      console.error("Error during logout:", e);
    }
  };

  return (
    <>
      <header
        className="p-sm-3 border-bottomfixed-top bg-white shadow-sm position-relative"
        style={{ zIndex: 999 }}
      >
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-start">
            <button
              onClick={() => navigate("/")}
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none btn"
            >
              <img src="/logoe32.png" width="36" height="36" />
              <img src="/logoc32.png" width="36" height="36" />
            </button>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 d-none d-lg-flex">
              <li>
                <button
                  onClick={() => navigate("/woman")}
                  className="nav-link px-2 link-secondary"
                >
                  Thời trang nữ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/men")}
                  className="nav-link px-2 link-body-emphasis"
                >
                  Thời trang nam
                </button>
              </li>
              {/* <li>
                <button
                  onClick={() => navigate("/customers")}
                  className="nav-link px-2 link-body-emphasis"
                >
                  Mua sắm
                </button>
              </li> */}
            </ul>

            <div className="d-flex flex-row justify-content-between gap-2 align-items-center">
              {/* <form className="w-75 mb-2 mb-lg-0 me-lg-3" role="search">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form> */}

              <button
                onClick={() => navigate("/cart")}
                className="btn btn-light btn-rs"
                title="Giỏ hàng"
              >
                <i
                  className="header-icon cart pi pi-shopping-cart d-flex align-items-center"
                  onClick={() => navigate("cart")}
                ></i>
                {/* <FaShoppingCart /> */}
              </button>

              <button
                onClick={() => navigate("/order")}
                className="btn btn-light btn-rs"
                title="Đơn hàng"
              >
                <i
                  className="header-icon wish-list pi pi-inbox d-flex align-items-center"
                  onClick={() => navigate("order")}
                ></i>
                {/* <FaClipboardCheck /> */}
              </button>

              {user?.role === "admin" ? (
                <button
                  onClick={() => navigate("/admin")}
                  className="btn btn-light btn-rs"
                  title="Quản lý"
                >
                  <i
                    className="header-icon admin pi pi-shield d-flex align-items-center"
                    onClick={() => navigate("/admin")}
                  ></i>
                  {/* <FaClipboardCheck /> */}
                </button>
              ) : null}

              <button
                className="btn btn-rs d-sm-none"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileSidebar"
                aria-controls="mobileSidebar"
              >
                <i className="header-icon pi pi-list d-flex align-items-center"></i>
                {/* <IoMdMenu size={30} /> */}
              </button>

              <div className="dropdown text-end d-none d-lg-flex">
                {user ? (
                  <button
                    className="d-block link-body-emphasis text-decoration-none dropdown-toggle btn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={user?.photoUrl}
                      alt="User Avatar"
                      width="42"
                      height="42"
                      className="rounded-circle"
                    />
                  </button>
                ) : (
                  <button onClick={handleLogin} className="btn btn-primary">
                    Login
                  </button>
                )}

                {user && (
                  <ul className="dropdown-menu text-small">
                    {user?.role === "admin" ? (
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => navigate("/admin")}
                        >
                          Admin
                        </button>
                      </li>
                    ) : null}
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/member")}
                      >
                        Tài khoản
                      </button>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
      >
        <div className="offcanvas-header">
          <div className="d-flex gap-2 align-items-center">
            {user ? (
              <img
                src={user?.photoUrl}
                alt="User Avatar"
                width="40"
                height="40"
                className="rounded-circle"
              />
            ) : (
              <button onClick={handleLogin} className="btn btn-primary">
                Login
              </button>
            )}
            <h6 className="offcanvas-title" id="mobileSidebarLabel">
              {user?.displayName}
            </h6>
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li className="nav-item">
              <button onClick={() => navigate("/woman")} className="nav-link">
                Thời trang nữ
              </button>
            </li>
            <li className="nav-item">
              <button onClick={() => navigate("/men")} className="nav-link">
                Thời trang nam
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => navigate("/customers")}
                className="nav-link"
              >
                Mua sắm
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => navigate("/products")}
                className="nav-link"
              >
                Products
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
