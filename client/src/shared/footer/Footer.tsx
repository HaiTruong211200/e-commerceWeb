import React from "react";

const Footer: React.FC = () => {
  const aboutLinks = [
    "Giới thiệu",
    "Tin tức",
    "Tuyển dụng",
    "Hệ thống cửa hàng",
  ];
  const policyLinks = [
    "Chính sách đổi trả",
    "Chính sách bảo hành",
    "Chính sách bảo mật",
  ];
  const supportLinks = [
    "Liên hệ",
    "Câu hỏi thường gặp",
    "Hướng dẫn mua hàng",
    "Thanh toán & giao hàng",
  ];

  return (
    <div className="container">
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
        <div className="col mb-3">
          <a
            href="/"
            className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
            aria-label="Trang chủ"
          >
            <img src="/logoe32.png" width="40" height="40" />
            <img src="/logoc32.png" width="40" height="40" />
          </a>
          <p className="text-body-secondary">© 2025 Cửa hàng Thời Trang</p>
        </div>

        <div className="col mb-3" />

        <div className="col mb-3">
          <h5>Về chúng tôi</h5>
          <ul className="nav flex-column">
            {aboutLinks.map((item, idx) => (
              <li className="nav-item mb-2" key={idx}>
                <a href="#" className="nav-link p-0 text-body-secondary">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col mb-3">
          <h5>Chính sách</h5>
          <ul className="nav flex-column">
            {policyLinks.map((item, idx) => (
              <li className="nav-item mb-2" key={idx}>
                <a href="#" className="nav-link p-0 text-body-secondary">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col mb-3">
          <h5>Hỗ trợ khách hàng</h5>
          <ul className="nav flex-column">
            {supportLinks.map((item, idx) => (
              <li className="nav-item mb-2" key={idx}>
                <a href="#" className="nav-link p-0 text-body-secondary">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
